"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { formatUnits } from "viem";
import { twMerge } from "tailwind-merge";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useEventContract from "@/abi/Event";
import usePaymentTokenContract from "@/abi/PaymentToken";

import { ITicketListed } from "../../marketplace/types";
import useMyTicketsData from "../hooks/useMyTicketsData";

type Ticket = {
  id: string;
  eventName: string;
  eventDate: string;
  seat: string;
  orderNumber: string;
  price: number;
  status: "pending" | "confirmed" | "transferred" | "completed" | "disputed";
  image: string;
  role: "buyer" | "seller";
};

const ticketCategories = [
  { title: "Pending Confirmation", status: "pending" },
  { title: "Confirmed", status: "confirmed" },
  { title: "Pending Transfer", status: "transferred" },
  { title: "Completed", status: "completed" },
  { title: "Disputed", status: "disputed" },
];

export default function MyTicketsPage() {
  const { userListings, userSold, userBought, isLoading } = useMyTicketsData();
  const account = useAccount();

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      {isLoading ? (
        <TicketsSkeleton />
      ) : account.address ? (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 md:mb-8">
            Listed for Sale
          </h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {userListings.length > 0 ? (
              userListings.map(ticket => (
                <TicketCard
                  ticket={ticket}
                  key={`${ticket.ticketSerialNumberHash}`}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">
                No tickets listed for sale.
              </p>
            )}
          </div>
          <h2 className="text-2xl font-semibold mt-10 mb-6 md:mt-12 md:mb-8">
            Bought Tickets
          </h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {userBought.length > 0 ? (
              userBought.map(ticket => (
                <TicketCard
                  type="BOUGHT"
                  ticket={ticket}
                  key={`${ticket.ticketSerialNumberHash}`}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No tickets bought.</p>
            )}
          </div>
          <h2 className="text-2xl font-semibold mt-10 mb-6 md:mt-12 md:mb-8">
            Sold Tickets
          </h2>
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {userSold.length > 0 ? (
              userSold.map(ticket => (
                <TicketCard
                  ticket={ticket}
                  type="SOLD"
                  key={`${ticket.ticketSerialNumberHash}`}
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No tickets sold.</p>
            )}
          </div>
        </div>
      ) : (
        <ConnectButton label="sign in" />
      )}
    </div>
  );
}

function TicketCard({
  ticket,
  type,
}: {
  ticket: ITicketListed;
  type?: "SOLD" | "BOUGHT";
}) {
  const EventContract = useEventContract();
  const PTContract = usePaymentTokenContract();

  const status = useMemo(() => {
    let text = "Checking...";
    if (ticket && type) {
      const isResolved = ticket.isResolved;
      const isDisputed = ticket.isDisputed;

      if (type === "SOLD") {
        if (isResolved) {
          text = "Complete";
        } else if (isDisputed) {
          text = "Disputed";
        } else text = "Pending";
      } else {
        if (isResolved) {
          text = "Complete";
        } else if (isDisputed) {
          text = "Disputed";
        } else text = "Action Required";
      }
    }
    return text;
  }, [ticket, type]);

  return (
    <Card>
      <CardHeader>
        <Image
          src={ticket?.event?.image ?? "https://placehold.co/600x400"}
          alt={"devcon image"}
          width={200}
          height={100}
          className="w-full object-cover rounded-t-lg"
        />
        <CardTitle>{ticket?.event?.name}</CardTitle>
        <CardDescription>#{ticket?.tokenId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {ticket?.event?.date
                ? new Date(Number(ticket.event.date) * 1000).toLocaleString()
                : "-"}
            </span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>Seat: {ticket.seat}</span>
          </div>
          <div className="flex items-center">
            <TicketIcon className="mr-2 h-4 w-4" />
            <span>
              Price: ${formatUnits(BigInt(ticket.price), PTContract.decimals)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter
        className={twMerge(
          "flex items-center",
          type ? "justify-between" : "justify-end"
        )}
      >
        {type && (
          <Badge variant={status === "Complete" ? "default" : "secondary"}>
            {status}
          </Badge>
        )}
        <Link
          href={`/ticket/ticket-${EventContract.address}-${ticket.tokenId}`}
          passHref
        >
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

function TicketsSkeleton() {
  return (
    <div className="space-y-8">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, j) => (
              <Card key={j}>
                <CardHeader>
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-10 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
