import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

import useEventContract from "@/abi/Event";
import useMarketplaceContract from "@/abi/Marketplace";
import usePaymentTokenContract from "@/abi/PaymentToken";

import useListingTicket from "../../hooks/useListingTicket";

import { ProgressBarProps } from "./types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  incrementProgress,
  formData,
  ticketData,
}) => {
  const stages: string[] = [
    "Creating your Ticket Digital Twin",
    "Getting your Signature",
    "Listing your Ticket for Sale",
  ];

  const { handleMint, handleApprove, handleSignature, handleList } =
    useListingTicket({ formData, ticketData });

  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const PTContract = usePaymentTokenContract();

  useEffect(() => {
    const process = async () => {
      try {
        const tokenId = await handleMint(EventContract);
        incrementProgress(1);
        const signature = await handleSignature(
          tokenId,
          EventContract,
          MarketplaceContract,
          PTContract
        );
        incrementProgress(2);
        await handleList(
          signature,
          tokenId,
          EventContract,
          MarketplaceContract,
          PTContract
        );
        incrementProgress(3);
      } catch (err) {
        console.error("Error:", err);
      }
    };
    if (
      EventContract.address !== "0x" &&
      MarketplaceContract.address !== "0x" &&
      PTContract.address !== "0x"
    ) {
      process();
    }
  }, [EventContract, MarketplaceContract, PTContract]);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-50 rounded-md mb-4 bg-opacity-20 text-white">
        <h2>
          <strong>Listing ticket:</strong>
        </h2>
        <p>Seat: {formData.seat}</p>
        <h5>Price: ${formData.price}</h5>
      </div>
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center space-x-2 text-white">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              index < currentStage
                ? "bg-green-500"
                : index === currentStage
                ? "bg-yellow-500"
                : "bg-gray-300"
            }`}
          >
            {index < currentStage && (
              <CheckCircle2 className="w-4 h-4 text-white" />
            )}
          </div>
          <span>{stage}</span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
