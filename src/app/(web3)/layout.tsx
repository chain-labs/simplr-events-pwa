"use client";

import React, { ReactNode } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { http, WagmiProvider } from "wagmi";
import { arbitrum, arbitrumSepolia, base } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../globals.css";

import Navbar from "@/components/Navbar";
import { envVars } from "@/lib/envVars";

const config = getDefaultConfig({
  appName: "Web3 Ticket Marketplace",
  projectId: "YOUR_PROJECT_ID",
  chains: envVars.isTestNetwork ? [arbitrumSepolia] : [base],
  transports: {
    [arbitrum.id]: http(
      "https://arb-mainnet.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa"
    ),
    [arbitrumSepolia.id]: http(
      "https://arb-sepolia.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa"
    ),
    [base.id]: http(
      "https://base-mainnet.g.alchemy.com/v2/fo0cVbAEYC20ap46_EbcyMoBPIrTGAHa"
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
    <html lang="en" className="bg-brandBlue">
      <head>
        <title>Simplr Events - Buy Tickets</title>
        <meta
          name="description"
          content="Simplr Events - Buy Tickets for Web3 Events"
        ></meta>
        <link
          rel="icon"
          href="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo/png/logo-blue_7EPveToVaC.png?updatedAt=1733433419212"
          type="image/x-icon"
        ></link>
        <link
          href="https://api.fontshare.com/v2/css?f[]=gambarino@400&f[]=switzer@100,101,200,201,300,301,400,401,500,501,600,601,700,701,800,801,900,901&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Navbar />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
