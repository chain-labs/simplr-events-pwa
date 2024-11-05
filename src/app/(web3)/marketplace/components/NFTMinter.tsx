"use client";

import React, { useState } from "react";
import { useWriteContract } from "wagmi";

import { Button } from "@/components/ui/button";
import useEventContract from "@/abi/Event";

export default function NFTMinter() {
  //   const { address } = useAccount();
  const EventContract = useEventContract();

  const [isMinting, setIsMinting] = useState(false);

  const { writeContractAsync: mintWrite } = useWriteContract();

  const handleMint = async () => {
    setIsMinting(true);
    try {
      await mintWrite({
        address: EventContract?.address,
        abi: EventContract?.abi,
        functionName: "createTicket",
        args: [
          {
            ticketSerialNumberHash: "0x001",
            seat: "C45",
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
    <div className="mt-4">
      <h2 className="text-2xl font-bold mb-2">Mint Your Ticket NFT</h2>
      <Button onClick={handleMint} disabled={isMinting}>
        {isMinting ? "Minting..." : "Mint NFT"}
      </Button>
    </div>
  );
}
