"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { formatUnits } from "viem";
import axios from "axios";

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

  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const userConfirmed = window.confirm(
      "Are you sure you want to buy this ticket?"
    );
    if (!userConfirmed) {
      return;
    }
    try {
      if (allowance < BigInt(ticket.price)) {
        const requiredFundsToAllow = BigInt(ticket.price) - allowance;
        const allowanceTx = await setAllowance({
          address: PTContract.address,
          abi: PTContract.abi,
          functionName: "approve",
          args: [MarketplaceContract.address, requiredFundsToAllow],
        });
        await waitForTransactionReceipt(config, { hash: allowanceTx });
      }
      const tokenId = ticket.id.split("-")[2];
      const signatureResponse = await axios.get(
        `/api/listings?ticketId=ticket-${EventContract.address}-${tokenId}`
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
            tokenId: BigInt(tokenId),
            price: BigInt(ticket.price),
            seller: ticket.seller,
            deadline: BigInt(ticket.deadline),
          },
          signature,
        ],
      });

      const reciept = await waitForTransactionReceipt(config, { hash: tx });
      console.log({ reciept });

      setIsSold(true);
    } catch (err) {
      console.error(err);
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
    const tx = await releaseFunds({
      address: EscrowContract.address,
      abi: EscrowContract.abi,
      functionName: "releaseFunds",
      args: [BigInt(ticket.id.split("-")[2]), EventContract.address],
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
              Confirm that you have recieved the ticket from the seller by
              clicking on the button below ⬇️
            </li>
          </ol>
          {ticket.isDisputed ? (
            <Button className="w-full">Purchase Disputed by Seller</Button>
          ) : ticket.isResolved ? (
            <Button className="w-full bg-green-900">
              Purchase Confirmed by Buyer!
            </Button>
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
              recieve your payment
            </li>
            <li>
              Click on the dispute button below ⬇️ if you have any issues with
              the buyer
            </li>
          </ol>
          {ticket.isDisputed ? (
            <Button disabled className="w-full bg-red-950">
              Purchase Disputed
            </Button>
          ) : ticket.isResolved ? (
            <Button disabled className="w-full bg-green-900">
              Purchase Confirmed!
            </Button>
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
        <p>This ticket is no longer available for purchase.</p>
      )}
    </div>
  );
}
