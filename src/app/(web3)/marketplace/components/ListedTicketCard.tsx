import React, { useState } from "react";
import { useAccount } from "wagmi";
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

const ListedTicketCard = ({ ticket }: { ticket: ITicketListed }) => {
  //   const { writeContractAsync: buyTicket } = useWriteContract();
  const account = useAccount();
  const [showModal, setShowModal] = useState(false);

  const PTContract = usePaymentTokenContract(); // Payment Token Contract

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // buyTicket?.({
    //   address: ,
    //   abi: CONTRACT_ABI,
    //   functionName: "buyTicket",
    //   args: [tokenId],
    //   value: price,
    // });
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
              ETH
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
            <Button
              onClick={handleBuy}
              disabled={
                ticket.owner.toLowerCase() === account.address?.toLowerCase()
              }
            >
              Buy Ticket
            </Button>
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
