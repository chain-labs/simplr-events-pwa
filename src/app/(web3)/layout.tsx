"use client";

import React, { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http, WagmiProvider } from "wagmi";
import { arbitrum, arbitrumSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import { envVars } from "@/lib/envVars";
import AuthProvider from "@/components/Auth";
import PrivyAuthProvider from "@/components/Auth";

const config = getDefaultConfig({
  appName: "Web3 Ticket Marketplace",
  projectId: "YOUR_PROJECT_ID",
  chains: envVars.isTestNetwork ? [arbitrumSepolia] : [arbitrum],
  transports: {
    [arbitrum.id]: http(
      "https://arb-mainnet.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa"
    ),
    [arbitrumSepolia.id]: http(
      "https://arb-sepolia.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa"
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

// const { connectors } = getDefaultWallets({
//   appName: "Web3 Ticket Marketplace",
//   projectId: "YOUR_PROJECT_ID",
//   chains,
// });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <body>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <PrivyAuthProvider>
              <Navbar />
              {children}
            </PrivyAuthProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </body>
  );
}
