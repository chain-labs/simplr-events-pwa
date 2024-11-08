"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useEventContract from "@/abi/Event";

export default function NFTMinter() {
  const [seat, setSeat] = useState("");
  const [ticketSerialNumberHash, setTicketSerialNumberHash] = useState("");
  //   const { address } = useAccount();
  const EventContract = useEventContract();

  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync: mintWrite } = useWriteContract();

  const handleMint = async () => {
    setIsMinting(true);
    try {
      // upload metadata and get uri
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
            ticketMetadata: "", // public metadata
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
          onChange={(e) => setSeat(e.target.value)}
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
          onChange={(e) => setTicketSerialNumberHash(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm bg-yellow-50"
        />
      </div>
      <Button onClick={handleMint} disabled={isMinting}>
        {isMinting ? "Minting..." : "Mint NFT"}
      </Button>
    </div>
  );
}
