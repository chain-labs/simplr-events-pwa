import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { useEffect, useState } from "react";

import { envVars } from "@/lib/envVars";

import { CONTRACTS } from "../contracts";

import abi from "./abi.json";

const { isTestNetwork } = envVars;

export type IPaymentContract = {
  abi: any;
  address: `0x${string}`;
  decimals: number;
};

const usePaymentTokenContract = () => {
  const [contract, setContract] = useState<IPaymentContract>({
    abi,
    address: "0x",
    decimals: envVars.isTestNetwork ? 18 : 6,
  });

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
