import React from "react";
import { notFound } from "next/navigation";

import TicketComponent from "./components";

// Simulated function to fetch ticket data
// async function getTicket(id: string) {
//   // In a real application, you would fetch this data from your API or database
//   const ticket = {
//     id, // already have
//     seatNo: "A1", // subgraph
//     serialNumber: "T12345", // subgraph
//     price: 100, // subgraph
//     deadline: new Date("2023-12-31").toISOString(), // subgraph
//     eventName: "Summer Concert 2023", // subgraph
//     eventDate: new Date("2023-07-15").toISOString(), // subgraph
//     eventImage: "/placeholder.svg", // subgraph or metadata
//     isSold: false, // subgraph
//     buyer: null, // subgraph
//     seller: "0x1234...5678", // subgraph
//   };
//   return ticket;
// }

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
  console.log({ ticketId });
  const ticketListed = await checkTicket(ticketId);

  if (!ticketListed) {
    notFound();
  }

  return <TicketComponent ticketId={ticketId} />;
}
