import { useState, useEffect } from "react";
import { arbitrum, arbitrumSepolia, base } from "wagmi/chains";

import { envVars } from "@/lib/envVars";

import { CONTRACTS } from "../contracts";
import { IContract } from "../Escrow";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useMarketplaceContract = () => {
  const [contractDetails, setContractDetails] = useState<IContract>({
    address: "0x",
    abi,
  });

  useEffect(() => {
    const address = isTestNetwork
      ? (CONTRACTS[arbitrumSepolia.id].marketplace as unknown as `0x${string}`)
      : (CONTRACTS[base.id].marketplace as unknown as `0x${string}`);

    setContractDetails({ abi, address });
  }, []);

  return contractDetails;
};

export default useMarketplaceContract;
