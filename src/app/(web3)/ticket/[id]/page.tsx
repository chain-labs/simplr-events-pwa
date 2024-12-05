import React from "react";
import { notFound } from "next/navigation";

import TicketComponent from "./components";

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const checkTicket = async (ticketId: string) => {
    try {
      const baseUrl = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000";
      const response = await fetch(
        `${baseUrl}/api/listings?ticketId=${ticketId}`,
        {
          cache: "no-store",
        }
      );
      const data = await response.json();
      if (data) {
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };
  const ticketId = (await params).id;
  const ticketListed = await checkTicket(ticketId);

  if (!ticketListed) {
    notFound();
  }

  return <TicketComponent ticketId={ticketId} />;
}
