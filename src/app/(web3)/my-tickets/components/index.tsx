"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, TicketIcon } from "lucide-react";

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
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const fetchTickets = async () => {
      setIsLoading(true);
      // In a real application, this would be an API call
      const response = await new Promise<Ticket[]>(resolve => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              eventName: "Concert A",
              eventDate: "2023-12-15",
              seat: "A1",
              orderNumber: "ORD001",
              price: 50,
              status: "pending",
              image: "/placeholder.svg?height=100&width=200",
              role: "buyer",
            },
            {
              id: "2",
              eventName: "Festival B",
              eventDate: "2023-12-20",
              seat: "B2",
              orderNumber: "ORD002",
              price: 75,
              status: "confirmed",
              image: "/placeholder.svg?height=100&width=200",
              role: "buyer",
            },
            {
              id: "3",
              eventName: "Theater Show C",
              eventDate: "2023-12-25",
              seat: "C3",
              orderNumber: "ORD003",
              price: 100,
              status: "transferred",
              image: "/placeholder.svg?height=100&width=200",
              role: "seller",
            },
            {
              id: "4",
              eventName: "Sports Event D",
              eventDate: "2023-12-30",
              seat: "D4",
              orderNumber: "ORD004",
              price: 120,
              status: "completed",
              image: "/placeholder.svg?height=100&width=200",
              role: "seller",
            },
            {
              id: "5",
              eventName: "Concert E",
              eventDate: "2024-01-05",
              seat: "E5",
              orderNumber: "ORD005",
              price: 60,
              status: "pending",
              image: "/placeholder.svg?height=100&width=200",
              role: "buyer",
            },
            {
              id: "6",
              eventName: "Festival F",
              eventDate: "2024-01-10",
              seat: "F6",
              orderNumber: "ORD006",
              price: 80,
              status: "transferred",
              image: "/placeholder.svg?height=100&width=200",
              role: "seller",
            },
          ]);
        }, 1000);
      });
      setTickets(response);
      setIsLoading(false);
    };

    fetchTickets();
  }, []);

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      {isLoading ? (
        <TicketsSkeleton />
      ) : (
        ticketCategories.map(category => {
          const categoryTickets = tickets.filter(
            ticket => ticket.status === category.status
          );
          if (categoryTickets.length === 0) {
            return null;
          }
          return (
            <div key={category.status} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category.title}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryTickets.map(ticket => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  return (
    <Card>
      <CardHeader>
        <Image
          src={ticket.image}
          alt={ticket.eventName}
          width={200}
          height={100}
          className="w-full object-cover rounded-t-lg"
        />
        <CardTitle>{ticket.eventName}</CardTitle>
        <CardDescription>Order #{ticket.orderNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>{ticket.eventDate}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="mr-2 h-4 w-4" />
            <span>Seat: {ticket.seat}</span>
          </div>
          <div className="flex items-center">
            <TicketIcon className="mr-2 h-4 w-4" />
            <span>Price: ${ticket.price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge
          variant={ticket.status === "completed" ? "default" : "secondary"}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </Badge>
        <Link href={`/my-tickets/${ticket.id}`} passHref>
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
