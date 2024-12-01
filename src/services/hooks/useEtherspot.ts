import {
  EtherspotBundler,
  Factory,
  PrimeSdk,
  Web3WalletProvider,
} from "@etherspot/prime-sdk";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useEffect } from "react";

import { envVars } from "@/lib/envVars";

import useAccount from "./useAccount";

const useEtherspot = () => {
  const [etherspot, setEtherspot] = React.useState<PrimeSdk | null>(null);
  const { web3Auth } = useWeb3Auth();
  const { address } = useAccount();

  useEffect(() => {
    const getEtherspot = async () => {
      if (web3Auth?.provider) {
        const mappedProvider = new Web3WalletProvider(web3Auth.provider);
        await mappedProvider.refresh();

        // Instantiate Etherspot Prime SDK with wrapped web3auth provider
        // const etherspotPrimeSdk = new PrimeSdk(mappedProvider, {
        //   chainId: envVars.isTestNetwork ? 421614 : 42161,
        //   accountAddress: address ?? "",
        //   bundlerProvider: {
        //     url: envVars.isTestNetwork
        //       ? `https://testnet-rpc.etherspot.io/v1/421614?api-key=${envVars.etherspotApiKey}`
        //       : `https://rpc.etherspot.io/v1/42161?api-key=${envVars.etherspotApiKey}`,
        //   },
        //   entryPointAddress: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
        //   walletFactoryAddress: Factory.ETHERSPOT,
        // });

        const primeSdk = new PrimeSdk(mappedProvider, {
          chainId: 421614,
          
          bundlerProvider: new EtherspotBundler(
            421614,
            envVars.etherspotApiKey
          ),
        });

        console.log("address: ", primeSdk.state.wallet);
        const account = await primeSdk.getCounterFactualAddress();
        console.log({ account });

        setEtherspot(primeSdk);
      }
    };

    getEtherspot();
  }, [web3Auth?.provider, address]);

  return etherspot;
};

export default useEtherspot;
