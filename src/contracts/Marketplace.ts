import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from "wagmi/codegen";

import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Marketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const marketplaceAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_escrow", internalType: "address", type: "address" },
      { name: "_paymentCurrency", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
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
    name: "BIPS",
    outputs: [{ name: "", internalType: "uint256", type: "uint256" }],
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
    name: "LISTING_TYPEHASH",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct Marketplace.ListingParams",
        type: "tuple",
        components: [
          { name: "eventContract", internalType: "address", type: "address" },
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "seller", internalType: "address", type: "address" },
          { name: "deadline", internalType: "uint256", type: "uint256" },
        ],
      },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "cancelListing",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newPaymentCurrency", internalType: "address", type: "address" },
    ],
    name: "changePaymentCurrency",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", internalType: "bytes1", type: "bytes1" },
      { name: "name", internalType: "string", type: "string" },
      { name: "version", internalType: "string", type: "string" },
      { name: "chainId", internalType: "uint256", type: "uint256" },
      { name: "verifyingContract", internalType: "address", type: "address" },
      { name: "salt", internalType: "bytes32", type: "bytes32" },
      { name: "extensions", internalType: "uint256[]", type: "uint256[]" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "escrow",
    outputs: [{ name: "", internalType: "contract Escrow", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "feePercentage",
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
    inputs: [{ name: "role", internalType: "bytes32", type: "bytes32" }],
    name: "getRoleAdmin",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "view",
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
      {
        name: "params",
        internalType: "struct Marketplace.ListingParams",
        type: "tuple",
        components: [
          { name: "eventContract", internalType: "address", type: "address" },
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "seller", internalType: "address", type: "address" },
          { name: "deadline", internalType: "uint256", type: "uint256" },
        ],
      },
    ],
    name: "listTicket",
    outputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [{ name: "", internalType: "bytes32", type: "bytes32" }],
    name: "listingStates",
    outputs: [
      {
        name: "",
        internalType: "enum Marketplace.ListingState",
        type: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [],
    name: "paymentCurrency",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [
      {
        name: "params",
        internalType: "struct Marketplace.ListingParams",
        type: "tuple",
        components: [
          { name: "eventContract", internalType: "address", type: "address" },
          { name: "tokenId", internalType: "uint256", type: "uint256" },
          { name: "price", internalType: "uint256", type: "uint256" },
          { name: "seller", internalType: "address", type: "address" },
          { name: "deadline", internalType: "uint256", type: "uint256" },
        ],
      },
      { name: "signature", internalType: "bytes", type: "bytes" },
    ],
    name: "purchaseTicket",
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
    inputs: [
      { name: "newFeePercentage", internalType: "uint256", type: "uint256" },
    ],
    name: "setFeePercentage",
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [
      { name: "newFeeReceiver", internalType: "address", type: "address" },
    ],
    name: "setFeeReceiver",
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
  { type: "event", anonymous: false, inputs: [], name: "EIP712DomainChanged" },
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
        name: "newFeePercentage",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "FeeUpdated",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "listingHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
    ],
    name: "ListingCancelled",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "newCurrency",
        internalType: "address",
        type: "address",
        indexed: true,
      },
    ],
    name: "PaymentCurrencyChanged",
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
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "listingHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "seller",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "price",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
      {
        name: "eventContract",
        internalType: "address",
        type: "address",
        indexed: false,
      },
      {
        name: "deadline",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TicketListed",
  },
  {
    type: "event",
    anonymous: false,
    inputs: [
      {
        name: "listingHash",
        internalType: "bytes32",
        type: "bytes32",
        indexed: true,
      },
      {
        name: "buyer",
        internalType: "address",
        type: "address",
        indexed: true,
      },
      {
        name: "tokenId",
        internalType: "uint256",
        type: "uint256",
        indexed: false,
      },
    ],
    name: "TicketPurchased",
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
  { type: "error", inputs: [], name: "InvalidCurrency" },
  { type: "error", inputs: [], name: "InvalidDeadline" },
  { type: "error", inputs: [], name: "InvalidFeePercentage" },
  { type: "error", inputs: [], name: "InvalidFeeReceiver" },
  { type: "error", inputs: [], name: "InvalidPrice" },
  { type: "error", inputs: [], name: "InvalidShortString" },
  { type: "error", inputs: [], name: "InvalidSignature" },
  { type: "error", inputs: [], name: "ListingAlreadyCancelled" },
  { type: "error", inputs: [], name: "ListingAlreadyCompleted" },
  { type: "error", inputs: [], name: "ListingAlreadyExpired" },
  {
    type: "error",
    inputs: [{ name: "str", internalType: "string", type: "string" }],
    name: "StringTooLong",
  },
  { type: "error", inputs: [], name: "TransferFailed" },
] as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const marketplaceAddress = {
  8453: "0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f",
  42161: "0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e",
  421614: "0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5",
} as const;

