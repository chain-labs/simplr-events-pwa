"use client";

import React from "react";

import useMarketplaceData from "../hooks/useMarketplaceData";

import { OwnedTicketCard } from "./OwnedTicketCard";
import ListedTicketCard from "./ListedTicketCard";

export default function TicketMarketplace() {
  const { marketTickets, userTickets } = useMarketplaceData();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(userTickets ?? []).map((ticket) => (
          <OwnedTicketCard key={ticket.tokenId.toString()} ticket={ticket} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marketTickets.map((ticket) => (
          <ListedTicketCard key={ticket.tokenId} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
