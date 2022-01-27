// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IDaoTreasury {
    /// @dev 铸造Gas事件
    event MintGas(uint256 gasAmount);

    /// @dev 销毁Gas事件
    event BurnGas(uint256 gasAmount);

    /// @dev 出售Gas事件
    event SellGas(uint256 tokenId, uint256 gasAmount);

    /// @dev 购买Gas事件
    event BuyGas(uint256 tokenId, uint256 gasAmount);

    /// @dev 设置最大债务比例
    event SetMaxDebt(uint256 _maxDebt);

    /// @dev 设置Gas积分价格
    event SetGasAttrPrice(uint256 _gasAttrPrice);

    /// @dev 设置Gas税
    event SetGasTax(uint256 _gasTax);

    /// @dev 设置合约持有的NFT tokenId
    event SetHoldNFTId(uint256 _holdNFTId);

    /// @dev 设置DaoVault合约地址
    event SetDaoVault(address _DaoVault);

    /// @dev 设置DaoSponsor合约地址
    event SetDaoSponsor(address _DaoSponsor);

    /// @dev NFT合约地址
    function WEB3DAONFT() external view returns (address);

    /// @dev WETH合约地址
    function WETH() external view returns (address);

    /// @dev DaoVault
    function DaoVault() external view returns (address);

    /// @dev DaoSponsor
    function DaoSponsor() external view returns (address);

    /// @dev NFT合约中Gas attrId
    function GAS_ATTR_ID() external view returns (uint256);

    /// @dev gas属性值和eth兑换比例Gas:ETH 10000:1
    function gasAttrPrice() external view returns (uint256);

    /// @dev 除数
    function max() external view returns (uint256);

    /// @dev 债务数量
    function debt() external view returns (uint256);

    /// @dev 最大债务上限
    function maxDebt() external view returns (uint256);

    /// @dev gas出售税 1%
    function gasTax() external view returns (uint256);

    /// @dev 合约持有的NFT tokenId
    function holdNFTId() external view returns (uint256);

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
     * @notice 仅限tokenId持有者调用
     */
    function quit(uint256 tokenId, uint256 sponsorAmount) external;

    /**
     * @dev 铸造Gas积分
     * @param gasAmount 铸造的数量
     * @notice 仅限多签合约内部调用
     */
    function mintGas(uint256 gasAmount) external;

    /**
     * @dev 销毁Gas积分
     * @param gasAmount 铸造的数量
     * @notice 仅限多签合约内部调用,仅限当前合约持有的NFT tokenId
     */
    function burnGas(uint256 gasAmount) external;

    /**
     * @dev 出售gas
     * @param tokenId gas记录到的NFT tokenId
     * @param gasAmount 铸造的数量
     * @notice 仅限当前合约持有的NFT tokenId
     */
    function sellGas(uint256 tokenId, uint256 gasAmount) external;

    /**
     * @dev 购买gas
     * @param tokenId gas记录到的NFT tokenId
     * @param ethAmount weth的数量
     */
    function buyGas(uint256 tokenId, uint256 ethAmount) external;

    /**
     * @dev 质押sponsor借出gas
     * @param tokenId 质押sponsor的NFT tokenId
     * @param gasAmount 借出的gas数量
     * @notice 仅限tokenId持有者调用
     */
    function borrowGas(uint256 tokenId, uint256 gasAmount) external;

    /**
     * @dev sponsor归还借出的gas
     * @param tokenId 质押sponsor的NFT tokenId
     * @param gasAmount 归还的gas数量
     * @notice 仅限tokenId持有者调用
     */
    function returnGas(uint256 tokenId, uint256 gasAmount) external;

    /// @dev 设置最大债务比例
    function setMaxDebt(uint256 _maxDebt) external;

    /// @dev 设置Gas积分价格
    function setGasAttrPrice(uint256 _gasAttrPrice) external;

    /// @dev 设置Gas税
    function setGasTax(uint256 _gasTax) external;

    /// @dev 设置合约持有的NFT tokenId
    function setHoldNFTId(uint256 _holdNFTId) external;

    /// @dev 设置DaoVault合约地址
    function setDaoVault(address _DaoVault) external;

    /// @dev 设置DaoSponsor合约地址
    function setDaoSponsor(address _DaoSponsor) external;

    /// @dev 发送NFT
    function transferNFT(
        address token,
        address to,
        uint256 tokenId
    ) external;

    /// @dev 接收NFT
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure returns (bytes4);
}
