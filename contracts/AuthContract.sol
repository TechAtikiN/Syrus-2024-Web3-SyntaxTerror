// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EditionDrop is ERC1155, Ownable {
    mapping(uint256 => uint256) public totalSupply;
    mapping(uint256 => uint256) public claimedCount;
    mapping(address => mapping(uint256 => uint256)) public userClaimedCount;
    mapping(uint256 => bool) public allowList;
    mapping(uint256 => uint256) public maxClaimsPerUser;
    mapping(uint256 => uint256) public releaseDate;

    bool public creatorEarningsEnabled;

    modifier onlyAfterRelease(uint256 _id) {
        require(block.timestamp >= releaseDate[_id], "Release date not reached");
        _;
    }

    constructor(string memory _uri) ERC1155(_uri) {}

    function setMaxClaimsPerUser(uint256 _id, uint256 _maxClaims) external onlyOwner {
        maxClaimsPerUser[_id] = _maxClaims;
    }

    function setReleaseDate(uint256 _id, uint256 _releaseDate) external onlyOwner {
        releaseDate[_id] = _releaseDate;
    }

    function setAllowList(uint256 _id, bool _status) external onlyOwner {
        allowList[_id] = _status;
    }

    function setCreatorEarningsEnabled(bool _status) external onlyOwner {
        creatorEarningsEnabled = _status;
    }

    function mint(uint256 _id, uint256 _quantity) external onlyAfterRelease(_id) {
        require(allowList[_id] || maxClaimsPerUser[_id] == 0 || userClaimedCount[msg.sender][_id] + _quantity <= maxClaimsPerUser[_id], "Exceeded max claims per user");
        require(totalSupply[_id] == 0 || claimedCount[_id] + _quantity <= totalSupply[_id], "Exceeded total supply");

        _mint(msg.sender, _id, _quantity, "");
        claimedCount[_id] += _quantity;
        userClaimedCount[msg.sender][_id] += _quantity;

        if (creatorEarningsEnabled) {
            _checkRoyalties();
        }
    }


    function withdraw() external onlyOwner {
        address payable creator = payable(owner());
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        (bool success, ) = creator.call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    // Required overrides from ERC1155
    function uri(uint256 _id) public view override returns (string memory) {
        require(_id <= 999, "Invalid token ID");
        return string(abi.encodePacked(super.uri(0), _id.toString()));
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC1155, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
