import React, { useState } from "react";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { formatUnits } from "viem";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import usePaymentTokenContract from "@/abi/PaymentToken";

import { ITicketListed } from "../types";
import axios from "axios";
import useEventContract from "@/abi/Event";
import useMarketplaceContract from "@/abi/Marketplace";
import Link from "next/link";

const ListedTicketCard = ({ ticket }: { ticket: ITicketListed }) => {
  const { writeContractAsync: buyTicket } = useWriteContract();
  const account = useAccount();
  const [showModal, setShowModal] = useState(false);

  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const PTContract = usePaymentTokenContract(); // Payment Token Contract

  const config = useConfig();

  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to buy this ticket?"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      const signatureResponse = await axios.get(
        `/api/listings?ticketId=ticket-${EventContract.address}-${ticket.tokenId}`
      );
      const signature = signatureResponse.data.signature;
      console.log({ signature });

      const tx = await buyTicket?.({
        address: MarketplaceContract.address,
        abi: MarketplaceContract.abi,
        functionName: "purchaseTicket",
        args: [
          {
            eventContract: EventContract.address,
            tokenId: BigInt(ticket.tokenId),
            price: BigInt(ticket.price),
            seller: ticket.owner,
            deadline: BigInt(ticket.deadline),
          },
          signature,
        ],
      });

      const reciept = await waitForTransactionReceipt(config, { hash: tx });
      console.log({ reciept });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelListing = () => {
    // Logic to handle listing cancellation
  };

  return (
    <Card key={ticket.tokenId.toString()}>
      {showModal ? (
        <React.Fragment>
          <CardHeader>
            <CardTitle>Confirm Cancellation?</CardTitle>
            <CardDescription>
              Are you sure you want to cancel this listing?
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex gap-4">
            <Button onClick={handleCancelListing}>Yes, Cancel</Button>
            <Button onClick={() => setShowModal(false)}>No, Go Back</Button>
          </CardFooter>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <CardHeader>
            <CardTitle>
              {ticket.event.name}{" "}
              <span className="text-lg font-normal text-gray-700">
                #{ticket.ticketSerialNumberHash}
              </span>
            </CardTitle>
            <CardDescription>Seat: {ticket.seat}</CardDescription>
            <CardDescription>
              Price: {formatUnits(BigInt(ticket.price), PTContract.decimals)}{" "}
              USD
            </CardDescription>
            <CardDescription>
              Listed Till:{" "}
              {new Date(Number(ticket.deadline) * 1000).toLocaleString()}
            </CardDescription>
            {ticket.owner.toLowerCase() === account.address?.toLowerCase() && (
              <CardDescription className="text-red-500">
                You own this ticket
              </CardDescription>
            )}
          </CardHeader>
          <CardFooter>
            <Link
              href={`/ticket/ticket-${EventContract.address}-${ticket.tokenId}`}
            >
              <Button>View Details</Button>
            </Link>
            {ticket.owner.toLowerCase() === account.address?.toLowerCase() && (
              <>
                <Button onClick={() => setShowModal(true)} className="ml-2">
                  Cancel Listing
                </Button>
              </>
            )}
          </CardFooter>
        </React.Fragment>
      )}
    </Card>
  );
};

export default ListedTicketCard;
