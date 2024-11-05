"use client";

import React, { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";
// import { publicProvider } from "wagmi/providers/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Web3 Ticket Marketplace",
  projectId: "YOUR_PROJECT_ID",
  chains: [arbitrumSepolia],
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
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </body>
  );
}
