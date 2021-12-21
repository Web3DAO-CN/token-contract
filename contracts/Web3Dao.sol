// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./EIP3664/ERC3664.sol";

contract Web3DAOCN is
    ERC3664,
    ERC721Enumerable,
    ReentrancyGuard,
    AccessControlEnumerable
{
    using Counters for Counters.Counter;
    /// @dev tokenID
    Counters.Counter private _tokenIdTracker;
    /// @dev constant bytes
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    /// @dev Attr transfer is allow
    mapping(uint256 => bool) public attrTransferAllow;

    /// @dev userAddress => bool, same address can only be claim once
    mapping(address => bool) private _claimed;

    constructor(string memory uri_)
        ERC3664(uri_)
        ERC721("Web3 DAO CN NFT", unicode"WEB³")
    {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

        _setupRole(MINTER_ROLE, _msgSender());
    }

    modifier onlyMinter() {
        require(
            hasRole(MINTER_ROLE, _msgSender()),
            "Web3DAOCN: must have minter role to mint"
        );
        _;
    }

    function setAttrTransferAllow(uint256 attrId, bool allow)
        public
        virtual
        onlyMinter
    {
        attrTransferAllow[attrId] = allow;
    }

    /**
     * @dev Create new attribute type with metadata.
     *
     * See {ERC3664-_create}.
     */
    function create(
        uint256 _attrId,
        string memory _name,
        string memory _symbol,
        uint8 _decimal,
        string memory _uri
    ) public virtual onlyMinter {
        _create(_attrId, _name, _symbol, _decimal, _uri);
    }

    /**
     * @dev [Batched] version of {mint}.
     */
    function createBatch(
        uint256[] calldata attrIds,
        string[] calldata names,
        string[] calldata symbols,
        uint8[] memory decimals,
        string[] calldata uris
    ) public virtual onlyMinter {
        _createBatch(attrIds, names, symbols, decimals, uris);
    }

    /**
     * @dev Mint `amount` value of attribute type `attrId` to `tokenId`.
     */
    function mint(
        uint256 tokenId,
        uint256 attrId,
        uint256 amount
    ) public virtual onlyMinter {
        _mint(tokenId, attrId, amount);
    }

    /**
     * @dev [Batched] version of {mint}.
     */
    function mintBatch(
        uint256 tokenId,
        uint256[] memory attrIds,
        uint256[] memory amounts
    ) public virtual onlyMinter {
        _mintBatch(tokenId, attrIds, amounts);
    }

    /**
     * @dev Destroys `amount` values of attribute type `attrId` from `tokenId`
     */
    function burn(
        uint256 tokenId,
        uint256 attrId,
        uint256 amount
    ) public virtual onlyMinter {
        _burn(tokenId, attrId, amount);
    }

    /**
     * @dev [Batched] version of {burn}.
     */
    function burnBatch(
        uint256 tokenId,
        uint256[] memory attrIds,
        uint256[] memory amounts
    ) public virtual onlyMinter {
        _burnBatch(tokenId, attrIds, amounts);
    }

    /**
     * @dev Hook that is called before any attribute transfer. This includes attaching
     * and removing, as well as batched variants.
     */
    function _beforeAttrTransfer(
        address operator,
        uint256 from,
        uint256 to,
        uint256 attrIds,
        uint256 amounts,
        bytes memory data
    ) internal virtual override {
        require(
            hasRole(MINTER_ROLE, operator) || attrTransferAllow[attrIds],
            "Web3DAOCN: Attr transfer not allow"
        );
        super._beforeAttrTransfer(operator, from, to, attrIds, amounts, data);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC3664, AccessControlEnumerable, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
