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
// Escrow
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const escrowAbi = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "MARKETPLACE_ROLE",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct Escrow.EscrowParams",
        type: "tuple",
        components: [
          { name: "seller", internalType: "address", type: "address" },
          { name: "buyer", internalType: "address", type: "address" },
          { name: "eventContract", internalType: "address", type: "address" },
          { name: "paymentToken", internalType: "address", type: "address" },
          { name: "amount", internalType: "uint256", type: "uint256" },
          { name: "tokenId", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "createNewEscrow",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "eventContract", internalType: "address", type: "address" },
    ],
    name: "dispute",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "", internalType: "address", type: "address" },
      { name: "", internalType: "uint256", type: "uint256" },
    ],
    name: "escrows",
    outputs: [
      { name: "seller", internalType: "address", type: "address" },
      { name: "buyer", internalType: "address", type: "address" },
      { name: "eventContract", internalType: "address", type: "address" },
      { name: "paymentToken", internalType: "address", type: "address" },
      { name: "amount", internalType: "uint256", type: "uint256" },
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "isDisputed", internalType: "bool", type: "bool" },
      { name: "isResolved", internalType: "bool", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "eventContract", internalType: "address", type: "address" },
    ],
    name: "getEscrowDetails",
    outputs: [
      {
        name: "",
        internalType: "struct Escrow.EscrowDetails",
        type: "tuple",
        components: [
          { name: "seller", internalType: "address", type: "address" },
          { name: "buyer", internalType: "address", type: "address" },
          { name: "eventContract", internalType: "address", type: "address" },
          { name: "paymentToken", internalType: "address", type: "address" },
          { name: "amount", internalType: "uint256", type: "uint256" },
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "isDisputed", internalType: "bool", type: "bool" },
          { name: "isResolved", internalType: "bool", type: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "admin", internalType: "address", type: "address" }],
    name: "grantAdminRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "marketplace", internalType: "address", type: "address" }],
    name: "grantMarketplaceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "hasRole",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "eventContract", internalType: "address", type: "address" },
      { name: "user", internalType: "address", type: "address" },
    ],
    name: "hasTicketRights",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "eventContract", internalType: "address", type: "address" },
      { name: "to", internalType: "address", type: "address" },
    ],
    name: "releaseDisputedFunds",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "tokenId", internalType: "uint256", type: "uint256" },
      { name: "eventContract", internalType: "address", type: "address" },
    ],
    name: "releaseFunds",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "callerConfirmation", internalType: "address", type: "address" },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32" },
      { name: "account", internalType: "address", type: "address" },
    ],
    name: "revokeRole",
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
        name: "eventContract",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "DisputeRaised",
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
        name: "eventContract",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: false },
    ],
    name: "DisputeResolved",
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
        name: "eventContract",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "EscrowCreated",
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
        name: "eventContract",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      { name: "to", internalType: "address", type: "address", indexed: false },
      {
        name: "amount",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FundsReleased",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "previousAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "newAdminRole",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "RoleAdminChanged",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleGranted",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      { name: "role", internalType: "bytes32", type: "bytes32", indexed: true },
      {
        name: "account",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "sender",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "RoleRevoked",
  },
  { type: "error", inputs: [], name: "AccessControlBadConfirmation" },
  {
    type: "error",
    inputs: [
      { name: "account", internalType: "address", type: "address" },
      { name: "neededRole", internalType: "bytes32", type: "bytes32" },
    ],
    name: "AccessControlUnauthorizedAccount",
  },
  { type: "error", inputs: [], name: "AlreadyDisputed" },
  { type: "error", inputs: [], name: "AlreadyResolved" },
  { type: "error", inputs: [], name: "DuplicateEscrow" },
  { type: "error", inputs: [], name: "InvalidAddress" },
  { type: "error", inputs: [], name: "InvalidAmount" },
  { type: "error", inputs: [], name: "InvalidTokenId" },
  { type: "error", inputs: [], name: "NotAuthorized" },
  { type: "error", inputs: [], name: "NotDisputed" },
  { type: "error", inputs: [], name: "TransferFailed" },
] as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const escrowAddress = {
  8453: "0x716511223244de62dfdDf26461C926A46Ee2fC20",
  42161: "0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9",
  421614: "0x337E30817209B5eBf90FF73Ca145cf3E147c103D",
} as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const escrowConfig = { address: escrowAddress, abi: escrowAbi } as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrow = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowAdminRole = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "ADMIN_ROLE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowDefaultAdminRole = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "DEFAULT_ADMIN_ROLE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"MARKETPLACE_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowMarketplaceRole = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "MARKETPLACE_ROLE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"escrows"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowEscrows = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "escrows",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"getEscrowDetails"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowGetEscrowDetails = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "getEscrowDetails",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowHasRole = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"hasTicketRights"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowHasTicketRights = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "hasTicketRights",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const readEscrowSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "supportsInterface",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrow = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"createNewEscrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowCreateNewEscrow = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "createNewEscrow",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"dispute"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowDispute = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "dispute",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantAdminRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowGrantAdminRole = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "grantAdminRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantMarketplaceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowGrantMarketplaceRole =
  /*#__PURE__*/ createWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantMarketplaceRole",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowGrantRole = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseDisputedFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowReleaseDisputedFunds =
  /*#__PURE__*/ createWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "releaseDisputedFunds",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowReleaseFunds = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "releaseFunds",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowRenounceRole = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const writeEscrowRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrow = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"createNewEscrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowCreateNewEscrow =
  /*#__PURE__*/ createSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "createNewEscrow",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"dispute"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowDispute = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "dispute",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantAdminRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowGrantAdminRole =
  /*#__PURE__*/ createSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantAdminRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantMarketplaceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowGrantMarketplaceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantMarketplaceRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowGrantRole = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseDisputedFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowReleaseDisputedFunds =
  /*#__PURE__*/ createSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "releaseDisputedFunds",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowReleaseFunds = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "releaseFunds",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowRenounceRole = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const simulateEscrowRevokeRole = /*#__PURE__*/ createSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"DisputeRaised"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowDisputeRaisedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "DisputeRaised",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"DisputeResolved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowDisputeResolvedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "DisputeResolved",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"EscrowCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowEscrowCreatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "EscrowCreated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"FundsReleased"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowFundsReleasedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "FundsReleased",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const watchEscrowRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleRevoked",
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrow = /*#__PURE__*/ createUseReadContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "ADMIN_ROLE",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"MARKETPLACE_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowMarketplaceRole = /*#__PURE__*/ createUseReadContract(
  { abi: escrowAbi, address: escrowAddress, functionName: "MARKETPLACE_ROLE" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"escrows"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowEscrows = /*#__PURE__*/ createUseReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "escrows",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"getEscrowDetails"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowGetEscrowDetails =
  /*#__PURE__*/ createUseReadContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "getEscrowDetails",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowHasRole = /*#__PURE__*/ createUseReadContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"hasTicketRights"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowHasTicketRights = /*#__PURE__*/ createUseReadContract(
  { abi: escrowAbi, address: escrowAddress, functionName: "hasTicketRights" }
);

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useReadEscrowSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrow = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"createNewEscrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowCreateNewEscrow =
  /*#__PURE__*/ createUseWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "createNewEscrow",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"dispute"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowDispute = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "dispute",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantAdminRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowGrantAdminRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantAdminRole",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantMarketplaceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowGrantMarketplaceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantMarketplaceRole",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseDisputedFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowReleaseDisputedFunds =
  /*#__PURE__*/ createUseWriteContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "releaseDisputedFunds",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowReleaseFunds = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "releaseFunds",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowRenounceRole = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWriteEscrowRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: escrowAbi,
  address: escrowAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrow = /*#__PURE__*/ createUseSimulateContract({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"createNewEscrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowCreateNewEscrow =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "createNewEscrow",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"dispute"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowDispute = /*#__PURE__*/ createUseSimulateContract(
  { abi: escrowAbi, address: escrowAddress, functionName: "dispute" }
);

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantAdminRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowGrantAdminRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantAdminRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantMarketplaceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowGrantMarketplaceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantMarketplaceRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseDisputedFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowReleaseDisputedFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "releaseDisputedFunds",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"releaseFunds"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowReleaseFunds =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "releaseFunds",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link escrowAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useSimulateEscrowRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: escrowAbi,
    address: escrowAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: escrowAbi,
  address: escrowAddress,
});

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"DisputeRaised"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowDisputeRaisedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "DisputeRaised",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"DisputeResolved"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowDisputeResolvedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "DisputeResolved",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"EscrowCreated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowEscrowCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "EscrowCreated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"FundsReleased"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowFundsReleasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "FundsReleased",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link escrowAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x716511223244de62dfdDf26461C926A46Ee2fC20)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x337E30817209B5eBf90FF73Ca145cf3E147c103D)
 */
export const useWatchEscrowRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: escrowAbi,
    address: escrowAddress,
    eventName: "RoleRevoked",
  });
