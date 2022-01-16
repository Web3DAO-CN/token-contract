// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWeb3DAOCN.sol";
import "./interfaces/IBuyNFT.sol";
import "./interfaces/IDaoVault.sol";

/**
 * @title WEB3DAO@CN NFT销售合约
 * @notice 实现功能:
 *         1. 本合约由Owner权限调用,在部署之后应转移给DaoTreasury合约
 *         2. DaoTreasury合约具有多签功能,可以设置NFT价格
 */
contract BuyNFT is Ownable, IBuyNFT {
    using Address for address;
    /// @dev NFT合约地址
    address public immutable override WEB3DAONFT;
    /// @dev WETH合约地址
    address public immutable override WETH;
    /// @dev DaoVault
    address public override DaoVault;
    /// @dev NFT 价格
    uint256 public override price = 0.025 ether;

    /**
     * @dev 构造函数
     * @param _WEB3DAONFT NFT合约地址
     * @param _WETH WETH合约地址
     */
    constructor(address _WEB3DAONFT, address _WETH) {
        WEB3DAONFT = _WEB3DAONFT;
        WETH = _WETH;
    }

    /// @dev See {IBuyNFT-buy}.
    function buy(address to) public override {
        // 发送weth到DaoVault
        WETH.functionCall(
            abi.encodeWithSelector(
                IERC20.transferFrom.selector,
                _msgSender(),
                DaoVault,
                price
            )
        );
        // 存款
        IDaoVault(DaoVault).deposit(price);
        // 铸造nft
        IWeb3DAOCN(WEB3DAONFT).mint(to);
        emit Buy(to);
    }

    /// @dev See {IBuyNFT-setPrice}.
    function setPrice(uint256 _price) public override onlyOwner {
        price = _price;
        emit SetPrice(_price);
    }

    /// @dev See {IBuyNFT-setDaoVault}.
    function setDaoVault(address _DaoVault) public override onlyOwner {
        DaoVault = _DaoVault;
        emit SetDaoVault(_DaoVault);
    }
}
