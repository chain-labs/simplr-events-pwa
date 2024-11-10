import { useEffect, useState } from "react";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";

import { envVars } from "@/lib/envVars";
import { CONTRACTS } from "@/abi/contracts";

import abi from "./abi.json";
import { IContract } from "../Escrow";

const { isTestNetwork } = envVars;

const useEventContract = () => {
  const [contract, setContract] = useState<IContract>({ abi, address: "0x" });

  useEffect(() => {
    if (isTestNetwork) {
      const address = CONTRACTS[arbitrumSepolia.id]
        .event as unknown as `0x${string}`;
      setContract({ abi, address });
    } else {
      const address = CONTRACTS[arbitrum.id].event as unknown as `0x${string}`;
      setContract({ abi, address });
    }
  }, []);
  return contract;
};

export default useEventContract;
