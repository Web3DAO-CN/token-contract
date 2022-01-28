// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IBuyNFT {
    /// @dev 购买事件
    event Buy(address to);

    /// @dev 设置NFT价格事件
    event SetPrice(uint256 _price);

    /// @dev 设置DaoVault
    event SetDaoVault(address _DaoVault);

    /// @dev event set max totalSupply
    event SetMaxTotalSupply(uint256 _maxTotalSupply);

    /// @dev NFT合约地址
    function WEB3DAONFT() external view returns (address);

    /// @dev WETH合约地址
    function WETH() external view returns (address);

    /// @dev DaoVault
    function DaoVault() external view returns (address);

    /// @dev NFT 价格
    function price() external view returns (uint256);

    /// @dev NFT数量限制
    function maxTotalSupply() external view returns (uint256);

    /// @dev set nft max totalSupply
    function setMaxTotalSupply(uint256 _maxTotalSupply) external;

    /**
     * @dev 购买NFT
     * @param to 接收NFT的地址
     */
    function buy(address to) external;

    /**
     * @dev 设置NFT价格
     * @param _price NFT价格
     * @notice 仅限owner调用
     */
    function setPrice(uint256 _price) external;

    /**
     * @dev 设置DaoVault合约地址
     * @param _DaoVault 新合约地址
     * @notice 仅限owner调用
     */
    function setDaoVault(address _DaoVault) external;
}
