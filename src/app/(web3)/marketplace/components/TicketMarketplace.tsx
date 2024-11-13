"use client";

import React from "react";

import useMarketplaceData from "../hooks/useMarketplaceData";

import { TicketCard, TicketsSkeleton } from "./TicketCard";

export default function TicketMarketplace() {
  const { marketTickets, soldTickets, isLoading } = useMarketplaceData();

  return (
    <div className="mt-8">
      <h2 className="text-6xl font-bold mt-8 mb-4">Marketplace</h2>
      {isLoading ? (
        <TicketsSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketTickets.map(ticket => (
              <TicketCard
                key={`${ticket.tokenId}-${ticket.deadline}`}
                ticket={ticket}
              />
            ))}
          </div>
          <h2 className="text-4xl font-bold mt-8 mb-4">Sold Tickets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {soldTickets.map(ticket => (
              <TicketCard
                sold
                key={`${ticket.tokenId}-${ticket.deadline}`}
                ticket={ticket}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
