// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDaoSponsor {
    /// @dev 锁仓结构体
    struct LockVault {
        uint256 sponsorAmount;
        uint256 stakeAmount;
        uint256 borrowGasAmount;
        uint256 time;
    }

    /// @dev 赞助事件
    event Sponsor(
        uint256 indexed tokenId,
        uint256 ethAmount,
        uint256 sponsorAmount
    );

    /// @dev 退出赞助事件
    event Quit(
        uint256 indexed tokenId,
        uint256 sponsorAmount,
        uint256 quitAmount
    );

    /// @dev 设置DaoVault
    event SetDaoVault(address _DaoVault);

    event SetDaoTreasury(address _DaoTreasury);

    event SetMaxBorrow(uint256 _maxBorrow);

    event BorrowGas(uint256 tokenId, uint256 gasAmount, uint256 stakeAmount);

    event ReturnGas(uint256 tokenId, uint256 gasAmount, uint256 unStakeAmount);

    /// @dev NFT合约地址
    function WEB3DAONFT() external view returns (address);

    /// @dev DaoVault
    function DaoVault() external view returns (address);

    /// @dev DaoTreasury
    function DaoTreasury() external view returns (address);

    /// @dev NFT合约中Sponsor attrId
    function SPONSOR_ATTR_ID() external view returns (uint256);

    /// @dev 最大借款比例
    function maxBorrow() external view returns (uint256);

    /// @dev 除数
    function max() external view returns (uint256);

    /**
     * @dev 返回锁仓数据
     * @param tokenId 指定的tokenId
     * @return LockVault锁仓结构体
     */
    function lockVault(uint256 tokenId)
        external
        view
        returns (LockVault memory);

    /**
     * @dev 赞助,锁定期1年
     * @param tokenId 赞助记录到的NFT tokenId
     * @param ethAmount 赞助的weth数量
     */
    function sponsor(uint256 tokenId, uint256 ethAmount) external;

    /**
     * @dev 退出赞助
     * @param tokenId 赞助记录到的NFT tokenId
     * @param sponsorAmount 退出的sponsor值数量
     * @return quitAmount 退出的ETH数量
     * @notice 仅限tokenId持有者调用
     */
    function quit(uint256 tokenId, uint256 sponsorAmount)
        external
        returns (uint256 quitAmount);

    /**
     * @dev 质押sponsor借出gas
     * @param tokenId 质押sponsor的NFT tokenId
     * @param gasAmount 借出的gas数量
     * @return 是否成功
     * @notice 仅限owner调用
     */
    function borrowGas(uint256 tokenId, uint256 gasAmount)
        external
        returns (bool);

    /**
     * @dev sponsor归还借出的gas
     * @param tokenId 质押sponsor的NFT tokenId
     * @param gasAmount 归还的gas数量
     * @return 是否成功
     * @notice 仅限owner调用
     */
    function returnGas(uint256 tokenId, uint256 gasAmount)
        external
        returns (bool);

    /**
     * @dev 设置DaoVault合约地址
     * @param _DaoVault 新合约地址
     * @notice 仅限owner调用
     */
    function setDaoVault(address _DaoVault) external;

    /**
     * @dev 设置DaoTreasury合约地址
     * @param _DaoTreasury 新合约地址
     * @notice 仅限owner调用
     */
    function setDaoTreasury(address _DaoTreasury) external;

    /**
     * @dev 设置最大借出比例
     * @param _maxBorrow 新比例
     * @notice 仅限owner调用
     */
    function setMaxBorrow(uint256 _maxBorrow) external;
}
