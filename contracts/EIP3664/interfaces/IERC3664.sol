// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @dev Required interface of an ERC3664 compliant contract.
 */
interface IERC3664 is IERC165 {
    /**
     * @dev Emitted when new attribute type `attrId` are minted.
     */
    event AttributeCreated(
        uint256 indexed attrId,
        string name,
        string symbol,
        uint8 _decimal,
        string uri
    );

    /**
     * @dev Emitted when `value` of attribute type `attrId` are attached to "to"
     * or removed from `from` by `operator`.
     */
    event TransferSingle(
        address indexed operator,
        uint256 indexed from,
        uint256 indexed to,
        uint256 attrId,
        uint256 value
    );

    /**
     * @dev Equivalent to multiple {TransferSingle} events.
     */
    event TransferBatch(
        address indexed operator,
        uint256 indexed from,
        uint256 indexed to,
        uint256[] attrIds,
        uint256[] values
    );

    /**
     * @dev Emitted when  attribute type `attrId` are approved to "to" from `from` by `operator`.
     */
    event AttributeApproval(
        address indexed operator,
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    );

    /**
     * @dev Returns the attribute type `attrId` value owned by `tokenId`.
     */
    function balanceOf(uint256 tokenId, uint256 attrId)
        external
        view
        returns (uint256);

    /**
     * @dev Returns the batch of attribute type `attrIds` values owned by `tokenId`.
     */
    function balanceOfBatch(uint256 tokenId, uint256[] calldata attrIds)
        external
        view
        returns (uint256[] memory);

    /**
     * @dev Returns true if `attrId` is approved to token `to` from token `from`.
     */
    function allowance(
        uint256 from,
        uint256 to,
        uint256 attrId
    ) external view returns (uint256);

    /**
     * @dev Returns the amount of attribute in existence.
     */
    function totalSupply(uint256 attrId) external view returns (uint256);

    /**
     * @dev Approve attribute type `attrId` of token `from` to token `to` called by `from` holder.
     *
     * Emits an {AttributeApproval} event.
     */
    function approve(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    ) external;

    /**
     * @dev Transfers attribute type `attrId` from token type `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     */
    function transfer(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    ) external;

    /**
     * @dev Transfers attribute type `attrId` from token type `from` to `to`.
     *
     * Emits a {TransferSingle} event.
     */
    function transferFrom(
        uint256 from,
        uint256 to,
        uint256 attrId,
        uint256 amount
    ) external;
}
