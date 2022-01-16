// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IWeb3DAOCN {
    /// @dev event attrTransferAllow
    event AttrTransferAllow(uint256 attrId, bool allow);

    function totalSupply() external view returns (uint256);

    /// @dev return Attr transfer is allow by attrId
    function attrTransferAllow(uint256 attrId) external view returns (bool);

    /// @dev mint NFT token
    function mint(address to) external;

    /// @dev set attr transfer is allow by attrId
    function setAttrTransferAllow(uint256 attrId, bool allow) external;

    /// @dev create attrId
    function create(
        uint256 _attrId,
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        string memory _uri
    ) external;

    /// @dev [Batched] version of {create}.
    function createBatch(
        uint256[] calldata attrIds,
        string[] calldata names,
        string[] calldata symbols,
        uint8[] memory decimals,
        string[] calldata uris
    ) external;

    /// @dev Mint `amount` value of attribute type `attrId` to `tokenId`.
    function mint(
        uint256 tokenId,
        uint256 attrId,
        uint256 amount
    ) external;

    /// @dev [Batched] version of {mint}.
    function mintBatch(
        uint256 tokenId,
        uint256[] memory attrIds,
        uint256[] memory amounts
    ) external;

    /// @dev Destroys `amount` values of attribute type `attrId` from `tokenId`
    function burn(
        uint256 tokenId,
        uint256 attrId,
        uint256 amount
    ) external;

    /// @dev [Batched] version of {burn}.
    function burnBatch(
        uint256 tokenId,
        uint256[] memory attrIds,
        uint256[] memory amounts
    ) external;

    /// @dev transfer
    function transfer(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    ) external;

    /// @dev transferFrom
    function transferFrom(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    ) external;

    /// @dev Sets a new URI for all attribute types
    function setURI(string memory newuri) external;

    /// @dev permit
    function permit(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount,
        bytes memory signature
    ) external;
}
