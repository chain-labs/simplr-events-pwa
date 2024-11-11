"use client";

import React from "react";

import TicketMarketplace from "./TicketMarketplace";

const MarketplaceComponent = () => {
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