/**
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const marketplaceConfig = {
  address: marketplaceAddress,
  abi: marketplaceAbi,
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplace = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceAdminRole = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "ADMIN_ROLE",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"BIPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceBips = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "BIPS",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceDefaultAdminRole = /*#__PURE__*/ createReadContract(
  {
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  }
);

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"LISTING_TYPEHASH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceListingTypehash = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "LISTING_TYPEHASH",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"eip712Domain"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceEip712Domain = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "eip712Domain",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"escrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceEscrow = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "escrow",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"feePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceFeePercentage = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "feePercentage",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"feeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceFeeReceiver = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "feeReceiver",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceGetRoleAdmin = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "getRoleAdmin",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceHasRole = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listingStates"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceListingStates = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "listingStates",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"paymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplacePaymentCurrency = /*#__PURE__*/ createReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "paymentCurrency",
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const readMarketplaceSupportsInterface =
  /*#__PURE__*/ createReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplace = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"cancelListing"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceCancelListing = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "cancelListing",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"changePaymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceChangePaymentCurrency =
  /*#__PURE__*/ createWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "changePaymentCurrency",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceGrantRole = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "grantRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceListTicket = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "listTicket",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"purchaseTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplacePurchaseTicket = /*#__PURE__*/ createWriteContract(
  {
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "purchaseTicket",
  }
);

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceRenounceRole = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "renounceRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceRevokeRole = /*#__PURE__*/ createWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "revokeRole",
});

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceSetFeePercentage =
  /*#__PURE__*/ createWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeePercentage",
  });

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const writeMarketplaceSetFeeReceiver = /*#__PURE__*/ createWriteContract(
  {
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeeReceiver",
  }
);

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplace = /*#__PURE__*/ createSimulateContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"cancelListing"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceCancelListing =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "cancelListing",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"changePaymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceChangePaymentCurrency =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "changePaymentCurrency",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceGrantRole =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceListTicket =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "listTicket",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"purchaseTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplacePurchaseTicket =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "purchaseTicket",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceRenounceRole =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceRevokeRole =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceSetFeePercentage =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeePercentage",
  });

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const simulateMarketplaceSetFeeReceiver =
  /*#__PURE__*/ createSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeeReceiver",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceEip712DomainChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"FeeReceiverUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceFeeReceiverUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "FeeReceiverUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"FeeUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceFeeUpdatedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "FeeUpdated",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"ListingCancelled"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceListingCancelledEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "ListingCancelled",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"PaymentCurrencyChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplacePaymentCurrencyChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "PaymentCurrencyChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceRoleAdminChangedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceRoleGrantedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceRoleRevokedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleRevoked",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"TicketListed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceTicketListedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "TicketListed",
  });

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"TicketPurchased"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const watchMarketplaceTicketPurchasedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "TicketPurchased",
  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplace = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceAdminRole = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "ADMIN_ROLE",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"BIPS"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceBips = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "BIPS",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "DEFAULT_ADMIN_ROLE",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"LISTING_TYPEHASH"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceListingTypehash =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "LISTING_TYPEHASH",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"eip712Domain"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceEip712Domain =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "eip712Domain",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"escrow"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceEscrow = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "escrow",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"feePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceFeePercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "feePercentage",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"feeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceFeeReceiver =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "feeReceiver",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceGetRoleAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "getRoleAdmin",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"hasRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceHasRole = /*#__PURE__*/ createUseReadContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
  functionName: "hasRole",
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listingStates"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceListingStates =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "listingStates",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"paymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplacePaymentCurrency =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "paymentCurrency",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useReadMarketplaceSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "supportsInterface",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplace = /*#__PURE__*/ createUseWriteContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"cancelListing"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceCancelListing =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "cancelListing",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"changePaymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceChangePaymentCurrency =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "changePaymentCurrency",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceGrantRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceListTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "listTicket",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"purchaseTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplacePurchaseTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "purchaseTicket",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceRevokeRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceSetFeePercentage =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeePercentage",
  });

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWriteMarketplaceSetFeeReceiver =
  /*#__PURE__*/ createUseWriteContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeeReceiver",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplace = /*#__PURE__*/ createUseSimulateContract({
  abi: marketplaceAbi,
  address: marketplaceAddress,
});

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"cancelListing"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceCancelListing =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "cancelListing",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"changePaymentCurrency"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceChangePaymentCurrency =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "changePaymentCurrency",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"grantRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "grantRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"listTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceListTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "listTicket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"purchaseTicket"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplacePurchaseTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "purchaseTicket",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"renounceRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "renounceRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"revokeRole"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "revokeRole",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeePercentage"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceSetFeePercentage =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeePercentage",
  });

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link marketplaceAbi}__ and `functionName` set to `"setFeeReceiver"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useSimulateMarketplaceSetFeeReceiver =
  /*#__PURE__*/ createUseSimulateContract({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    functionName: "setFeeReceiver",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"EIP712DomainChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceEip712DomainChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "EIP712DomainChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"FeeReceiverUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceFeeReceiverUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "FeeReceiverUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"FeeUpdated"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceFeeUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "FeeUpdated",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"ListingCancelled"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceListingCancelledEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "ListingCancelled",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"PaymentCurrencyChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplacePaymentCurrencyChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "PaymentCurrencyChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleAdminChanged",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleGranted",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "RoleRevoked",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"TicketListed"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceTicketListedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "TicketListed",
  });

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link marketplaceAbi}__ and `eventName` set to `"TicketPurchased"`
 *
 * - [__View Contract on Base Basescan__](https://basescan.org/address/0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f)
 * - [__View Contract on Arbitrum One Arbiscan__](https://arbiscan.io/address/0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e)
 * - [__View Contract on Arbitrum Sepolia Arbiscan__](https://sepolia.arbiscan.io/address/0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5)
 */
export const useWatchMarketplaceTicketPurchasedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: marketplaceAbi,
    address: marketplaceAddress,
    eventName: "TicketPurchased",
  });
