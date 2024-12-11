import useMarketplaceContract from "@/abi/Marketplace";
import usePaymentTokenContract from "@/abi/PaymentToken";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { waitForTransactionReceipt } from "@wagmi/core";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from "wagmi";

import useEventContract from "@/abi/Event";
import useEscrowContract from "@/abi/Escrow";

import { TicketMetadata } from "../components";
import { formatUnits } from "viem";

type UserRole = "buyer" | "seller" | "other";

const useTicketActions = (
  ticket: TicketMetadata,
  refreshTicket: () => void,
  purchaseTrigger: (arg0: boolean) => void
) => {
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
  const [dialogState, setDialogState] = useState<1 | 2 | 3>(3);

  const handleBuy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDialogOpen(true);
    setDialogState(1);

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
        const allowanceTx = await setAllowance({ ...allowOptions });
        await waitForTransactionReceipt(config, { hash: allowanceTx });
      }
      setDialogState(2);
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

      // setIsSold(true);
      purchaseTrigger(true);
      setDialogState(3);

      setTimeout(() => {
        purchaseTrigger(false);
      }, 5000);

      await axios.post("/api/email", {
        tokenId: ticket.id.split("-")[2],
        seller: ticket.seller,
        buyer: userWallet,
        orderNumber: ticket.serialNumber,
      });
      console.log("Email sent");
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

  const ticketPrice = useMemo(() => {
    if (ticket?.price) {
      return `${
        formatUnits(BigInt(ticket.price), PTContract.decimals) ?? "0"
      } USDC`;
    }
    return "Loading...";
  }, [ticket.price, PTContract]);

  return {
    handleBuy,
    handleConfirmBuy,
    handleDispute,
    userRole,
    ticketPrice,
    isSold,
    setIsSold,
    isDialogOpen,
    dialogState,
    setIsDialogOpen,
  };
};

export default useTicketActions;
