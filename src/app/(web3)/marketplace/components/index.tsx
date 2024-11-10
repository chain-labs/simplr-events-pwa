"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

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
        } catch (e) {
          console.log({ error: e });
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
    <div className="bg-gray-100">
      <div className="min-h-screen max-w-[1200px] mx-auto  p-4">
        <div className="mt-4">
          <TicketMarketplace />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceComponent;
