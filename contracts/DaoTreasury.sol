// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./EIP3664/interfaces/IERC3664.sol";
import "./IWeb3Dao.sol";
import "./MultiSign.sol";

/**
 * @title WEB3DAO@CN管理合约
 * @notice 实现功能:
 *         1. 赞助商赞助ETH池,有锁仓时间,退出时根据赞助占比和ETH池体量计算收益
 *         2. 发行Gas积分,按照ETH池子数量在最大债务比例下发行
 *         3. 兑换门票,收到的ETH存入合约
 *         4. 交换Gas积分,DAO NFT持有者可以使用ETH任意兑换Gas积分
 */
contract DaoTreasury is MultiSign {
    address public immutable WEB3DAONFT;
    address public immutable WETH;
    uint256 public immutable SPONSOR_ATTR_ID;
    uint256 public immutable GAS_ATTR_ID;
    uint256 public gasAttrPrice = 10000;
    uint256 public constant max = 10000;
    /// @dev balance + debt
    uint256 public reserve;
    uint256 public price;
    uint256 public debt;
    uint256 public maxDebt = 5000;
    mapping(uint256 => LockVault) public lockVault;

    struct LockVault {
        uint256 amount;
        uint256 time;
    }

    constructor(
        address _WEB3DAONFT,
        address _WETH,
        uint256 _SPONSOR_ATTR_ID,
        uint256 _GAS_ATTR_ID
    ) {
        WEB3DAONFT = _WEB3DAONFT;
        WETH = _WETH;
        SPONSOR_ATTR_ID = _SPONSOR_ATTR_ID;
        GAS_ATTR_ID = _GAS_ATTR_ID;
    }

    modifier onlyHolder(uint256 tokenId) {
        require(
            IERC721(WEB3DAONFT).ownerOf(tokenId) == msg.sender,
            "DaoTreasury: caller is not the nft holder"
        );
        _;
    }

    /// @dev 购买门票
    function buy(address to) public {
        IERC20(WETH).transferFrom(msg.sender, address(this), price);
        reserve += price;
        IWeb3DAOCN(WEB3DAONFT).mint(to);
    }

    /// @dev 赞助,锁定期1年
    function sponsor(uint256 tokenId, uint256 amount) public {
        uint256 balance = IERC20(WETH).balanceOf(address(this));
        uint256 sponsorTotalSupply = IERC3664(WEB3DAONFT).totalSupply(
            SPONSOR_ATTR_ID
        );
        uint256 sponsorAmount;
        if (sponsorTotalSupply == 0 || balance + debt == 0) {
            sponsorAmount = amount;
        } else {
            sponsorAmount = (amount * sponsorTotalSupply) / (balance + debt);
        }
        reserve += amount;
        LockVault storage la = lockVault[tokenId];
        la.amount += sponsorAmount;
        la.time = block.timestamp + 365 days;
        IWeb3DAOCN(WEB3DAONFT).mint(tokenId, SPONSOR_ATTR_ID, sponsorAmount);
        IERC20(WETH).transferFrom(msg.sender, address(this), amount);
    }

    /// @dev 退出赞助
    function quit(uint256 tokenId, uint256 sponsorAmount)
        public
        onlyHolder(tokenId)
    {
        LockVault storage la = lockVault[tokenId];
        require(block.timestamp >= la.time, "DaoTreasury: lock time!");

        uint256 balance = IERC20(WETH).balanceOf(address(this));
        uint256 sponsorTotalSupply = IERC3664(WEB3DAONFT).totalSupply(
            SPONSOR_ATTR_ID
        );
        uint256 quitAmount = (sponsorAmount * balance) / sponsorTotalSupply;
        reserve -= quitAmount;
        IWeb3DAOCN(WEB3DAONFT).burn(tokenId, SPONSOR_ATTR_ID, sponsorAmount);
        IERC20(WETH).transferFrom(address(this), msg.sender, quitAmount);
    }

    /// @dev 铸造Gas积分
    function mintGas(uint256 tokenId, uint256 amount) public onlyAddressThis {
        require(
            ((debt + amount) * 1 ether) / reserve <= (maxDebt * 1 ether) / max,
            "DaoTreasury: debt more than max debt"
        );
        debt += amount;
        IWeb3DAOCN(WEB3DAONFT).mint(
            tokenId,
            GAS_ATTR_ID,
            amount * gasAttrPrice
        );
    }

    /// @dev 偿还债务
    function repay(uint256 amount) public onlyAddressThis {
        IERC20(WETH).transferFrom(msg.sender, address(this), amount);
        uint256 balance = IERC20(WETH).balanceOf(address(this));
        if (balance > reserve) {
            debt = 0;
            reserve = balance;
        } else {
            debt = reserve - balance;
        }
    }

    /// @dev 销毁Gas积分
    function burnGas(uint256 tokenId, uint256 amount) public onlyAddressThis {
        require(
            IERC721(WEB3DAONFT).ownerOf(tokenId) == address(this),
            "DaoTreasury: sell to is not the nft holder"
        );
        IWeb3DAOCN(WEB3DAONFT).burn(
            tokenId,
            GAS_ATTR_ID,
            amount * gasAttrPrice
        );
    }

    /// @dev 出售gas
    function sellGas(uint256 tokenId, uint256 amount)
        public
        onlyHolder(tokenId)
    {
        IWeb3DAOCN(WEB3DAONFT).burn(tokenId, GAS_ATTR_ID, amount);
        IERC20(WETH).transferFrom(
            address(this),
            msg.sender,
            amount / gasAttrPrice
        );
    }

    /// @dev 购买gas
    function buyGas(uint256 to, uint256 amount) public {
        IWeb3DAOCN(WEB3DAONFT).mint(to, GAS_ATTR_ID, amount);
        IERC20(WETH).transferFrom(
            msg.sender,
            address(this),
            amount / gasAttrPrice
        );
    }

    /// @dev 设置最大债务比例
    function setMaxDebt(uint256 _maxDebt) public onlyAddressThis {
        maxDebt = _maxDebt;
    }

    /// @dev 设置Gas积分价格
    function setGasAttrPrice(uint256 _gasAttrPrice) public onlyAddressThis {
        gasAttrPrice = _gasAttrPrice;
    }

    /// @dev 发送NFT
    function transferNFT(
        address token,
        address to,
        uint256 tokenId
    ) public onlyAddressThis {
        IERC721(token).transferFrom(address(this), to, tokenId);
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public pure returns (bytes4) {
        operator;
        from;
        tokenId;
        data;
        return this.onERC721Received.selector;
    }
}
