import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthOptions } from "@web3auth/modal";
import { AuthAdapter, MFA_LEVELS, UX_MODE } from "@web3auth/auth-adapter";
import {
  BUTTON_POSITION,
  CONFIRMATION_STRATEGY,
  WalletServicesPlugin,
} from "@web3auth/wallet-services-plugin";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import plugin from "tailwindcss";

import { envVars } from "@/lib/envVars";

import { chain } from "../config/chainConfig";

const { isTestNetwork, web3AuthClientId, googleVerifier, googleClientId } =
  envVars;

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: {
    chainConfig: isTestNetwork ? chain.arbitrumSepolia : chain.arbitrum,
  },
});

const web3AuthOptions: Web3AuthOptions = {
  chainConfig: isTestNetwork ? chain.arbitrumSepolia : chain.arbitrum,
  clientId: web3AuthClientId,
  web3AuthNetwork: isTestNetwork ? "sapphire_devnet" : "sapphire_mainnet",
  privateKeyProvider,
};

const authAdapter = new AuthAdapter({
  loginSettings: {
    mfaLevel: MFA_LEVELS.OPTIONAL,
  },
  adapterSettings: {
    loginConfig: {
      google: {
        typeOfLogin: "google",
        clientId: googleClientId,
        verifier: googleVerifier,
      },
    },
    uxMode: UX_MODE.REDIRECT,
  },
});

const walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: {
    whiteLabel: {
      showWidgetButton: true,
      buttonPosition: BUTTON_POSITION.BOTTOM_RIGHT,
    },
    confirmationStrategy: CONFIRMATION_STRATEGY.MODAL,
  },
});

const adapters = await getDefaultExternalAdapters({ options: web3AuthOptions });

const web3AuthContextConfig = {
  web3AuthOptions,
  adapters: [authAdapter],
  plugins: [walletServicesPlugin],
};

export default web3AuthContextConfig;
