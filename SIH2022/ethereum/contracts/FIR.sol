// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract FIRFactory{
    address[] public deployedFIRs;

    function createFIR(string memory summary,string memory fullName) public{
        address newFIR = address(new FIR(summary,fullName,msg.sender));
        deployedFIRs.push(newFIR);
    }

    function getDeployedFIRs() public view returns (address[] memory){
       return deployedFIRs;
    }
}

contract FIR{
    address public victim;
    string public caseDetails;
    string public victimName;

    constructor(string memory aboutCase,string memory name,address creator){
        victim = creator;
        caseDetails = aboutCase;
        victimName = name;
    }

    function getDetails() public view returns (
        address,string memory,string memory
    ) {
        return (
            victim,
            caseDetails,
            victimName
        );
    }
}
