"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEventContract from "@/abi/Event";
import { envVars } from "@/lib/envVars";

const getLatestTokenId = async (event: string) => {
  const query = `query MyQuery($id: String!) {
    event(id: $id) {
  tickets(orderBy: "id", orderDirection: "desc", limit: 1) {
    items {
      id
    }
  }
}
}`;
  const variables = { id: `event-${event}` };

  const response = await axios.post(envVars.subgraphUrl, { query, variables });
  console.log({ response });

  const tokenId =
    response.data.data.event?.tickets?.items?.[0]?.id.split("-")[2] ?? "0";
  return `${Number(tokenId) + 1}`;
};

export default function NFTMinter() {
  const [seat, setSeat] = useState("");
  const [ticketSerialNumberHash, setTicketSerialNumberHash] = useState("");
  //   const { address } = useAccount();
  const EventContract = useEventContract();

  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync: mintWrite } = useWriteContract();

  const METADATA_URI = "/api/metadata";

  const handleMint = async () => {
    setIsMinting(true);
    try {
      // upload metadata and get uri
      const tokenId = await getLatestTokenId(EventContract.address);
      const data = {
        tokenId,
        eventContract: EventContract.address,
        name: "Devcon 2024 Test",
        description: "NFT Ticket provided by Simplr Events for Devcon 2024",
        image:
          "https://ik.imagekit.io/chainlabs/Simplr_Events/devcon-banner_8zI7q3HB15.jpg?updatedAt=1731136738067",
        attributes: [
          {
            trait_type: "Seat Number",
            value: seat,
          },
          {
            trait_type: "Event Name",
            value: "Devcon 2024",
          },
          {
            trait_type: "Event Date",
            value: "12-11-2024",
          },
        ],
      };
      const uploadResponse = await axios.post(METADATA_URI, data);
      console.log({ uploadResponse });

      await mintWrite({
        address: EventContract?.address,
        abi: EventContract?.abi,
        functionName: "createTicket",
        args: [
          {
            ticketSerialNumberHash: BigInt(ticketSerialNumberHash),
            seat,
            verificationData: "", // bytes data
            ticketEncryptedDataUri: "", // lit protocol's encrypted data
            ticketMetadata: `https://simplrhq.com/api/metadata/${EventContract.address}/${tokenId}`, // public metadata
          },
        ] as const,
      });
      // Handle successful minting (e.g., show success message, update UI)
    } catch (error) {
      console.error("Minting failed:", error);
      // Handle error (e.g., show error message)
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="mt-4 border-2 border-dashed border-spacing-3 border-yellow-600 p-4 bg-yellow-100 w-1/4">
      <h1 className="text-center font-bold mb-2 text-xs">
        🚜🚧 Experimental 🚧🚜
      </h1>
      <h2 className="text-2xl font-bold mb-2">Mint Your Ticket NFT</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Seat</label>
        <Input
          type="text"
          value={seat}
          onChange={e => setSeat(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-yellow-50"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Ticket Serial Number Hash
        </label>
        <Input
          type="text"
          value={ticketSerialNumberHash}
          onChange={e => setTicketSerialNumberHash(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-yellow-50"
        />
      </div>
      <Button onClick={handleMint} disabled={isMinting}>
        {isMinting ? "Minting..." : "Mint NFT"}
      </Button>
    </div>
  );
}
