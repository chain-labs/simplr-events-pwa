import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { useEffect, useState } from "react";

import { envVars } from "@/lib/envVars";

import { CONTRACTS } from "../contracts";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

const usePaymentTokenContract = () => {
  const [contract, setContract] = useState<{
    abi: any;
    address: `0x${string}`;
    decimals: number;
  }>({ abi, address: "0x", decimals: 18 });

  useEffect(() => {
    if (isTestNetwork) {
      const address = CONTRACTS[arbitrumSepolia.id]
        .paymentToken as unknown as `0x${string}`;
      const decimals = 18;
      setContract({ abi, address, decimals });
    } else {
      const address = CONTRACTS[arbitrum.id]
        .paymentToken as unknown as `0x${string}`;
      const decimals = 6;
      setContract({ abi, address, decimals });
    }
  }, []);

  return contract;
};

export default usePaymentTokenContract;
