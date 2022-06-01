//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract AbiTypes {
    string private greeting;

    uint256[] private ids;

    struct User {
      string name;
      uint256 balance;
    }

    mapping(address => User) private users;

    constructor() {}

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function getIds() public view returns (uint256[] memory) {
      return ids;
    }

    function setIds(uint256[] memory _ids) public {
      ids = _ids;
    }

    function setUser(User memory u) public {
      users[msg.sender] = u;
    }

    function getUser(address u) public view returns (User memory) {
      return users[u];
    }
}
