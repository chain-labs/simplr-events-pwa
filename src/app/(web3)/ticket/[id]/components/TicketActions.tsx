"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt, estimateGas } from "@wagmi/core";
import { formatUnits } from "viem";
import axios from "axios";
import { AlertCircle, CheckCircle, XCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import usePaymentTokenContract from "@/abi/PaymentToken";
import useMarketplaceContract from "@/abi/Marketplace";
import useEventContract from "@/abi/Event";
import useEscrowContract from "@/abi/Escrow";

import { TicketMetadata } from ".";

type UserRole = "buyer" | "seller" | "other";

export default function TicketActions({
  ticket,
  refreshTicket,
}: {
  ticket: TicketMetadata;
  refreshTicket: () => void;
}) {
  const [isSold, setIsSold] = useState(ticket.isSold);
  const [status, setStatus] = useState<"pending" | "disputed" | "resolved">(
    ticket.isDisputed ? "disputed" : ticket.isResolved ? "resolved" : "pending"
  );

  // Simulated function to get current user's wallet address
  const account = useAccount();
  const PTContract = usePaymentTokenContract();
  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const EscrowContract = useEscrowContract();
  const { writeContractAsync: buyTicket } = useWriteContract();
  const { writeContractAsync: setAllowance } = useWriteContract();
  const { writeContractAsync: releaseFunds } = useWriteContract();
  const { writeContractAsync: dispute } = useWriteContract();

  const config = useConfig();
  const userWallet = account.address;
  const client = usePublicClient();

  const userRole: UserRole = useMemo(() => {
    const role =
      userWallet === ticket.buyer
        ? "buyer"
        : userWallet === ticket.seller
        ? "seller"
        : "other";

    return role;
  }, [userWallet, ticket]);

  // Check user's allowance of paymentToken
  const { data: allowanceData, isFetched: allowanceFetched } = useReadContract({
    address: PTContract.address,
    abi: PTContract.abi,
    functionName: "allowance",
    args: [`${userWallet}`, MarketplaceContract.address],
  });

  const allowance = useMemo(() => {
    if (allowanceFetched) {
      console.log({ allowanceData });
      return allowanceData as bigint;
    }

    return BigInt(0);
  }, [allowanceData, allowanceFetched]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<"pending" | "success">(
    "pending"
  );

  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogState("pending");

    try {
      if (allowance < BigInt(ticket.price)) {
        const requiredFundsToAllow = BigInt(ticket.price) - allowance;
        const allowOptions = {
          address: PTContract.address,
          abi: PTContract.abi,
          functionName: "approve",
          args: [MarketplaceContract.address, requiredFundsToAllow],
        };

        const sim = await client?.estimateGas({
          ...allowOptions,
          account: account.address,
        });
        const allowanceTx = await setAllowance({ ...allowOptions, gas: sim });
        await waitForTransactionReceipt(config, { hash: allowanceTx });
      }
      const tokenId = ticket.id.split("-")[2];
      const signatureResponse = await axios.get(
        `/api/listings?ticketId=ticket-${EventContract.address}-${tokenId}`
      );
      const signature = signatureResponse.data.signature;
      const mintOptions = {
        address: MarketplaceContract.address,
        abi: MarketplaceContract.abi,
        functionName: "purchaseTicket",
        args: [
          {
            eventContract: EventContract.address,
            tokenId: BigInt(tokenId),
            price: BigInt(ticket.price),
            seller: ticket.seller,
            deadline: BigInt(ticket.deadline),
          },
          signature,
        ],
      };
      const sim = await client?.estimateGas({
        ...mintOptions,
        account: account.address,
      });
      console.log({ sim });
      const tx = await buyTicket({
        ...mintOptions,
        gas: BigInt(Math.max(Number(sim as bigint) + 200000, 2000000)),
      });

      await waitForTransactionReceipt(config, { hash: tx });

      setIsSold(true);
      setDialogState("success");

      await axios.post("/api/email", {
        tokenId: ticket.id.split("-")[2],
        seller: ticket.seller,
        buyer: userWallet,
        orderNumber: ticket.serialNumber,
      });
    } catch (err) {
      console.error(err);
      setIsDialogOpen(false);
    }
  };

  useEffect(() => {
    if (isSold) {
      refreshTicket();
    }
  }, [isSold, refreshTicket]);

  const handleConfirmBuy = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to confirm the ticket transfer?"
    );
    if (!userConfirmed) {
      return;
    }
    const releaseOptions = {
      address: EscrowContract.address,
      abi: EscrowContract.abi,
      functionName: "releaseFunds",
      args: [BigInt(ticket.id.split("-")[2]), EventContract.address],
    };

    const sim = await client?.estimateGas({
      ...releaseOptions,
      account: account.address,
    });
    const tx = await releaseFunds({
      ...releaseOptions,
      gas: BigInt(Math.max(Number(sim as bigint) + 200000, 1000000)),
    });

    const receipt = await waitForTransactionReceipt(config, { hash: tx });

    console.log({ receipt });
    refreshTicket();
  };

  const handleDispute = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to confirm the ticket transfer?"
    );
    if (!userConfirmed) {
      return;
    }
    const tx = await dispute({
      address: EscrowContract.address,
      abi: EscrowContract.abi,
      functionName: "dispute",
      args: [BigInt(ticket.id.split("-")[2]), EventContract.address],
    });

    const receipt = await waitForTransactionReceipt(config, { hash: tx });

    console.log({ receipt });
    refreshTicket();
  };

  if (!isSold) {
    return (
      <div>
        {userRole === "seller" && (
          <p className="text-red-500 mb-2 text-center">
            You cannot buy your own ticket.
          </p>
        )}
        <Button
          onClick={handleBuy}
          disabled={userRole === "seller"}
          className="w-full disabled:bg-slate-500"
        >
          Buy Ticket for{" "}
          {formatUnits(BigInt(ticket.price), PTContract.decimals)} USDC
        </Button>
        <PurchaseDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          state={dialogState}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold">This ticket has been sold.</p>
      {userRole === "buyer" && (
        <div>
          <p>Congratulations on your purchase! Please follow these steps:</p>
          <ol className="list-decimal list-inside mt-2 mb-4">
            <li>Keep your ticket information safe</li>
            <li>Arrive at the venue at least 30 minutes before the event</li>
            <li>Present this ticket at the entrance</li>
            <li>
              Confirm that you have received the ticket from the seller by
              clicking on the button below ⬇️
            </li>
          </ol>
          {status === "disputed" ? (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Purchase Disputed</AlertTitle>
              <AlertDescription>
                The seller has disputed this purchase.
              </AlertDescription>
            </Alert>
          ) : status === "resolved" ? (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Purchase Confirmed</AlertTitle>
              <AlertDescription>
                You have confirmed the purchase.
              </AlertDescription>
            </Alert>
          ) : (
            <Button onClick={handleConfirmBuy} className="w-full">
              Confirm Purchase
            </Button>
          )}
        </div>
      )}
      {userRole === "seller" && (
        <div>
          <p>Your ticket has been sold. Please follow these steps:</p>
          <ol className="list-decimal list-inside mt-2 mb-4">
            <li>Ensure the ticket information is up to date</li>
            <li>
              Transfer the ticket to the buyer and wait for them to confirm to
              receive your payment
            </li>
            <li>
              Click on the dispute button below ⬇️ if you have any issues with
              the buyer
            </li>
          </ol>
          {status === "disputed" ? (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Purchase Disputed</AlertTitle>
              <AlertDescription>You have disputed this sale.</AlertDescription>
            </Alert>
          ) : status === "resolved" ? (
            <Alert variant="default">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Purchase Confirmed</AlertTitle>
              <AlertDescription>
                The buyer has confirmed the purchase.
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={handleDispute}
              variant="destructive"
              className="w-full"
            >
              Dispute Sale
            </Button>
          )}
        </div>
      )}
      {userRole === "other" && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Ticket Unavailable</AlertTitle>
          <AlertDescription>
            This ticket is no longer available for purchase.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

function PurchaseDialog({
  isOpen,
  onClose,
  state,
}: {
  isOpen: boolean;
  onClose: () => void;
  state: "pending" | "success";
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {state === "pending" ? "Purchasing Ticket" : "Purchase Successful"}
          </DialogTitle>

          {state === "pending" ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Processing your purchase...</span>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p>Your ticket has been successfully purchased!</p>
              <Button onClick={onClose} className="mt-4">
                Close
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
