// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDaoVault.sol";

/**
 * @title WEB3DAO@CN保险库合约
 * @notice 实现功能:
 *         1. 存入WETH并记录储备量
 *         2. 取出WETH并减少储备量
 *         3. 只能由Owner取出
 *         4. 应在部署之后将Owner转移给DaoTreasury合约
 *         5. 因为DaoTreasury合约具有多签功能,所以可以调用任意方法
 */
contract DaoVault is Ownable, IDaoVault {
    using Address for address;
    /// @dev WETH合约地址
    address public immutable override WETH;
    /// @dev 储备量balance
    uint256 public override reserve;

    /**
     * @dev 构造函数
     * @param _WETH weth合约地址
     */
    constructor(address _WETH) {
        WETH = _WETH;
    }

    /// @dev See {IDaoVault-deposit}.
    function deposit(uint256 amount) public override {
        require(
            IERC20(WETH).balanceOf(address(this)) >= reserve + amount,
            "DaoVault:no enough amount"
        );
        reserve += amount;
        emit Deposit(amount);
    }

    /// @dev See {IDaoVault-withdraw}.
    function withdraw(uint256 amount, address to) public override onlyOwner {
        require(
            IERC20(WETH).balanceOf(address(this)) >= amount,
            "DaoVault:no enough balance"
        );
        // 发送weth
        WETH.functionCall(
            abi.encodeWithSelector(IERC20.transfer.selector, to, amount)
        );
        reserve -= amount;
        emit Withdraw(amount);
    }

    /// @dev See {IDaoVault-updateReserve}.
    function updateReserve() public override onlyOwner {
        reserve = IERC20(WETH).balanceOf(address(this));
        emit UpdateReserve(reserve);
    }
}
