"use client";

import React from "react";
import {
  Web3AuthInnerContext,
  Web3AuthProvider,
} from "@web3auth/modal-react-hooks";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";

import web3AuthContextConfig from "../services/web3authContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        {children}
      </WalletServicesProvider>
    </Web3AuthProvider>
  );
};

export default AuthProvider;
