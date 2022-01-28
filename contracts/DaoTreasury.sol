// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./EIP3664/interfaces/IERC3664.sol";
import "./interfaces/IWeb3DAOCN.sol";
import "./interfaces/IDaoVault.sol";
import "./interfaces/IDaoSponsor.sol";
import "./interfaces/IDaoTreasury.sol";
import "./MultiSign.sol";

/**
 * @title WEB3DAO@CN管理合约
 * @notice 实现功能:
 *         1. 赞助商赞助ETH池,有锁仓时间,退出时根据赞助占比和ETH池体量计算收益
 *         2. 发行Gas积分,按照ETH池子数量在最大债务比例下发行
 *         3. 兑换门票,收到的ETH存入合约
 *         4. 偿还债务,归还eth,同时更新债务数据,如果归还0eth,则只更新债务数据
 *         5. 销毁gas,系统将多余的gas销毁
 *         6. 出售gas,向合约出售gas,换回合约中的eth,同时扣除税务
 *         7. 购买gas,用户使用eth向合约购买gas,合约将持有的gas出售给用户
 *         8. 设置最大债务比例,gas和eth兑换比例,gas税
 */
contract DaoTreasury is MultiSign, IDaoTreasury {
    using Address for address;
    /// @dev NFT合约地址
    address public immutable override WEB3DAONFT;
    /// @dev WETH合约地址
    address public immutable override WETH;
    /// @dev DaoVault
    address public override DaoVault;
    /// @dev DaoSponsor
    address public override DaoSponsor;
    /// @dev NFT合约中Gas attrId
    uint256 public immutable override GAS_ATTR_ID;
    /// @dev gas属性值和eth兑换比例Gas:ETH 10000:1
    uint256 public override gasAttrPrice = 10000;
    /// @dev 除数
    uint256 public constant override max = 10000;
    /// @dev 债务数量
    uint256 public override debt;
    /// @dev 最大债务上限
    uint256 public override maxDebt = 5000;
    /// @dev gas出售税 1%
    uint256 public override gasTax = 100;
    /// @dev 合约持有的NFT tokenId
    uint256 public override holdNFTId;

    /**
     * @dev 构造函数
     * @param _WEB3DAONFT NFT合约地址
     * @param _WETH WETH合约地址
     * @param _DaoVault DaoVault合约地址
     * @param _GAS_ATTR_ID NFT合约中Gas attrId
     */
    constructor(
        address _WEB3DAONFT,
        address _WETH,
        address _DaoVault,
        uint256 _GAS_ATTR_ID
    ) {
        WEB3DAONFT = _WEB3DAONFT;
        WETH = _WETH;
        DaoVault = _DaoVault;
        GAS_ATTR_ID = _GAS_ATTR_ID;
    }

    /// @dev 仅限NFT tokenId持有者
    modifier onlyHolder(uint256 tokenId) {
        require(
            IERC721(WEB3DAONFT).ownerOf(tokenId) == msg.sender,
            "DaoTreasury: caller is not the nft holder"
        );
        _;
    }

    /// @dev See {IDaoTreasury-sponsor}.
    function sponsor(uint256 tokenId, uint256 ethAmount) public override {
        IDaoSponsor(DaoSponsor).sponsor(tokenId, ethAmount);
        // 发送weth到DaoVault
        WETH.functionCall(
            abi.encodeWithSelector(
                IERC20.transferFrom.selector,
                msg.sender,
                DaoVault,
                ethAmount
            )
        );
        IDaoVault(DaoVault).deposit(ethAmount);
    }

    /// @dev See {IDaoTreasury-quit}.
    function quit(uint256 tokenId, uint256 sponsorAmount)
        public
        override
        onlyHolder(tokenId)
    {
        uint256 ethAmount = IDaoSponsor(DaoSponsor).quit(
            tokenId,
            sponsorAmount
        );
        IDaoVault(DaoVault).withdraw(ethAmount, msg.sender);
    }

    /// @dev See {IDaoTreasury-mintGas}.
    function mintGas(uint256 gasAmount) public override {
        // 将gasAmount换算成ethAmount
        uint256 ethAmount = (gasAmount * 1 ether) / gasAttrPrice;
        // 获取DaoVault储备量
        uint256 reserve = IDaoVault(DaoVault).reserve();
        // 确认 (债务+铸造的数量) / 储备量 <= 最大债务比例 / 10000
        require(
            reserve > 0 &&
                (debt * 1 ether + ethAmount) / reserve <=
                (maxDebt * 1 ether) / max,
            "DaoTreasury: debt more than max debt"
        );
        // 债务增加
        debt += ethAmount / 1 ether;
        // 铸造gas
        IWeb3DAOCN(WEB3DAONFT).mint(holdNFTId, GAS_ATTR_ID, gasAmount);
        emit MintGas(gasAmount);
    }

    /// @dev See {IDaoTreasury-burnGas}.
    function burnGas(uint256 gasAmount)
        public
        override
        onlyAddressThis
        onlyHolder(holdNFTId)
    {
        // 债务减少
        debt -= gasAmount / gasAttrPrice;
        // 销毁gas
        IWeb3DAOCN(WEB3DAONFT).burn(holdNFTId, GAS_ATTR_ID, gasAmount);
        emit BurnGas(gasAmount);
    }

    /// @dev See {IDaoTreasury-sellGas}.
    function sellGas(uint256 tokenId, uint256 gasAmount)
        public
        override
        onlyHolder(tokenId)
    {
        // 计算收到的weth数量 = 销毁的gas数量 * (10000 - gas税) / (10000 * 10000)
        uint256 ethAmount = (gasAmount * (max - gasTax)) / (max * gasAttrPrice);
        // 将gas发送到合约持有的NFT
        IERC3664(WEB3DAONFT).transferFrom(
            tokenId,
            holdNFTId,
            GAS_ATTR_ID,
            gasAmount
        );
        // 从DaoVault提取WETH
        IDaoVault(DaoVault).withdraw(ethAmount, msg.sender);
        emit SellGas(tokenId, gasAmount);
    }

    /// @dev See {IDaoTreasury-buyGas}.
    function buyGas(uint256 tokenId, uint256 ethAmount) public override {
        // 发送weth到DaoVault
        WETH.functionCall(
            abi.encodeWithSelector(
                IERC20.transferFrom.selector,
                msg.sender,
                DaoVault,
                ethAmount
            )
        );
        // DaoVault存款
        IDaoVault(DaoVault).deposit(ethAmount);
        // 将gas从合约持有NFT发送到目标NFT
        IERC3664(WEB3DAONFT).transfer(
            holdNFTId,
            tokenId,
            GAS_ATTR_ID,
            ethAmount * gasAttrPrice
        );
        emit BuyGas(tokenId, ethAmount);
    }

    /// @dev See {IDaoTreasury-borrowGas}.
    function borrowGas(uint256 tokenId, uint256 gasAmount)
        public
        override
        onlyHolder(tokenId)
    {
        // 确认sponsor合约质押成功
        require(
            IDaoSponsor(DaoSponsor).borrowGas(tokenId, gasAmount),
            "DaoTreasury: borrowGas error"
        );
        // 从当前合约持有的NFT发送gas
        IERC3664(WEB3DAONFT).transfer(
            holdNFTId,
            tokenId,
            GAS_ATTR_ID,
            gasAmount
        );
    }

    /// @dev See {IDaoTreasury-returnGas}.
    function returnGas(uint256 tokenId, uint256 gasAmount)
        public
        override
        onlyHolder(tokenId)
    {
        // 确认sponsor合约归还成功
        require(
            IDaoSponsor(DaoSponsor).returnGas(tokenId, gasAmount),
            "DaoTreasury: returnGas error"
        );
        // 将gas从tokenId发送到当前合约持有的NFT
        IERC3664(WEB3DAONFT).transferFrom(
            tokenId,
            holdNFTId,
            GAS_ATTR_ID,
            gasAmount
        );
    }

    /// @dev See {IDaoTreasury-setMaxDebt}.
    function setMaxDebt(uint256 _maxDebt) public override onlyAddressThis {
        maxDebt = _maxDebt;
        emit SetMaxDebt(_maxDebt);
    }

    /// @dev See {IDaoTreasury-setGasAttrPrice}.
    function setGasAttrPrice(uint256 _gasAttrPrice)
        public
        override
        onlyAddressThis
    {
        gasAttrPrice = _gasAttrPrice;
        emit SetGasAttrPrice(_gasAttrPrice);
    }

    /// @dev See {IDaoTreasury-setGasTax}.
    function setGasTax(uint256 _gasTax) public override onlyAddressThis {
        gasTax = _gasTax;
        emit SetGasTax(_gasTax);
    }

    /// @dev See {IDaoTreasury-setHoldNFTId}.
    function setHoldNFTId(uint256 _holdNFTId) public override onlyAddressThis {
        holdNFTId = _holdNFTId;
        emit SetHoldNFTId(_holdNFTId);
    }

    /// @dev See {IDaoTreasury-setDaoVault}.
    function setDaoVault(address _DaoVault) public override onlyAddressThis {
        DaoVault = _DaoVault;
        emit SetDaoVault(_DaoVault);
    }

    /// @dev See {IDaoTreasury-setDaoSponsor}.
    function setDaoSponsor(address _DaoSponsor)
        public
        override
        onlyAddressThis
    {
        DaoSponsor = _DaoSponsor;
        emit SetDaoSponsor(_DaoSponsor);
    }

    /// @dev See {IDaoTreasury-transferNFT}.
    function transferNFT(
        address token,
        address to,
        uint256 tokenId
    ) public override onlyAddressThis {
        IERC721(token).transferFrom(address(this), to, tokenId);
    }

    /// @dev See {IDaoTreasury-onERC721Received}.
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public pure override returns (bytes4) {
        operator;
        from;
        tokenId;
        data;
        return this.onERC721Received.selector;
    }
}
