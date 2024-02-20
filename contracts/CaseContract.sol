// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CaseManagementSystem is ERC721, AccessControl {
    struct Case {
        string plaintiffName;
        string plaintiffEmail;
        string plaintiffContact;
        string plaintiffAddress;
        string plaint;
        string defendantName;
        string defendantEmail;
        string defendantContact;
        string defendantAddress;
        string summon;
        string defendantClaim;
        string additionalDocuments;
        string caseDescription;
        string status;
    }

    mapping(uint256 => Case) public cases;
    uint256 private _caseId;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC721("CaseNFT", "CASE") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ADMIN_ROLE, msg.sender);
    }

    function createCase(
        string memory _plaintiffName,
        string memory _plaintiffEmail,
        string memory _plaintiffContact,
        string memory _plaintiffAddress,
        string memory _plaint,
        string memory _defendantName,
        string memory _defendantEmail,
        string memory _defendantContact,
        string memory _defendantAddress,
        string memory _summon,
        string memory _defendantClaim,
        string memory _additionalDocuments,
        string memory _caseDescription,
        string memory _status
    ) external returns (uint256) {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");

        _caseId++;
        _mint(msg.sender, _caseId);

        cases[_caseId] = Case({
            plaintiffName: _plaintiffName,
            plaintiffEmail: _plaintiffEmail,
            plaintiffContact: _plaintiffContact,
            plaintiffAddress: _plaintiffAddress,
            plaint: _plaint,
            defendantName: _defendantName,
            defendantEmail: _defendantEmail,
            defendantContact: _defendantContact,
            defendantAddress: _defendantAddress,
            summon: _summon,
            defendantClaim: _defendantClaim,
            additionalDocuments: _additionalDocuments,
            caseDescription: _caseDescription,
            status: _status
        });

        return _caseId;
    }

    function changeCaseStatus(
        uint256 _caseId,
        string memory _newStatus
    ) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        require(_exists(_caseId), "Case does not exist");

        cases[_caseId].status = _newStatus;
    }

    function grantMinterRole(address _minter) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        grantRole(MINTER_ROLE, _minter);
    }

    function revokeMinterRole(address _minter) external {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        revokeRole(MINTER_ROLE, _minter);
    }

    function getCaseById(uint256 _tokenId) external view returns (Case memory) {
        require(_exists(_tokenId), "Token does not exist");
        return cases[_tokenId];
    }
}
