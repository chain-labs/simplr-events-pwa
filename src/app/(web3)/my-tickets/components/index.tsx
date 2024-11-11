"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";
import { formatUnits } from "viem";

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
  const { userListings, isLoading } = useMyTicketsData();

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      {isLoading ? (
        <TicketsSkeleton />
      ) : (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Listed for Sale</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userListings.map(ticket => (
              <TicketCard
                ticket={ticket}
                key={`${ticket.ticketSerialNumberHash}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TicketCard({ ticket }: { ticket: ITicketListed }) {
  const EventContract = useEventContract();
  const PTContract = usePaymentTokenContract();
  return (
    <Card>
      <CardHeader>
        <Image
          src={ticket.event.image}
          alt={ticket.event.name}
          width={200}
          height={100}
          className="w-full object-cover rounded-t-lg"
        />
        <CardTitle>{ticket.event.name}</CardTitle>
        <CardDescription>#{ticket.tokenId}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>
              {new Date(Number(ticket.event.date) * 1000).toLocaleString()}
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
      <CardFooter className="flex justify-between items-center">
        {/* <Badge
          variant={ticket.status === "completed" ? "default" : "secondary"}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </Badge> */}
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
