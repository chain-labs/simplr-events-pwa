"use client";

import React, { useState, useEffect, useCallback } from "react";
import { concat, encodeAbiParameters, keccak256 } from "viem";
import { useAccount, useConfig } from "wagmi";
import Confetti from "react-confetti";
import { signMessage } from "@wagmi/core";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EVENTS } from "@/content";

import { FormData } from "./types";
import InitialForm from "./InitialForm";
import Disclaimer from "./Disclaimer";
import ProgressBar from "./ProgressBar";
import SuccessUI from "./SuccessUI";

const TicketListingFlow: React.FC = () => {
  // Client-side only state initialization
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [currentStage, setCurrentStage] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    seat: "",
    serialNumber: "",
    price: "",
  });

  const [ticketData, setTicketData] = useState<`0x${string}` | null>(null);

  const config = useConfig();
  const account = useAccount();

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (): void => {
    setIsOpen(true);
    setStep(1);
  };

  const closeModal = (): void => {
    setStep(1);
    setCurrentStage(0);
    setFormData({
      seat: "",
      serialNumber: "",
      price: "",
    });
  };

  useEffect(() => {
    if (!isOpen) {
      closeModal();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const mainContract = EVENTS.tbw.mainContract;
    const messageHash = keccak256(
      concat([
        mainContract as `0x${string}`,
        Number(formData.serialNumber).toString(16) as `0x${string}`,
      ])
    );

    const signature = await signMessage(config, {
      account: account.address,
      message: messageHash,
    });

    const ticketData = encodeAbiParameters(
      [{ type: "address" }, { type: "uint256" }, { type: "bytes" }],
      [account.address ?? "0x", BigInt(formData.serialNumber), signature]
    );

    setStep(2);
    setTicketData(ticketData);
  };

  const handleConfirm = (): void => {
    setStep(3);
  };

  const handleGoBack = (): void => setStep(1);

  const incrementProgress = (stage: number): void => {
    if (stage < 3) {
      setCurrentStage(stage);
      stage++;
    } else {
      setStep(4);
    }
  };

  // Prevent hydration issues by not rendering until client-side
  if (!mounted) {
    return null;
  }

  return (
    <div>
      <p onClick={openModal} className="cursor-pointer">
        sell your ticket
      </p>
      {mounted && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-black bg-opacity-10 backdrop-blur-lg border border-gray-600">
            <DialogHeader>
              <DialogTitle className="text-2xl text-white">
                {step === 1 && "Enter your Ticket Details"}
                {step === 2 && "Confirm Listing"}
                {step === 3 && "Listing in Progress"}
                {step === 4 && "Listing Complete"}
              </DialogTitle>
            </DialogHeader>
            {step === 1 && (
              <InitialForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                // buttonClassName="bg-blue-500 text-white"
              />
            )}
            {step === 2 && (
              <Disclaimer
                formData={formData}
                onConfirm={handleConfirm}
                onGoBack={handleGoBack}
              />
            )}
            {step === 3 && (
              <ProgressBar
                currentStage={currentStage}
                formData={formData}
                incrementProgress={incrementProgress}
                ticketData={ticketData}
              />
            )}
            {step === 4 && <SuccessUI formData={formData} />}
          </DialogContent>
        </Dialog>
      )}
      <Confetti run={step === 4} className="z-[1000]" />
    </div>
  );
};

export default TicketListingFlow;
