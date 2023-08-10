// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NikhilCircuit is ERC721 {
    // Variables
    string private _promptDescription;
    uint256 private _tokenIdCounter;
    mapping(uint256 => string) private _tokenURIs;

    // Events
    event PromptDescriptionUpdated(string newPromptDescription);
    event TokenMinted(address indexed receiver, uint256 indexed tokenId, string tokenURI);
    event TokenURIUpdated(uint256 indexed tokenId, string tokenURI);

    // Constructor
    constructor(string memory name, string memory symbol, string memory promptDescription) ERC721(name, symbol) {
        _promptDescription = promptDescription;
        _tokenIdCounter = 1;
    }

    // Mint function to create new NFTs with auto-generated token ID
    function mint(address receiver, string memory newTokenURI) external  {
        uint256 tokenId = _tokenIdCounter;
        _mint(receiver, tokenId);
        _setTokenURI(tokenId, newTokenURI);
        emit TokenMinted(receiver, tokenId, newTokenURI);
        _tokenIdCounter++;
    }

    // Get the prompt description
    function getPromptDescription() public view returns (string memory) {
        return _promptDescription;
    }

    // Update the prompt description
    function updatePromptDescription(string memory newPromptDescription) external  {
        _promptDescription = newPromptDescription;
        emit PromptDescriptionUpdated(newPromptDescription);
    }

    // Update the token URI for a specific token
    function updateTokenURI(uint256 tokenId, string memory newTokenURI) external  {
        _setTokenURI(tokenId, newTokenURI);
        emit TokenURIUpdated(tokenId, newTokenURI);
    }

    // Custom implementation of _setTokenURI function
    function _setTokenURI(uint256 tokenId, string memory newTokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = newTokenURI;
    }

    // Custom implementation of tokenURI function
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
}