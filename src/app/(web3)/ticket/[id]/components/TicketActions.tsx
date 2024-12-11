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
import Confetti from "react-confetti";
import useTicketActions from "../hooks/useTicketActions";

export default function TicketActions({
  ticket,
  refreshTicket,
}: {
  ticket: TicketMetadata;
  refreshTicket: () => void;
  purchaseTrigger: (arg0: boolean) => void;
}) {
  const {
    isSold,
    userRole,
    ticketPrice,
    handleBuy,
    handleConfirmBuy,
    handleDispute,
    isDialogOpen,
    dialogState,
    setIsDialogOpen,
  } = useTicketActions(ticket, refreshTicket);

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
          Buy Ticket for {ticketPrice}
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
  state: 1 | 2 | 3;
}) {
  const stages: string[] = ["Approving Payment", "Completing Purchase"];
  // const currentStage = state === "pending" ? 0 : 2;

  const handleOpenChange = (open: boolean) => {
    if (state === 3) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-black bg-opacity-10 backdrop-blur-lg border border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-2xl text-white">
            {state !== 3 ? "Purchasing Ticket" : "Purchase Successful"}
          </DialogTitle>
        </DialogHeader>
        {state !== 3 ? (
          <div className="space-y-6 p-4">
            <div className="space-y-3">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    index + 1 < state ? "bg-white/5" : "opacity-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      index + 1 < state
                        ? "bg-green-500 shadow-lg shadow-green-500/30"
                        : index + 1 === state
                        ? "bg-yellow-500 shadow-lg shadow-yellow-500/30 animate-pulse"
                        : "bg-gray-600"
                    }`}
                  >
                    {index + 1 < state && (
                      <CheckCircle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-white">{stage}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 p-4 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <p className="text-white">
              Your ticket has been successfully purchased!
            </p>
            <Button
              onClick={onClose}
              className="w-full bg-brandWhite hover:bg-brandBlack text-brandBlack hover:text-brandWhite font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
