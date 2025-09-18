
export const DKP_CONTRACT_ADDRESS = "0xB4bFc0626aF9D4D4dd5Eb0f69aB51f4bFEab5B98";

export const DKP_CONTRACT_ABI = [
    {
      "type": "function",
      "name": "UPGRADE_INTERFACE_VERSION",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCurrentId",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getSubmissions",
      "inputs": [
        { "name": "submissionId", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [
        {
          "name": "",
          "type": "tuple",
          "internalType": "struct DKP.Submission",
          "components": [
            { "name": "id", "type": "uint256", "internalType": "uint256" },
            {
              "name": "contentHash",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            { "name": "author", "type": "address", "internalType": "address" },
            {
              "name": "timestamp",
              "type": "uint256",
              "internalType": "uint256"
            },
            { "name": "upVotes", "type": "uint256", "internalType": "uint256" },
            {
              "name": "downVotes",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "hasVoted",
      "inputs": [
        { "name": "", "type": "uint256", "internalType": "uint256" },
        { "name": "", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "initialize",
      "inputs": [
        { "name": "initialOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "proxiableUUID",
      "inputs": [],
      "outputs": [{ "name": "", "type": "bytes32", "internalType": "bytes32" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "renounceOwnership",
      "inputs": [],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "submissions",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" },
        { "name": "contentHash", "type": "bytes32", "internalType": "bytes32" },
        { "name": "author", "type": "address", "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "internalType": "uint256" },
        { "name": "upVotes", "type": "uint256", "internalType": "uint256" },
        { "name": "downVotes", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "submitContent",
      "inputs": [
        { "name": "_contentHash", "type": "bytes32", "internalType": "bytes32" }
      ],
      "outputs": [
        { "name": "id", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [
        { "name": "newOwner", "type": "address", "internalType": "address" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "upgradeToAndCall",
      "inputs": [
        {
          "name": "newImplementation",
          "type": "address",
          "internalType": "address"
        },
        { "name": "data", "type": "bytes", "internalType": "bytes" }
      ],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "vote",
      "inputs": [
        {
          "name": "submissionId",
          "type": "uint256",
          "internalType": "uint256"
        },
        { "name": "_isUpvote", "type": "bool", "internalType": "bool" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "ContentSubmitted",
      "inputs": [
        {
          "name": "Id",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "author",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Initialized",
      "inputs": [
        {
          "name": "version",
          "type": "uint64",
          "indexed": false,
          "internalType": "uint64"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        {
          "name": "previousOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "newOwner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Upgraded",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Voted",
      "inputs": [
        {
          "name": "Id",
          "type": "uint256",
          "indexed": true,
          "internalType": "uint256"
        },
        {
          "name": "user",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AddressEmptyCode",
      "inputs": [
        { "name": "target", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "ERC1967InvalidImplementation",
      "inputs": [
        {
          "name": "implementation",
          "type": "address",
          "internalType": "address"
        }
      ]
    },
    { "type": "error", "name": "ERC1967NonPayable", "inputs": [] },
    { "type": "error", "name": "FailedCall", "inputs": [] },
    { "type": "error", "name": "InvalidInitialization", "inputs": [] },
    { "type": "error", "name": "NotInitializing", "inputs": [] },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" }
      ]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [
        { "name": "account", "type": "address", "internalType": "address" }
      ]
    },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
    { "type": "error", "name": "UUPSUnauthorizedCallContext", "inputs": [] },
    {
      "type": "error",
      "name": "UUPSUnsupportedProxiableUUID",
      "inputs": [
        { "name": "slot", "type": "bytes32", "internalType": "bytes32" }
      ]
    }
];