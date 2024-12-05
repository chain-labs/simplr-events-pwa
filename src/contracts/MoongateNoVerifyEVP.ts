import { createReadContract } from "wagmi/codegen";
import { createUseReadContract } from "wagmi/codegen";

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MoongateEVP
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moongateEvpAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "_mainTicketContract", internalType: "address", type: "address" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    inputs: [],
    name: "mainTicketContract",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    inputs: [{ name: "ticketData", internalType: "bytes", type: "bytes" }],
    name: "verify",
    outputs: [{ name: "", internalType: "bool", type: "bool" }],
    stateMutability: "view",
  },
] as const;

export const eventAddress = {
  8453: "0x7D41caDC4Ad09Af751BdA042ca78EE1d1F282CBD",
  421614: "0x1Ba528468ca3FF020CB18Af2d25F2c189300CbF8",
} as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link moongateEvpAbi}__
 */
export const readMoongateEvp = /*#__PURE__*/ createReadContract({
  abi: moongateEvpAbi,
});

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link moongateEvpAbi}__ and `functionName` set to `"mainTicketContract"`
 */
export const readMoongateEvpMainTicketContract =
  /*#__PURE__*/ createReadContract({
    abi: moongateEvpAbi,
    functionName: "mainTicketContract",
  });

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link moongateEvpAbi}__ and `functionName` set to `"verify"`
 */
export const readMoongateEvpVerify = /*#__PURE__*/ createReadContract({
  abi: moongateEvpAbi,
  functionName: "verify",
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link moongateEvpAbi}__
 */
export const useReadMoongateEvp = /*#__PURE__*/ createUseReadContract({
  abi: moongateEvpAbi,
});

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link moongateEvpAbi}__ and `functionName` set to `"mainTicketContract"`
 */
export const useReadMoongateEvpMainTicketContract =
  /*#__PURE__*/ createUseReadContract({
    abi: moongateEvpAbi,
    functionName: "mainTicketContract",
  });

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link moongateEvpAbi}__ and `functionName` set to `"verify"`
 */
export const useReadMoongateEvpVerify = /*#__PURE__*/ createUseReadContract({
  abi: moongateEvpAbi,
  functionName: "verify",
});
