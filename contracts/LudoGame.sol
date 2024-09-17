// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract LudoGame {
    uint256 public number = 0;
    uint8 public constant NUMBER_OF_PLAYERS = 4;

    LudoBoard public ludo;
    uint8 public currentPlayerTurn;

    struct Player {
        address player;
        uint8 pieces
        bool gameHasEnded = true;
    }

    constructor(address[NUM_PLAYERS] memory _players) {
    
        currentPlayerTurn = 0;
    }

    mapping(uint8 => Player) public numberOfPlayers;
    mapping(address => uint8) public playersId;
    
   
    
    event DiceRolled(address player, uint8 roll);
    event PlayerMoved(address player, uint8 newX, uint8 newY);
    event GameWon(address winner);

    function joinGame() public {
        require(playerIndices[msg.sender] == 0, "Already joined");
        players.push(Player(msg.sender, [0, 0, 0, 0]));
        playerIndices[msg.sender] = players.length - 1;
    }

    function rollDice() public {
        require(players[currentTurn].playerAddress == msg.sender, "Not your turn");

        uint256 dice = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        uint256 rollResult = seed % 6 + 1;

    }
}