import React, { useCallback, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

import useEventContract from "@/abi/Event";
import useMarketplaceContract from "@/abi/Marketplace";
import usePaymentTokenContract from "@/abi/PaymentToken";
import { EVENTS } from "@/content";

import useListingTicket from "../../hooks/useListingTicket";

import { ProgressBarProps } from "./types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  incrementProgress,
  formData,
  ticketData,
  resetProgress,
}) => {
  const stages: string[] = [
    "Creating your Ticket Digital Twin",
    "Getting your Signature",
    "Listing your Ticket for Sale",
  ];
  const [error, setError] = React.useState(false);

  const { handleMint, handleApprove, handleSignature, handleList } =
    useListingTicket({ formData, ticketData });

  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const PTContract = usePaymentTokenContract();

  const process = useCallback(async () => {
    resetProgress();
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
      setError(true);
    }
  }, [EventContract, MarketplaceContract, PTContract]);

  useEffect(() => {
    if (
      EventContract.address !== "0x" &&
      MarketplaceContract.address !== "0x" &&
      PTContract.address !== "0x"
    ) {
      process();
    }
  }, [EventContract, MarketplaceContract, PTContract]);

  return (
    <div className="space-y-6 p-4">
      {/* Ticket Preview Card */}
      <div className="bg-[#1a1a1a] px-8 py-6 overflow-hidden border border-white/10 rounded-xl shadow-lg transition-all duration-300 hover:border-white/20">
        <div
          className="flex px-6 py-4 items-center -rotate-12 scale-110 hover:-rotate-3 transition-transform duration-300 bg-brandBlue/40 backdrop-blur-sm rounded-lg shadow-xl text-white font-switzer gap-x-6 relative
        before:content-[''] before:absolute before:left-0 before:w-4 before:h-8 before:bg-[#1a1a1a] before:rounded-r-full before:top-1/2 before:-translate-y-1/2
        after:content-[''] after:absolute after:w-4 after:h-8 after:bg-[#1a1a1a] after:rounded-l-full after:right-0 after:top-1/2 after:-translate-y-1/2"
        >
          <div className="relative w-[150px] h-[150px] rounded-lg overflow-hidden">
            <Image
              src={EVENTS.tbw.image}
              alt="event-image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            {[
              { label: "Seat", value: formData.seat },
              { label: "TBW Moongate Token ID", value: formData.serialNumber },
              { label: "Price", value: `${formData.price} USD` },
            ].map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <h5 className="text-slate-400/80 text-sm">{label}</h5>
                <p className="font-bold text-xl text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
              index <= currentStage ? "bg-white/5" : "opacity-50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                error && index <= currentStage
                  ? "bg-red-500 shadow-lg shadow-red-500/30"
                  : index < currentStage
                  ? "bg-green-500 shadow-lg shadow-green-500/30"
                  : index === currentStage
                  ? "bg-yellow-500 shadow-lg shadow-yellow-500/30 animate-pulse"
                  : "bg-gray-600"
              }`}
            >
              {index < currentStage && !error && (
                <CheckCircle2 className="w-5 h-5 text-white" />
              )}
            </div>
            <span
              className={`font-medium ${
                error && index <= currentStage ? "text-red-500" : "text-white"
              }`}
            >
              {stage}
            </span>
          </div>
        ))}
      </div>
      {error && (
        <button
          onClick={() => {
            setError(false);
            process();
          }}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ProgressBar;
