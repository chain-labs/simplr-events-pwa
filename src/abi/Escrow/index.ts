import { useState, useEffect } from "react";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/lib/envVars";

import { CONTRACTS } from "../contracts";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useEscrowContract = () => {
  const [contractDetails, setContractDetails] = useState<{
    abi: any;
    address: `0x${string}`;
  }>({ address: "0x", abi });

  useEffect(() => {
    const address = isTestNetwork
      ? (CONTRACTS[arbitrumSepolia.id].escrow as unknown as `0x${string}`)
      : (CONTRACTS[arbitrum.id].escrow as unknown as `0x${string}`);

    setContractDetails({ abi, address });
  }, []);

  return contractDetails;
};

export default useEscrowContract;
