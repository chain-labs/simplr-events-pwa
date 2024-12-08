import { useEffect, useState } from "react";
import { arbitrum, arbitrumSepolia, base } from "wagmi/chains";

import { envVars } from "@/lib/envVars";
import { CONTRACTS } from "@/abi/contracts";

import { IContract } from "../Escrow";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

const useEventContract = () => {
  const [contract, setContract] = useState<IContract>({ abi, address: "0x" });

  useEffect(() => {
    if (isTestNetwork) {
      const address = CONTRACTS[arbitrumSepolia.id]
        .event as unknown as `0x${string}`;
      setContract({ abi, address });
    } else {
      const address = CONTRACTS[base.id].event as unknown as `0x${string}`;
      setContract({ abi, address });
    }
  }, []);
  return contract;
};

export default useEventContract;
