import { arbitrum, arbitrumSepolia, sepolia } from "viem/chains";
import { PrimeSdk, Web3WalletProvider } from "@etherspot/prime-sdk";
import React, { useCallback, useEffect } from "react";
import { useWallets } from "@privy-io/react-auth";
import { ModularSdk } from "@etherspot/modular-sdk";
import { encodeFunctionData } from "viem";

import { envVars } from "@/lib/envVars";

const CHAIN_ID = envVars.isTestNetwork ? arbitrumSepolia.id : arbitrum.id;

const useEtherspot = () => {
  const [etherspot, setEtherspot] = React.useState<PrimeSdk | null>(null);

  const { wallets, ready } = useWallets();

  useEffect(() => {
    const getEtherspot = async () => {
      if (wallets[0]) {
        const provider = await wallets[0].getEthersProvider();

        const web3Provider = {
          send: (
            payload: any,
            callback: (error: any, response?: any) => void
          ) => {
            provider
              .send(payload.method, payload.params)
              .then(result => callback(null, { result }))
              .catch(error => callback(error));
          },
        };
        const mappedProvider = new Web3WalletProvider(web3Provider);
        await mappedProvider.refresh();
        const primeSdk = new PrimeSdk(mappedProvider, {
          chainId: CHAIN_ID,
          bundlerProvider: {
            url: `https://testnet-rpc.etherspot.io/v1/${CHAIN_ID}?api-key=${envVars.etherspotApiKey}`,
          },
        });

        const account = await primeSdk.getCounterFactualAddress();
        console.log("account", account);

        setEtherspot(primeSdk);
      }
    };
    if (ready) getEtherspot();
    console.log({ see: wallets });
  }, [wallets, ready]);

  const executeSponsoredTransaction = useCallback(
    async (
      contractAddress: string,
      abi: any,
      functionName: string,
      args: any[]
    ) => {
      const startTime = Date.now();
      while (!etherspot?.state) {
        await new Promise(resolve => setTimeout(resolve, 500));
        if (Date.now() - startTime > 5000) {
          throw new Error("Etherspot SDK not initialized after 5 seconds");
        }
        if (!etherspot) {
          throw new Error("Etherspot SDK not initialized");
        }
      }
      try {
        const data = encodeFunctionData({
          abi,
          functionName,
          args,
        });

        await etherspot.clearUserOpsFromBatch();
        await etherspot.addUserOpsToBatch({
          to: contractAddress,
          data,
        });

        const op = await etherspot.estimate({
          paymasterDetails: {
            url: `https://arka.etherspot.io?apiKey=${envVars.etherspotApiKey}&chainId=${CHAIN_ID}`,
            context: { mode: "sponsor" },
          },
        });
        console.log(`${functionName}->Estimated gas costs:`, op);

        const uoHash = await etherspot.send(op);

        console.log(`${functionName}-> UserOpHash: ${uoHash}`);

        console.log(`${functionName}-> Waiting for  transaction...`);
        let userOpsReceipt = null;
        const timeout = Date.now() + 60000; // 1 minute timeout
        while (userOpsReceipt === null && Date.now() < timeout) {
          await new Promise(resolve => setTimeout(resolve, 500));
          userOpsReceipt = await etherspot.getUserOpReceipt(uoHash);
        }
        console.log(
          "\x1b[33m%s\x1b[0m",
          `${functionName}->Transaction Receipt: `,
          userOpsReceipt
        );

        return { success: true, receipt: userOpsReceipt };
      } catch (error) {
        console.error(`${functionName}->Sponsored transaction failed:`, error);
        throw error;
      }
    },
    [etherspot]
  );

  return { executeSponsoredTransaction, etherspot, init: etherspot?.state$ };
};

export default useEtherspot;
