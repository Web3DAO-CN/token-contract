// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDaoVault {
    event Deposit(uint256 amount, uint256 reserve);

    event Withdraw(uint256 amount, uint256 reserve);

    event UpdateReserve(uint256 reserve);

    /// @dev WETH合约地址
    function WETH() external view returns (address);

    /// @dev 储备量balance
    function reserve() external view returns (uint256);

    /**
     * @dev 存款方法
     * @param amount weth存款数量
     * @notice 需要当前合约的weth余额大于储备量
     */
    function deposit(uint256 amount) external;

    /**
     * @dev 取款方法
     * @param amount weth取款数量
     * @param to weth接收地址
     * @notice 仅限owner调用
     */
    function withdraw(uint256 amount, address to) external;

    /**
     * @dev 更新储备量
     * @notice 仅限owner调用
     */
    function updateReserve() external;
}
