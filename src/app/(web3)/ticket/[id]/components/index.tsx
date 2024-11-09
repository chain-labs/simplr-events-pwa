"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { formatUnits } from "viem";
import axios from "axios";

import { envVars } from "@/lib/envVars";
import usePaymentTokenContract from "@/abi/PaymentToken";
import useEscrowContract from "@/abi/Escrow";

import { GetEscrowDetails, GetTicketDetailsQuery } from "../gql";

import TicketActions from "./TicketActions";

interface Props {
  ticketId: string;
}

export interface TicketMetadata {
  id: string; // already have
  seatNo: string; // subgraph
  serialNumber: string; // subgraph
  price: string; // subgraph
  deadline: string; // subgraph
  eventName: string; // subgraph
  eventDate: string; // subgraph
  eventImage: string; // subgraph or metadata
  isSold: boolean; // subgraph
  buyer: string; // subgraph
  seller: string; // subgraph
  isResolved: boolean;
  isDisputed: boolean;
}

export const getTicketDetails = async (ticketId: string) => {
  const ticketDetails = await axios.post(envVars.subgraphUrl, {
    query: GetTicketDetailsQuery,
    variables: {
      ticketId,
    },
  });

  const ticket = ticketDetails.data.data.ticket;
  const listingInfo = ticketDetails.data.data.listings?.items?.[0];
  const metadata: TicketMetadata = {
    id: ticketId,
    seatNo: ticket.seat,
    serialNumber: ticket.ticketSerialNumberHash,
    price: listingInfo ? listingInfo.price : "N/A",
    deadline: listingInfo ? listingInfo.deadline : "N/A",
    eventName: ticket.event.name,
    eventDate: ticket.event.eventDate,
    eventImage:
      ticket?.tokenMetadata?.image ?? "https://placehold.co/1920x1080", // Assuming placeholder as default
    isSold: listingInfo ? listingInfo.state === "PURCHASED" : false,
    buyer: listingInfo ? listingInfo.buyerId?.split?.("-")?.[1] : null,
    seller: listingInfo ? listingInfo.sellerId?.split("-")?.[1] : null,
    isDisputed: false,
    isResolved: false,
  };
  console.log({ metadata });
  return metadata;
};

export const checkEscrowStatus = async (
  ticketId: string,
  escrowContract: string
) => {
  const ticketIdSplit = ticketId.split("-");
  const eventContract = ticketIdSplit[1];
  const tokenId = ticketIdSplit[2];
  const escrowId = `escrow-${eventContract}-${tokenId}-${escrowContract}`;
  console.log({ escrowId });

  const escrowData = await axios.post(envVars.subgraphUrl, {
    query: GetEscrowDetails,
    variables: { id: escrowId },
  });

  console.log({ escrowData });

  const isDisputed = escrowData.data.data.escrow?.isDisputed;
  const isResolved = escrowData.data.data.escrow?.isResolved;

  return { isDisputed, isResolved };
};

export default function TicketComponent({ ticketId }: Props) {
  const [ticket, setTicket] = useState<TicketMetadata>();
  const PTContract = usePaymentTokenContract();
  const EscrowContract = useEscrowContract();

  const refreshTicket = useCallback(async () => {
    const status = await checkEscrowStatus(ticketId, EscrowContract.address);
    getTicketDetails(ticketId).then(metadata => {
      const response = { ...metadata, ...status };
      setTicket(response);
    });
  }, [ticketId, EscrowContract]);

  useEffect(() => {
    if (ticketId && EscrowContract.address !== "0x") {
      refreshTicket();
    }
  }, [ticketId, refreshTicket, EscrowContract]);

  if (!ticket) {
    return <div>Loading...</div>;
  }

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
              <p className="font-semibold">
                {formatUnits(BigInt(ticket.price), PTContract.decimals)} USDC
              </p>
            </div>
            <div>
              <p className="text-gray-600">Listing Deadline:</p>
              <p className="font-semibold">
                {new Date(Number(ticket.deadline) * 1000).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Event Date:</p>
              <p className="font-semibold">
                {new Date(Number(ticket.eventDate) * 1000).toLocaleString()}
              </p>
            </div>
          </div>
          <TicketActions ticket={ticket} refreshTicket={refreshTicket} />
        </div>
      </div>
    </div>
  );
}
