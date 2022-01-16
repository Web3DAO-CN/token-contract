// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IBuyNFT {
    /// @dev 购买事件
    event Buy(address to);

    /// @dev 设置NFT价格事件
    event SetPrice(uint256 _price);

    /// @dev NFT合约地址
    function WEB3DAONFT() external view returns (address);

    /// @dev WETH合约地址
    function WETH() external view returns (address);

    /// @dev DaoVault
    function DaoVault() external view returns (address);

    /// @dev NFT 价格
    function price() external view returns (uint256);

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
}
