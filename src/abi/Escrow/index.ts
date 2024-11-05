import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/lib/envVars";

import { CONTRACTS } from "../contracts";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useEscrowContract = () => {
  if (isTestNetwork) {
    const address = CONTRACTS[arbitrumSepolia.id]
      .escrow as unknown as `0x${string}`;
    return { abi, address };
  } else {
    const address = CONTRACTS[arbitrum.id].escrow as unknown as `0x${string}`;
    return { abi, address };
  }
};

export default useEscrowContract;
