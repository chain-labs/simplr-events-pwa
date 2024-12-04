"use client";

// import {
//   Web3AuthInnerContext,
//   Web3AuthProvider,
// } from "@web3auth/modal-react-hooks";
// import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import React, { createContext, useContext, useEffect } from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { arbitrum, arbitrumSepolia, sepolia } from "viem/chains";

import { envVars } from "@/lib/envVars";
import useEtherspot from "@/services/hooks/useEtherspot";

// import web3AuthContextConfig from "../services/web3authContext";

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <Web3AuthProvider config={web3AuthContextConfig}>
//       <WalletServicesProvider context={Web3AuthInnerContext}>
//         {children}
//       </WalletServicesProvider>
//     </Web3AuthProvider>
//   );
// };

type EtherspotContextType = {
  etherspot: any; // Replace 'any' with proper Etherspot SDK type
  executeSponsoredTransaction: (
    contractAddress: string,
    abi: any,
    functionName: string,
    args: any[]
  ) => Promise<{
    success: boolean;
    receipt?: any;
  }>; // Replace 'any' with proper types
};

export const EtherspotContext = createContext<EtherspotContextType | undefined>(
  undefined
);

export const useEtherspotContext = () => {
  const context = useContext(EtherspotContext);
  if (!context) {
    throw new Error(
      "useEtherspotContext must be used within an EtherspotProvider"
    );
  }
  return context;
};

const EtherspotProvider = ({ children }: { children: React.ReactNode }) => {
  const { etherspot, executeSponsoredTransaction } = useEtherspot();

  return (
    <EtherspotContext.Provider
      value={{ etherspot, executeSponsoredTransaction }}
    >
      {children}
    </EtherspotContext.Provider>
  );
};

const PrivyAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { etherspot, executeSponsoredTransaction } = useEtherspot();

  useEffect(() => {
    console.log("Etherspot initialized:", {
      etherspot: !!etherspot,
      executeSponsoredTransaction: !!executeSponsoredTransaction,
    });
  }, [etherspot, executeSponsoredTransaction]);

  return (
    <PrivyProvider
      appId={envVars.privyAppId}
      config={{
        defaultChain: envVars.isTestNetwork ? arbitrumSepolia : arbitrum,
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#645DD7",
          logo: "https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/png/simplr-blue_JUkfb1Gl6z.png?updatedAt=1733051700747",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <EtherspotProvider>{children}</EtherspotProvider>
    </PrivyProvider>
  );
};

export default PrivyAuthProvider;
