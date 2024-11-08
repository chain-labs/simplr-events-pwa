"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Ticket = {
  id: string;
  isSold: boolean;
  buyer: string | null;
  seller: string;
  price: number;
};

type UserRole = "buyer" | "seller" | "other";

export default function TicketActions({ ticket }: { ticket: Ticket }) {
  const [isSold, setIsSold] = useState(ticket.isSold);

  // Simulated function to get current user's wallet address
  const getCurrentUserWallet = () => "0x9876...5432";

  const userWallet = getCurrentUserWallet();
  const userRole: UserRole =
    userWallet === ticket.buyer
      ? "buyer"
      : userWallet === ticket.seller
      ? "seller"
      : "other";

  const handleBuy = async () => {
    // Simulated buy functionality
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSold(true);
    alert("Ticket purchased successfully!");
  };

  const handleConfirmBuy = () => {
    alert("Purchase confirmed!");
  };

  const handleDispute = () => {
    alert("Dispute initiated!");
  };

  if (!isSold) {
    return (
      <Button onClick={handleBuy} className="w-full">
        Buy Ticket for ${ticket.price}
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">This ticket has been sold.</p>
      {userRole === "buyer" && (
        <div>
          <p>Congratulations on your purchase! Please follow these steps:</p>
          <ol className="list-decimal list-inside mt-2 mb-4">
            <li>Keep your ticket information safe</li>
            <li>Arrive at the venue at least 30 minutes before the event</li>
            <li>Present this ticket at the entrance</li>
          </ol>
          <Button onClick={handleConfirmBuy} className="w-full">
            Confirm Purchase
          </Button>
        </div>
      )}
      {userRole === "seller" && (
        <div>
          <p>Your ticket has been sold. Please follow these steps:</p>
          <ol className="list-decimal list-inside mt-2 mb-4">
            <li>Ensure the ticket information is up to date</li>
            <li>Be ready to transfer the ticket to the buyer</li>
            <li>Contact support if you have any issues</li>
          </ol>
          <Button
            onClick={handleDispute}
            variant="destructive"
            className="w-full"
          >
            Dispute Sale
          </Button>
        </div>
      )}
      {userRole === "other" && (
        <p>This ticket is no longer available for purchase.</p>
      )}
    </div>
  );
}
