import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Event
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const eventAbi = [
  {
    type: "function",
    inputs: [],
    name: "MAX_ORGANISER_FEE",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "data",
        internalType: "struct Event.CreateDigitalTwin",
        type: "tuple",
        components: [
          {
            name: "ticketSerialNumberHash",
            internalType: "bytes32",
            type: "bytes32",
          },
          { name: "seat", internalType: "string", type: "string" },
          { name: "verificationData", internalType: "bytes", type: "bytes" },
          {
            name: "ticketEncryptedDataUri",
            internalType: "string",
            type: "string",
          },
          { name: "ticketMetadata", internalType: "string", type: "string" },
        ],
      },
    ],
    name: "createTicket",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "eventStartTimestamp",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "feeReceiver",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "getApproved",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "eventParams",
        internalType: "struct EventsFactory.CreateEventParams",
        type: "tuple",
        components: [
          {
            name: "provider",
            internalType: "contract EventVerificationProvider",
            type: "address",
          },
          { name: "admin", internalType: "address", type: "address" },
          { name: "eventName", internalType: "string", type: "string" },
          { name: "eventSymbol", internalType: "string", type: "string" },
          {
            name: "eventStartTimestamp",
            internalType: "uint256",
            type: "uint256",
          },
          { name: "feePercentage", internalType: "uint256", type: "uint256" },
          { name: "feeReceiver", internalType: "address", type: "address" },
          { name: "marketplace", internalType: "address", type: "address" },
        ],
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "owner", internalType: "address", type: "address" },
      { name: "operator", internalType: "address", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "marketplace",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "name",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "organiserFee",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "approved", internalType: "bool", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_feeReceiver", internalType: "address", type: "address" },
    ],
    name: "setFeeReceiver",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "_organiserFee", internalType: "uint256", type: "uint256" },
    ],
    name: "setOrganiserFee",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "interfaceId", internalType: "bytes4", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    name: "ticketData",
    outputs: [
      {
        name: "ticketSerialNumberHash",
        internalType: "bytes32",
        type: "bytes32",
      },
      { name: "seat", internalType: "string", type: "string" },
      { name: "verificationData", internalType: "bytes", type: "bytes" },
      {
        name: "ticketEncryptedDataUri",
        internalType: "string",
        type: "string",
      },
      { name: "ticketMetadata", internalType: "string", type: "string" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "tokenIdCounter",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "", internalType: "string", type: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "from", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "newOwner", internalType: "address", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newImplementation", internalType: "address", type: "address" },
      { name: "data", internalType: "bytes", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    inputs: [],
    name: "verificationProvider",
    outputs: [
      {
        name: "",
        internalType: "contract EventVerificationProvider",
        type: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "approved",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Approval",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "operator",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "approved", internalType: "bool", type: "bool", indexed: false },
    ],
    name: "ApprovalForAll",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newFeeReceiver",
        internalType: "address",
        type: "address",
        indexed: false,
      },
    ],
    name: "FeeReceiverUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "version",
        internalType: "uint64",
        type: "uint64",
        indexed: false,
      },
    ],
    name: "Initialized",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newFeePercentage",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "OrganiserFeeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "previousOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "newOwner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "OwnershipTransferred",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
      {
        name: "owner",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "ticketSerialNumberHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: false,
      },
      { name: "seat", internalType: "string", type: "string", indexed: false },
    ],
    name: "TicketCreated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "from", internalType: "address", type: "address", indexed: true },
      { name: "to", internalType: "address", type: "address", indexed: true },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: true,
      },
    ],
    name: "Transfer",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "implementation",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "Upgraded",
  },
  {
    type: "error",
    inputs: [{ name: "target", internalType: "address", type: "address" }],
    name: "AddressEmptyCode",
  },
  {
    type: "error",
    inputs: [
      { name: "implementation", internalType: "address", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
  },
  { type: "error", inputs: [], name: "ERC1967NonPayable" },
  {
    type: "error",
    inputs: [
      { name: "sender", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "owner", internalType: "address", type: "address" },
    ],
    name: "ERC721IncorrectOwner",
  },
  {
    type: "error",
    inputs: [
      { name: "operator", internalType: "address", type: "address" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
    ],
    name: "ERC721InsufficientApproval",
  },
  {
    type: "error",
    inputs: [{ name: "approver", internalType: "address", type: "address" }],
    name: "ERC721InvalidApprover",
  },
  {
    type: "error",
    inputs: [{ name: "operator", internalType: "address", type: "address" }],
    name: "ERC721InvalidOperator",
  },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "ERC721InvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "receiver", internalType: "address", type: "address" }],
    name: "ERC721InvalidReceiver",
  },
  {
    type: "error",
    inputs: [{ name: "sender", internalType: "address", type: "address" }],
    name: "ERC721InvalidSender",
  },
  {
    type: "error",
    inputs: [{ name: "tokenId", internalType: "uint256", type: "uint256" }],
    name: "ERC721NonexistentToken",
  },
  { type: "error", inputs: [], name: "FailedCall" },
  { type: "error", inputs: [], name: "InvalidAdmin" },
  { type: "error", inputs: [], name: "InvalidFeeReceiver" },
  { type: "error", inputs: [], name: "InvalidInitialization" },
  { type: "error", inputs: [], name: "InvalidMarketplace" },
  { type: "error", inputs: [], name: "InvalidOrganiserFee" },
  { type: "error", inputs: [], name: "InvalidProvider" },
  { type: "error", inputs: [], name: "InvalidStartTime" },
  { type: "error", inputs: [], name: "NotInitializing" },
  {
    type: "error",
    inputs: [{ name: "owner", internalType: "address", type: "address" }],
    name: "OwnableInvalidOwner",
  },
  {
    type: "error",
    inputs: [{ name: "account", internalType: "address", type: "address" }],
    name: "OwnableUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "UUPSUnauthorizedCallContext" },
  {
    type: "error",
    inputs: [{ name: "slot", internalType: "bytes32", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
  },
  { type: "error", inputs: [], name: "VerificationFailed" },
] as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const eventAddress = {
  8453: "0x7D41caDC4Ad09Af751BdA042ca78EE1d1F282CBD",
  421614: "0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7",
} as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const eventConfig = { address: eventAddress, abi: eventAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEvent = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"MAX_ORGANISER_FEE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventMaxOrganiserFee = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "MAX_ORGANISER_FEE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventUpgradeInterfaceVersion =
  /*#__PURE__*/ createReadContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "UPGRADE_INTERFACE_VERSION",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventBalanceOf = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"eventStartTimestamp"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventEventStartTimestamp = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "eventStartTimestamp",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"feeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventFeeReceiver = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "feeReceiver",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventGetApproved = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "getApproved",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "isApprovedForAll",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"marketplace"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventMarketplace = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "marketplace",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventName = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "name",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"organiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventOrganiserFee = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "organiserFee",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventOwner = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventOwnerOf = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "ownerOf",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventProxiableUuid = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "proxiableUUID",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "supportsInterface",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventSymbol = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"ticketData"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventTicketData = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "ticketData",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"tokenIdCounter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventTokenIdCounter = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "tokenIdCounter",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventTokenUri = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "tokenURI",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"verificationProvider"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const readEventVerificationProvider = /*#__PURE__*/ createReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "verificationProvider",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEvent = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventApprove = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"createTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventCreateTicket = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "createTicket",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventInitialize = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "renounceOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "safeTransferFrom",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "setApprovalForAll",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventSetFeeReceiver = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "setFeeReceiver",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setOrganiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventSetOrganiserFee = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "setOrganiserFee",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "transferOwnership",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const writeEventUpgradeToAndCall = /*#__PURE__*/ createWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "upgradeToAndCall",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEvent = /*#__PURE__*/ createSimulateContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventApprove = /*#__PURE__*/ createSimulateContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"createTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventCreateTicket = /*#__PURE__*/ createSimulateContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "createTicket",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventInitialize = /*#__PURE__*/ createSimulateContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "safeTransferFrom",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setApprovalForAll",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventSetFeeReceiver = /*#__PURE__*/ createSimulateContract(
  { abi: eventAbi, address: eventAddress, functionName: "setFeeReceiver" }
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setOrganiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventSetOrganiserFee =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setOrganiserFee",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const simulateEventUpgradeToAndCall =
  /*#__PURE__*/ createSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "upgradeToAndCall",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: eventAbi,
  address: eventAddress,
  eventName: "Approval",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "ApprovalForAll",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"FeeReceiverUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventFeeReceiverUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "FeeReceiverUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventInitializedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"OrganiserFeeUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventOrganiserFeeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "OrganiserFeeUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"TicketCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventTicketCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "TicketCreated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: eventAbi,
  address: eventAddress,
  eventName: "Transfer",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const watchEventUpgradedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: eventAbi,
  address: eventAddress,
  eventName: "Upgraded",
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEvent = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"MAX_ORGANISER_FEE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventMaxOrganiserFee = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "MAX_ORGANISER_FEE",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"UPGRADE_INTERFACE_VERSION"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventUpgradeInterfaceVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "UPGRADE_INTERFACE_VERSION",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"balanceOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "balanceOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"eventStartTimestamp"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventEventStartTimestamp =
  /*#__PURE__*/ createUseReadContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "eventStartTimestamp",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"feeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventFeeReceiver = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "feeReceiver",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"getApproved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "getApproved",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"isApprovedForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventIsApprovedForAll = /*#__PURE__*/ createUseReadContract(
  { abi: eventAbi, address: eventAddress, functionName: "isApprovedForAll" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"marketplace"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventMarketplace = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "marketplace",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"name"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventName = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "name",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"organiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventOrganiserFee = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "organiserFee",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"owner"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventOwner = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "owner",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"ownerOf"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "ownerOf",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"proxiableUUID"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventProxiableUuid = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "proxiableUUID",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"symbol"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventSymbol = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "symbol",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"ticketData"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventTicketData = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "ticketData",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"tokenIdCounter"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventTokenIdCounter = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "tokenIdCounter",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"tokenURI"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "tokenURI",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"verificationProvider"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useReadEventVerificationProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "verificationProvider",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEvent = /*#__PURE__*/ createUseWriteContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventApprove = /*#__PURE__*/ createUseWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"createTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventCreateTicket = /*#__PURE__*/ createUseWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "createTicket",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "initialize",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "safeTransferFrom",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setApprovalForAll",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventSetFeeReceiver = /*#__PURE__*/ createUseWriteContract(
  { abi: eventAbi, address: eventAddress, functionName: "setFeeReceiver" }
);

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setOrganiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventSetOrganiserFee =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setOrganiserFee",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "transferFrom",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWriteEventUpgradeToAndCall =
  /*#__PURE__*/ createUseWriteContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "upgradeToAndCall",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEvent = /*#__PURE__*/ createUseSimulateContract({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"approve"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventApprove = /*#__PURE__*/ createUseSimulateContract({
  abi: eventAbi,
  address: eventAddress,
  functionName: "approve",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"createTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventCreateTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "createTicket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"initialize"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "initialize",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"renounceOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "renounceOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"safeTransferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "safeTransferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setApprovalForAll",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventSetFeeReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setFeeReceiver",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"setOrganiserFee"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventSetOrganiserFee =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "setOrganiserFee",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferFrom"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "transferFrom",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"transferOwnership"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "transferOwnership",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link eventAbi}__ and `functionName` set to `"upgradeToAndCall"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useSimulateEventUpgradeToAndCall =
  /*#__PURE__*/ createUseSimulateContract({
    abi: eventAbi,
    address: eventAddress,
    functionName: "upgradeToAndCall",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: eventAbi,
  address: eventAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Approval"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "Approval",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"ApprovalForAll"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "ApprovalForAll",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"FeeReceiverUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventFeeReceiverUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "FeeReceiverUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Initialized"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "Initialized",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"OrganiserFeeUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventOrganiserFeeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "OrganiserFeeUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"OwnershipTransferred"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "OwnershipTransferred",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"TicketCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventTicketCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "TicketCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Transfer"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "Transfer",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link eventAbi}__ and `eventName` set to `"Upgraded"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x7d41cadc4ad09af751bda042ca78ee1d1f282cbd)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7)
 */
export const useWatchEventUpgradedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: eventAbi,
    address: eventAddress,
    eventName: "Upgraded",
  });
