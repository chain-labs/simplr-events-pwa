import React, { useState } from "react";
import { useAccount, useConfig, useWriteContract } from "wagmi";
import { arbitrumSepolia } from "viem/chains";
import { parseUnits } from "viem";
import axios from "axios";
import { getWalletClient, waitForTransactionReceipt } from "@wagmi/core";

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
import usePaymentTokenContract from "@/abi/PaymentToken";
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
  const { writeContractAsync: approveTransfer } = useWriteContract();
  const MarketplaceContract = useMarketplaceContract();
  const EventContract = useEventContract();
  const PTContract = usePaymentTokenContract();

  const config = useConfig();

  const handleList = async () => {
    if (listingPrice && deadline) {
      try {
        // Approvalhere
        const approveTx = await approveTransfer({
          address: EventContract.address,
          abi: EventContract.abi,
          functionName: "setApprovalForAll",
          args: [MarketplaceContract.address, true],
        });

        const receipt = await waitForTransactionReceipt(config, {
          hash: approveTx,
        });

        console.log("Approval receipt:", receipt);

        // Signature here
        const client = await getWalletClient(config);

        const domain = {
          // sampled from Marketplace.sol:~line 60
          name: "SimplrMarketplace",
          version: "1.0.0",
          chainId: arbitrumSepolia.id,
          verifyingContract: MarketplaceContract.address,
        } as const;

        const types = {
          // sampled from Marketplace.sol:~line 16 :-
          //    Listing(address eventContract,uint256 tokenId,uint256 price,address seller,uint256 deadline)
          Listing: [
            { name: "eventContract", type: "address" },
            { name: "tokenId", type: "uint256" },
            { name: "price", type: "uint256" },
            { name: "seller", type: "address" },
            { name: "deadline", type: "uint256" },
          ],
        } as const;

        const signature = await client?.signTypedData({
          account: account.address ?? "0x",
          domain,
          types,
          primaryType: "Listing",
          message: {
            eventContract: EventContract.address,
            tokenId: BigInt(ticket.tokenId),
            price: parseUnits(listingPrice, PTContract.decimals),
            seller: account.address ?? "0x",
            deadline: BigInt(deadline ?? 0),
          },
        });

        // transaction here
        const tx = await listTicket?.({
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

        const transactionReceipt = await waitForTransactionReceipt(config, {
          hash: tx,
        });
        if (transactionReceipt) {
          const response = await axios.post("/api/listings", {
            sellerAddress: account.address,
            ticketId: `ticket-${EventContract.address}-${ticket.tokenId}`,
            signature,
          });
          console.log({ response });
        }
      } catch (err) {
        console.error(err);
      }
    }
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
              onChange={e => setListingPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="listingDeadline">Listing Deadline</label>
            <Input
              id="listingDeadline"
              type="datetime-local"
              placeholder="Listing Deadline"
              onChange={e => {
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

//0x68d441c34fe910e52ef8b7d03f7fb0ad17cefca4bc0b2476…120fa0b968228d8f0a34c7788501d29731a41f92ac792e11b
