"use client";

import React from "react";

import useMarketplaceData from "../hooks/useMarketplaceData";

import ListedTicketCard from "./ListedTicketCard";

export default function TicketMarketplace() {
  const { marketTickets } = useMarketplaceData();

  return (
    <div className="mt-8">
      <h2 className="text-6xl font-bold mt-8 mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketTickets.map(ticket => (
          <ListedTicketCard
            key={`${ticket.tokenId}-${ticket.deadline}`}
            ticket={ticket}
          />
        ))}
      </div>
    </div>
  );
}
