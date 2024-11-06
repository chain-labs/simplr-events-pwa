import React, { useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseUnits } from "viem";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useMarketplaceContract from "@/abi/Marketplace";
import useEventContract from "@/abi/Event";

import { ITicket } from "../types"; // You'll need to move the type to a separate file

type OwnedTicketCardProps = {
  ticket: ITicket;
};

export function OwnedTicketCard({ ticket }: OwnedTicketCardProps) {
  const [listingPrice, setListingPrice] = useState("");
  const [deadline, setDeadline] = useState<number | null>(null);
  const account = useAccount();
  const { writeContractAsync: listTicket } = useWriteContract();
  const MarketplaceContract = useMarketplaceContract();
  const EventContract = useEventContract();

  const handleList = () => {
    // listing logic here using the local state
    listTicket?.({
      address: MarketplaceContract.address,
      abi: MarketplaceContract.abi,
      functionName: "listTicket",
      args: [
        {
          eventContract: EventContract.address,
          tokenId: ticket.tokenId,
          price: parseUnits(listingPrice, 18),
          seller: account.address as `0x${string}`,
          deadline: BigInt(deadline ?? 0),
        },
      ],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {ticket.event.name}{" "}
          <span className="text-lg font-normal text-gray-700">
            #{ticket.ticketSerialNumberHash}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <CardDescription>Seat: {ticket.seat}</CardDescription>
            <label htmlFor="listingPrice">Listing Price (USD)</label>
            <Input
              id="listingPrice"
              type="number"
              placeholder="Listing Price (USD)"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="listingDeadline">Listing Deadline</label>
            <Input
              id="listingDeadline"
              type="datetime-local"
              placeholder="Listing Deadline"
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                const timestamp = Math.floor(selectedDate.getTime() / 1000);
                setDeadline(timestamp);
              }}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleList} disabled={ticket.listed}>
          {ticket.listed ? "Listed" : "List Ticket"}
        </Button>
      </CardFooter>
    </Card>
  );
}
