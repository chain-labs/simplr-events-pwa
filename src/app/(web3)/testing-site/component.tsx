"use client";

import React, { use, useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
import {
  CHAIN_NAMESPACES,
  IProvider,
  IWeb3AuthCoreOptions,
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { Oval } from "react-loader-spinner";
import { LOGIN_PROVIDER } from "@toruslabs/base-controllers";
import {
  EtherspotBundler,
  Factory,
  PrimeSdk,
  SdkOptions,
  Web3WalletProvider,
} from "@etherspot/prime-sdk";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { EntryPoint__factory } from "@etherspot/prime-sdk/dist/sdk/contracts";

import { envVars } from "@/lib/envVars";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: `0x${(envVars.isTestNetwork
    ? arbitrumSepolia.id
    : arbitrum.id
  ).toString(16)}`,
  displayName: "Arbitrum",
  rpcTarget: `https://arb-${
    envVars.isTestNetwork ? "sepolia" : "mainnet"
  }.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa`,
  blockExplorer: envVars.isTestNetwork
    ? "https://sepolia.arbiscan.io"
    : "https://arbiscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: IWeb3AuthCoreOptions = {
  clientId: envVars.web3AuthClientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

console.log({ chainConfig });

const web3auth = new Web3AuthNoModal(web3AuthOptions);
const authAdapter = new AuthAdapter({
  adapterSettings: { uxMode: UX_MODE.POPUP },
});

const App = () => {
  const [isConnecting, setIsConnecting] = React.useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);
  const [provider, setProvider] = React.useState<IProvider | null>(null);
  const [web3AuthInitialized, setWeb3AuthInitialized] = React.useState<
    boolean | null
  >(null);
  const [primeSdk, setPrimeSdk] = useState<PrimeSdk | null>(null);

  // Initialize states after component mounts
  useEffect(() => {
    setIsConnecting(false);
    setErrorMessage("");
    setWalletAddress("");
    setWeb3AuthInitialized(false);

    const init = async () => {
      try {
        // Configure adapter before initialization
        web3auth.configureAdapter(authAdapter);
        await web3auth.init();
        setWeb3AuthInitialized(true);

        // If there's an existing connection, set up the provider
        if (web3auth.connected && web3auth.provider) {
          setWalletAddress();
          await setupProvider(web3auth.provider);
          const user = await web3auth.connected;
          const provider = await web3auth.provider;
          console.log({ user, provider });
        }
      } catch (e) {
        console.error("Initialization error:", e);
        setErrorMessage("Failed to initialize wallet");
      }
    };

    init();

    // Cleanup function
    return () => {
      web3auth.clearCache();
    };
  }, []);

  const setupProvider = async (web3authProvider: IProvider) => {
    if (!web3authProvider) return;

    setProvider(web3authProvider);
    const mappedProvider = new Web3WalletProvider(web3authProvider);
    await mappedProvider.refresh();

    const etherspotOptions: SdkOptions = {
      chainId: envVars.isTestNetwork ? arbitrumSepolia.id : arbitrum.id,
      rpcProviderUrl: envVars.isTestNetwork
        ? `https://testnet-rpc.etherspot.io/v1/421614`
        : `https://arbitrum-bundler.etherspot.io`,
      bundlerProvider: {
        url: envVars.isTestNetwork
          ? `https://testnet-rpc.etherspot.io/v1/421614?api-key=${envVars.etherspotApiKey}`
          : `https://arbitrum-bundler.etherspot.io?api-key=${envVars.etherspotApiKey}`,
      },
      entryPointAddress: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      walletFactoryAddress: Factory.SIMPLE_ACCOUNT,
    };

    console.log({ etherspotOptions });

    const etherspotPrimeSdk = new PrimeSdk(mappedProvider, etherspotOptions);
    setPrimeSdk(etherspotPrimeSdk);

    const state = etherspotPrimeSdk.supportedNetworks;
    console.log({ state });
    setIsConnecting(false);
  };

  // Logout function to clear web3auth cache
  const logout = async () => {
    setWalletAddress("");
    try {
      await web3auth.logout({ cleanup: true });
      web3auth.clearCache();
    } catch (e) {
      console.error(e);
    }
  };

  // Function to pass in specific platform to web3auth
  const loginWithProvider = async (loginProvider: string) => {
    if (isConnecting) return;
    setIsConnecting(true);
    setErrorMessage("");
    setWalletAddress("");

    try {
      const web3AuthProvider = await web3auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider,
      });
      if (web3AuthProvider) {
        await setupProvider(web3AuthProvider);
      } else {
        throw new Error("Failed to get provider");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error?.message || "Failed to login");
      setIsConnecting(false);
    }
  };

  // GUI
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-b from-purple-900 to-black rounded-lg shadow-xl">
      {web3auth.connected && (
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-white mb-4">
            Your address on Ethereum blockchain:
          </h3>
          <p className="text-gray-300 break-all mb-4">
            <strong>{walletAddress}</strong>
          </p>
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      )}
      {isConnecting && (
        <div className="flex justify-center">
          <Oval
            height={30}
            width={30}
            color="#fff"
            secondaryColor="#cc29ff"
            strokeWidth={6}
            strokeWidthSecondary={6}
          />
        </div>
      )}
      {!isConnecting && !walletAddress && !web3auth.connected && (
        <div className="w-full max-w-md space-y-4">
          <button
            onClick={() => loginWithProvider("google")}
            className="w-full py-3 px-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            Login with Google
          </button>
          <button
            onClick={() => loginWithProvider(LOGIN_PROVIDER.LINKEDIN)}
            className="w-full py-3 px-4 bg-[#0077b5] hover:bg-[#006399] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            Login with LinkedIn
          </button>
          <button
            onClick={() => loginWithProvider(LOGIN_PROVIDER.GITHUB)}
            className="w-full py-3 px-4 bg-[#24292e] hover:bg-[#1b1f23] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            Login with GitHub
          </button>
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-100">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default App;
