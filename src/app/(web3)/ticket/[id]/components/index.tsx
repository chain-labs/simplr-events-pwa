"use client";

import { notFound } from "next/navigation";
import Image from "next/image";

import TicketActions from "./TicketActions";

// Simulated function to fetch ticket data
// async function getTicket(id: string) {
//   // In a real application, you would fetch this data from your API or database
//   const ticket = {
//     id,
//     seatNo: "A1",
//     serialNumber: "T12345",
//     price: 100,
//     deadline: new Date("2023-12-31").toISOString(),
//     eventName: "Summer Concert 2023",
//     eventDate: new Date("2023-07-15").toISOString(),
//     eventImage: "/placeholder.svg",
//     isSold: false,
//     buyer: null,
//     seller: "0x1234...5678",
//   };
//   return ticket;
// }

interface Props {
  ticketId: string;
}

export default function TicketComponent({ ticketId }: Props) {
  //   const ticket = await getTicket(params.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={ticket.eventImage}
          alt={ticket.eventName}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{ticket.eventName}</h1>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Seat No:</p>
              <p className="font-semibold">{ticket.seatNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Serial Number:</p>
              <p className="font-semibold">{ticket.serialNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Price:</p>
              <p className="font-semibold">${ticket.price}</p>
            </div>
            <div>
              <p className="text-gray-600">Listing Deadline:</p>
              <p className="font-semibold">
                {new Date(ticket.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Event Date:</p>
              <p className="font-semibold">
                {new Date(ticket.eventDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <TicketActions ticket={ticket} />
        </div>
      </div>
    </div>
  );
}
