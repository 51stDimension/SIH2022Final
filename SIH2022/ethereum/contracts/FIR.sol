// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract FIRFactory{
    address[] public deployedFIRs;
    address latestFIR;

    function createFIR(string memory summary,string memory fullName) public{
        address newFIR = address(new FIR(summary,fullName,msg.sender));
        deployedFIRs.push(newFIR);
        latestFIR = newFIR;
    }

    function getLatestFIR() public view returns(address){
        return latestFIR;
    }

    function getDeployedFIRs() public view returns (address[] memory){
       return deployedFIRs;
    }
}

contract FIR{

    struct updateLogs{
        address updaterAddress;
        string updaterName;
        string updaterMessage;
    }

    mapping(uint => string) public diary;
   
    address public victim;
    string public caseDetails;
    string public victimName;
    uint public status;
    updateLogs[] public updates;

    constructor(string memory aboutCase,string memory name,address creator){
        victim = creator;
        caseDetails = aboutCase;
        victimName = name;
        status = 0;

        diary[0]="Filed";
        diary[1]="In Progress";
        diary[2]="Approved, Investigation going on";
        diary[3]="Final Closings";
        diary[4]="Closed";
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

    function updateCaseStatus(string memory name,string memory brief) public{
        updateLogs memory newUpdate =  updateLogs({
            updaterAddress:msg.sender,
            updaterName:name,
            updaterMessage:brief
        });
        updates.push(newUpdate);
        status++;
    }

    function getStatus() public view returns(string memory){
        return diary[status];
    }

    function getAllUpdateLogs() public view returns(updateLogs[] memory){
        return updates;
    }
}