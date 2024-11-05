"use client";

import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import NFTMinter from "./NFTMinter";
import TicketMarketplace from "./TicketMarketplace";

const MarketplaceComponent = () => {
  const account = useAccount();
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Web3 Ticket Marketplace</h1>
      <ConnectButton />
      {account.isConnected ? (
        <>
          <NFTMinter />
          <TicketMarketplace />
        </>
      ) : (
        <p className="mt-4">
          Please connect your wallet to use the application.
        </p>
      )}
    </div>
  );
};

export default MarketplaceComponent;
