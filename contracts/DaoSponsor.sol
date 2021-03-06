// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./EIP3664/interfaces/IERC3664.sol";
import "./interfaces/IWeb3DAOCN.sol";
import "./interfaces/IDaoVault.sol";
import "./interfaces/IDaoTreasury.sol";
import "./interfaces/IDaoSponsor.sol";

/**
 * @title WEB3DAO@CN赞助商合约
 * @notice 实现功能:
 *         1. 本合约由Owner权限调用,在部署之后应转移给DaoTreasury合约
 *         2. 赞助Dao方法,为tokenId铸造Sponsor值
 *         3. 退出Sponsor值,计算可以取出的ETh数量
 */
contract DaoSponsor is Ownable, IDaoSponsor {
    using Address for address;
    /// @dev NFT合约地址
    address public immutable override WEB3DAONFT;
    /// @dev DaoVault
    address public override DaoVault;
    /// @dev DaoTreasury
    address public override DaoTreasury;
    /// @dev NFT合约中Sponsor attrId
    uint256 public immutable override SPONSOR_ATTR_ID;
    /// @dev 最大借款比例
    uint256 public override maxBorrow = 8000;
    /// @dev 除数
    uint256 public constant override max = 10000;
    /// @dev Sponsor锁仓数据
    mapping(uint256 => LockVault) public _lockVault;
    /// @dev sponsor数组
    uint256[] public sponsors;
    /// @dev sponsor数组索引;
    mapping(uint256 => uint256) public sponsorIndex;

    /**
     * @dev 构造函数
     * @param _WEB3DAONFT NFT合约地址
     * @param _DaoVault DaoVault合约地址
     * @param _DaoTreasury DaoTreasury合约地址
     * @param _SPONSOR_ATTR_ID NFT合约中Sponsor attrId
     */
    constructor(
        address _WEB3DAONFT,
        address _DaoVault,
        address _DaoTreasury,
        uint256 _SPONSOR_ATTR_ID
    ) {
        WEB3DAONFT = _WEB3DAONFT;
        DaoVault = _DaoVault;
        DaoTreasury = _DaoTreasury;
        SPONSOR_ATTR_ID = _SPONSOR_ATTR_ID;
    }

    /// @dev See {IDaoSponsor-lockVault}.
    function lockVault(uint256 tokenId)
        public
        view
        override
        returns (LockVault memory)
    {
        return _lockVault[tokenId];
    }

    /// @dev See {IDaoSponsor-sponsor}.
    function sponsor(uint256 tokenId, uint256 ethAmount)
        public
        override
        onlyOwner
    {
        // NFT合约的 sponsor attr总发行量
        uint256 sponsorTotalSupply = IERC3664(WEB3DAONFT).totalSupply(
            SPONSOR_ATTR_ID
        );
        // DaoVault储备量
        uint256 reserve = IDaoVault(DaoVault).reserve();
        // 初始化sponsor值数量
        uint256 sponsorAmount;
        // 如果sponsor总发行量为0,首次铸造
        if (sponsorTotalSupply == 0) {
            // sponsor值 = 赞助的weth数量
            sponsorAmount = ethAmount;
            // 否则为后续赞助
        } else {
            // sponsor值 = 赞助的weth数量 * sponsor总发行量 / 储备量
            sponsorAmount = (ethAmount * sponsorTotalSupply) / reserve;
        }
        // 锁仓结构体
        LockVault storage la = _lockVault[tokenId];
        // 锁仓数量增加赞数的数量
        la.sponsorAmount += sponsorAmount;
        // 锁仓时间顺延一年
        la.time = block.timestamp + 365 days;
        // 为指定的NFT tokenId铸造sponsor值数量
        IWeb3DAOCN(WEB3DAONFT).mint(tokenId, SPONSOR_ATTR_ID, sponsorAmount);
        // 记录sponsor数组
        if (sponsorIndex[tokenId] == 0) {
            sponsors.push(tokenId);
            sponsorIndex[tokenId] = sponsors.length - 1;
        }
        emit Sponsor(tokenId, ethAmount, sponsorAmount);
    }

    /// @dev See {IDaoSponsor-quit}.
    function quit(uint256 tokenId, uint256 sponsorAmount)
        public
        override
        onlyOwner
        returns (uint256 quitAmount)
    {
        // 锁仓结构体
        LockVault storage lv = _lockVault[tokenId];
        // 确认时间大于1年
        require(block.timestamp >= lv.time, "DaoSponsor: lock time!");
        // 确认有足够的锁仓量
        require(
            lv.sponsorAmount - lv.stakeAmount >= sponsorAmount,
            "DaoSponsor: no enough sponsorAmount!"
        );

        // DaoVault合约的储备量
        uint256 reserve = IDaoVault(DaoVault).reserve();
        // NFT合约的 sponsor attr总发行量
        uint256 sponsorTotalSupply = IERC3664(WEB3DAONFT).totalSupply(
            SPONSOR_ATTR_ID
        );
        // 计算退出的weth数量 = 退出的sponsor值数量 * 储备量 / sponsor总发行量
        quitAmount = (sponsorAmount * reserve) / sponsorTotalSupply;
        // 减少sponsorAmount
        lv.sponsorAmount -= sponsorAmount;
        // 销毁退出的sponsor值数量
        IWeb3DAOCN(WEB3DAONFT).burn(tokenId, SPONSOR_ATTR_ID, sponsorAmount);
        emit Quit(tokenId, sponsorAmount, quitAmount);
    }

    /// @dev See {IDaoSponsor-borrowGas}.
    function borrowGas(uint256 tokenId, uint256 gasAmount)
        public
        override
        onlyOwner
        returns (bool)
    {
        // NFT合约的 sponsor attr总发行量
        uint256 sponsorTotalSupply = IERC3664(WEB3DAONFT).totalSupply(
            SPONSOR_ATTR_ID
        );
        // DaoVault储备量
        uint256 reserve = IDaoVault(DaoVault).reserve();
        // gas和eth兑换比例
        uint256 gasAttrPrice = IDaoTreasury(DaoTreasury).gasAttrPrice();
        // 实例化锁仓结构体
        LockVault storage lv = _lockVault[tokenId];
        // 计算sponsorAmount总价值对应的ethAmount
        uint256 ethAmount = (lv.sponsorAmount * reserve) / sponsorTotalSupply;
        // 确认 已经借出的gas+这次要借出的gas / sponsorAmount总价值对应的ethAmount * 10000 小于最大借出比例
        require(
            ((lv.borrowGasAmount + gasAmount) * 1 ether) /
                (ethAmount * gasAttrPrice) <=
                (maxBorrow * 1 ether) / max,
            "DaoSponsor:more than max borrow"
        );
        // 需要锁定的sponsor数量 = 借出的gas数量 * sponsor总发行量 / (eth储备量 * 10000)
        uint256 stakeAmount = (gasAmount * sponsorTotalSupply) /
            (reserve * gasAttrPrice);
        // 更新锁仓数据
        lv.stakeAmount += stakeAmount;
        lv.borrowGasAmount += gasAmount;
        emit BorrowGas(tokenId, gasAmount, stakeAmount);
        return true;
    }

    /// @dev See {IDaoSponsor-returnGas}.
    function returnGas(uint256 tokenId, uint256 gasAmount)
        public
        override
        onlyOwner
        returns (bool)
    {
        // 实例化锁仓结构体
        LockVault storage lv = _lockVault[tokenId];
        // 确认借出的gas大于等于归还的gas
        require(lv.borrowGasAmount >= gasAmount, "DaoSponsor: gasAmount error");
        // 解锁数量 = 锁定的数量 * 归还数量 * 10000 / 借出的gas
        uint256 unStakeAmount = (lv.stakeAmount * gasAmount) /
            lv.borrowGasAmount;
        // 更新锁仓数据
        lv.stakeAmount -= unStakeAmount;
        lv.borrowGasAmount -= gasAmount;
        emit ReturnGas(tokenId, gasAmount, unStakeAmount);
        return true;
    }

    /// @dev See {IDaoSponsor-setDaoVault}.
    function setDaoVault(address _DaoVault) public override onlyOwner {
        DaoVault = _DaoVault;
        emit SetDaoVault(_DaoVault);
    }

    /// @dev See {IDaoSponsor-setDaoTreasury}.
    function setDaoTreasury(address _DaoTreasury) public override onlyOwner {
        DaoTreasury = _DaoTreasury;
        emit SetDaoTreasury(_DaoTreasury);
    }

    /// @dev See {IDaoSponsor-setMaxBorrow}.
    function setMaxBorrow(uint256 _maxBorrow) public override onlyOwner {
        maxBorrow = _maxBorrow;
        emit SetMaxBorrow(_maxBorrow);
    }
}
