'use client';

import { CHAINS } from '@/src/utils/chains';
import { ENVS } from '@/src/utils/envVars';
import {
  CHAIN_NAMESPACES,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from '@web3auth/base';
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider';
import React, { useEffect } from 'react';

import { AuthAdapter } from '@web3auth/auth-adapter';
import { Web3AuthProvider } from '@web3auth/no-modal-react-hooks';
import { Web3Auth, Web3AuthOptions } from '@web3auth/modal';
import SEO from '@/src/utils/seo';

import { createContext } from 'react';

// Create a context for the login function
export const LoginContext = createContext<Web3Auth | null>(null);

const clientId = ENVS.WEB3_AUTH_CLIENT_ID;
// IMP END - Dashboard Registration

// IMP START - Chain Config
const chainConfig = ENVS.TEST_NETWORK ? CHAINS.testnet : CHAINS.mainnet;
// IMP END - Chain Config

// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    appName: SEO.title,
    appUrl: SEO.appURL,
    logoLight:
      'https://ik.imagekit.io/chainlabs/Simplr_Events/logo_UG6O5HwMY.png?updatedAt=1730223198015',
    logoDark:
      'https://ik.imagekit.io/chainlabs/Simplr_Events/logo_UG6O5HwMY.png?updatedAt=1730223198015',
    defaultLanguage: 'en',
    mode: 'dark',
    useLogoLoader: true,
  },
};

const web3auth = new Web3Auth(web3AuthOptions);

const authAdapter = new AuthAdapter({
  clientId,
  chainConfig,
  adapterSettings: {
    loginConfig: {
      google: {
        verifier: ENVS.GOOGLE_VERIFIER,
        typeOfLogin: 'google',
        clientId: ENVS.GOOGLE_CLIENT_ID,
      },
    },
  },
});

// IMP END - SDK Initialization

interface Props {
  children: React.ReactNode;
}

const Web3AuthHookProvider = ({ children }: Props) => {
  const [initialized, setInitialized] = React.useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        // IMP START - SDK Initialization
        await web3auth.initModal({
          hideWalletDiscovery: false,
          modalConfig: {
            [WALLET_ADAPTERS.AUTH]: {
              label: 'auth',
              loginMethods: {
                google: {
                  name: 'Google Login',
                  logoDark:
                    'https://ik.imagekit.io/chainlabs/Simplr_Events/logo_UG6O5HwMY.png?updatedAt=1730223198015',
                },
                facebook: {
                  // This will hide the Facebook option from the Web3Auth modal.
                  name: 'facebook login',
                  showOnModal: false,
                },
                reddit: {
                  // This will hide the Reddit option from the Web3Auth modal.
                  name: 'reddit login',
                  showOnModal: false,
                },
                twitter: {
                  // This will hide the Twitter option from the Web3Auth modal.
                  name: 'twitter login',
                  showOnModal: false,
                },
                discord: {
                  // This will hide the Discord option from the Web3Auth modal.
                  name: 'discord login',
                  showOnModal: false,
                },
                twitch: {
                  // This will hide the Twitch option from the Web3Auth modal.
                  name: 'twitch login',
                  showOnModal: false,
                },
                apple: {
                  // This will hide the Apple option from the Web3Auth modal.
                  name: 'apple login',
                  showOnModal: false,
                },
                github: {
                  // This will hide the GitHub option from the Web3Auth modal.
                  name: 'github login',
                  showOnModal: false,
                },
                line: {
                  // This will hide the Line option from the Web3Auth modal.
                  name: 'line login',
                  showOnModal: false,
                },
                kakao: {
                  // This will hide the Kakao option from the Web3Auth modal.
                  name: 'kakao login',
                  showOnModal: false,
                },
                wechat: {
                  // This will hide the WeChat option from the Web3Auth modal.
                  name: 'wechat login',
                  showOnModal: false,
                },
                linkedin: {
                  // This will hide the LinkedIn option from the Web3Auth modal.
                  name: 'linkedin login',
                  showOnModal: false,
                },
                farcaster: {
                  // This will hide the Farcaster option from the Web3Auth modal.
                  name: 'farcaster login',
                  showOnModal: false,
                },
                weibo: {
                  // This will hide the Weibo option from the Web3Auth modal.
                  name: 'weibo login',
                  showOnModal: false,
                },
              },
              // setting it to false will hide all social login methods from modal.
              showOnModal: true,
            },
          },
        });
        web3auth.configureAdapter(authAdapter);
        console.log('inited');
        // IMP END - SDK Initialization
      } catch (error) {
        console.log(error);
      }
    };

    try {
      init().then(() => {
        console.log('initialized');
        setInitialized(true);
      });
    } catch (err) {
      console.log({ err });
    }
  }, []);
  // if (!initialized) {
  //   return (
  //     <Web3AuthProvider config={{ web3AuthOptions, adapters: [], plugins: [] }}>
  //       <LoginContext.Provider value={web3auth}>
  //         mamamia
  //         {children}
  //       </LoginContext.Provider>
  //     </Web3AuthProvider>
  //   );
  // }
  return (
    <Web3AuthProvider
      config={{
        web3AuthOptions,
        adapters: initialized ? [authAdapter] : [],
        plugins: [],
      }}
    >
      <LoginContext.Provider value={web3auth}>{children}</LoginContext.Provider>
    </Web3AuthProvider>
  );
};

export default Web3AuthHookProvider;
