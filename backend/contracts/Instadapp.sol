//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract InstaDapp {
    
    struct Image{
        uint256 id;
        string cid;
        string desc;
        address author;
    }
    mapping(uint256 => Image) public images;

    uint256 public count = 0;
    // Add images 
    function addImages(string memory _cid,string memory _desc) public{
        require(bytes(_cid).length > 0,'Not valid hash');
        require(bytes(_desc).length > 0,'Not valid description');
        count = count+1;
        images[count] = Image(count,_cid,_desc,msg.sender);
    }

}