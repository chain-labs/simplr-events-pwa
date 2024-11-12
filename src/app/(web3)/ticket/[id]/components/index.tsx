"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { formatUnits } from "viem";
import axios from "axios";
import { Calendar, MapPin, QrCode, Tag, Timer } from "lucide-react";
import { useAccount } from "wagmi";

import { Card, CardContent } from "@/components/ui/card";
import { envVars } from "@/lib/envVars";
import usePaymentTokenContract from "@/abi/PaymentToken";
import useEscrowContract from "@/abi/Escrow";
import { Badge } from "@/components/ui/badge";

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

  const account = useAccount();

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
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl">
          <div className="relative h-64 sm:h-80">
            <Image
              src={ticket.eventImage}
              alt={ticket.eventName}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end">
              <div className="p-6 w-full">
                <Badge className="mb-2" variant="secondary">
                  {new Date(
                    Number(ticket.eventDate) * 1000
                  ).toLocaleDateString()}
                </Badge>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {ticket.eventName}
                </h1>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <InfoItem icon={MapPin} label="Seat No" value={ticket.seatNo} />
              {account.address === ticket.seller ||
              account.address === ticket.buyer ? (
                <InfoItem
                  icon={QrCode}
                  label="Order Number"
                  value={ticket?.serialNumber ?? "-"}
                />
              ) : null}
              <InfoItem
                icon={Tag}
                label="Price"
                value={`${formatUnits(
                  BigInt(ticket.price),
                  PTContract.decimals
                )} USDC`}
              />
              <InfoItem
                icon={Timer}
                label="Listing Deadline"
                value={new Date(
                  Number(ticket.deadline) * 1000
                ).toLocaleString()}
              />
              <InfoItem
                icon={Calendar}
                label="Event Date"
                value={new Date(
                  Number(ticket.eventDate) * 1000
                ).toLocaleString()}
              />
            </div>
            <TicketActions ticket={ticket} refreshTicket={refreshTicket} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5 text-indigo-500" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
