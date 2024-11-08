"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import NFTMinter from "./NFTMinter";
import TicketMarketplace from "./TicketMarketplace";

const MarketplaceComponent = () => {
  const account = useAccount();

  useEffect(() => {
    if (account.address) {
      const checkAndPostUser = async () => {
        try {
          const response = await axios.get(
            `/api/users?address=${account.address}`
          );
          console.log({ response: response.data });
        } catch (err) {
          const email = prompt("Please enter your email address:");
          if (email) {
            try {
              const postResponse = await axios.post("/api/users", {
                email,
                address: account.address,
              });
              console.log({ postResponse: postResponse.data });
            } catch (postError) {
              console.error("Failed to create user:", postError);
            }
          } else {
            console.error("Email address is required.");
          }
        }
      };
      checkAndPostUser();
    }
  }, [account.address]);
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
