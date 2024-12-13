"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useConfig } from "wagmi";
import Confetti from "react-confetti";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  }, [isOpen, step]);

  const handleSubmit = async () => {
    setStep(2);
  };

  const handleConfirm = (): void => {
    setStep(3);
  };

  const handleGoBack = (): void => setStep(1);

  const incrementProgress = (stage: number): void => {
    if (stage < 4) {
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

  const handleOpenChange = (open: boolean, override?: boolean): void => {
    if (override) {
      setIsOpen(open);
      return;
    }
    if (!open && step === 3) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <p onClick={openModal} className="cursor-pointer font-bold">
        sell your ticket
      </p>
      {mounted && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent className="bg-black bg-opacity-10 text-white backdrop-blur-lg border border-gray-600">
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
                resetProgress={() => setCurrentStage(0)}
                closeModal={() => handleOpenChange(false, true)}
              />
            )}
            {step === 4 && <SuccessUI formData={formData} />}
          </DialogContent>
        </Dialog>
      )}
      {step === 4 && <Confetti run={step === 4} className="z-[1000]" />}
    </div>
  );
};

export default TicketListingFlow;
