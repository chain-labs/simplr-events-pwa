"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useEventContract from "@/abi/Event";
import useMarketplaceContract from "@/abi/Marketplace";
import usePaymentTokenContract from "@/abi/PaymentToken";

import useListingTicket from "../hooks/useListingTicket";

// Types and Interfaces
export interface FormData {
  //   seat: string;
  serialNumber: string;
  price: string;
}

interface InitialFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onSubmit: () => void;
}

interface DisclaimerProps {
  formData: FormData;
  onConfirm: () => void;
  onGoBack: () => void;
}

interface ProgressBarProps {
  currentStage: number;
  incrementProgress: (stage: number) => void;
  formData: FormData;
}

interface SuccessUIProps {
  formData: FormData;
}

// Step 1: Initial Form
const InitialForm: React.FC<InitialFormProps> = ({
  formData,
  setFormData,
  onSubmit,
}) => {
  // Client-side only state for input handling
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = formData.serialNumber && formData.price;

  if (!isMounted) {
    return null; // Prevent flash of unhydrated content
  }

  return (
    <div className="space-y-4">
      {/* <Input
        name="seat"
        value={formData.seat}
        onChange={handleChange}
        placeholder="Seat"
      /> */}
      <Input
        name="serialNumber"
        value={formData.serialNumber}
        onChange={handleChange}
        placeholder="Devcon Order Number"
      />
      <Input
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price in USD"
        type="number"
      />
      <Button onClick={onSubmit} className="w-full" disabled={!isFormValid}>
        List Ticket
      </Button>
    </div>
  );
};

// Step 2: Disclaimer
const Disclaimer: React.FC<DisclaimerProps> = ({
  formData,
  onConfirm,
  onGoBack,
}) => (
  <div className="space-y-6">
    <h5 className="text-md font-normal">
      <span>
        Are you sure you want to list this ticket with the following details?
      </span>
    </h5>
    <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
      <h5>
        <strong>Devcon Order Number:</strong> {formData.serialNumber}
      </h5>
      <h5>
        <strong>Price:</strong> ${formData.price}
      </h5>
    </div>
    <div className="mt-6 p-4 bg-blue-50 rounded-md shadow-md">
      <ul className="list-disc pl-5 text-blue-700">
        <li>
          <span>
            An <strong>NFT</strong> will be minted for your ticket and listed on
            the marketplace.
          </span>
        </li>
        <li>
          <span>
            If the ticket is sold, both the <strong>NFT</strong> and the{" "}
            <strong>funds</strong> will be held in <strong>escrow</strong>.
          </span>
        </li>
        <li>
          <span>
            You must transfer the ticket to the buyer via <strong>email</strong>{" "}
            or by contacting our <strong>team</strong>.
          </span>
        </li>
        <li>
          <span>
            Once the buyer confirms the transfer, the <strong>funds</strong>{" "}
            will be released to your account.
          </span>
        </li>
        <li>
          <span>
            You are given the option to <strong>Dispute the sale</strong> if you
            feel the buyer is <strong>not confirming</strong> the transfer even
            though you completed the transfer. This would result in a conflict
            resolution process with both parties.
          </span>
        </li>
      </ul>
    </div>
    <div className="flex justify-end space-x-2">
      <Button variant="outline" onClick={onGoBack}>
        Go Back
      </Button>
      <Button onClick={onConfirm} className="bg-green-500 text-white">
        {`Yes, I'm sure`}
      </Button>
    </div>
  </div>
);

// Listing Functions

// Step 3: Progress Bar
const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  incrementProgress,
  formData,
}) => {
  const stages: string[] = [
    "Mint",
    "Approve Transfer",
    "Getting your Signature...",
    "List Ticket",
  ];

  const { handleMint, handleApprove, handleSignature, handleList } =
    useListingTicket({ formData });

  const EventContract = useEventContract();
  const MarketplaceContract = useMarketplaceContract();
  const PTContract = usePaymentTokenContract();

  useEffect(() => {
    const process = async () => {
      try {
        const tokenId = await handleMint(EventContract);
        incrementProgress(1);
        await handleApprove(EventContract, MarketplaceContract);
        incrementProgress(2);
        const signature = await handleSignature(
          tokenId,
          EventContract,
          MarketplaceContract,
          PTContract
        );
        incrementProgress(3);
        await handleList(
          signature,
          tokenId,
          EventContract,
          MarketplaceContract
        );
        incrementProgress(4);
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
      <div className="p-4 bg-gray-50 rounded-md mb-4">
        <h2>
          <strong>Listing ticket:</strong>
        </h2>
        {/* <p>Seat: {formData.seat}</p> */}
        <h5>Price: ${formData.price}</h5>
      </div>
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center space-x-2">
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

// Step 4: Success UI
const SuccessUI: React.FC<SuccessUIProps> = ({ formData }) => (
  <div className="text-center space-y-4">
    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
    <p>Your ticket has been successfully listed!</p>
    <div className="mt-4 p-4 bg-gray-50 rounded-md text-left">
      {/* <p>
          <strong>Seat:</strong> {formData.seat}
        </p> */}
      <h5>
        <strong>Devcon Order No.:</strong> {formData.serialNumber}
      </h5>
      <h5>
        <strong>Price:</strong> ${formData.price}
      </h5>
    </div>
  </div>
);

// Main Component
const TicketListingFlow: React.FC = () => {
  // Client-side only state initialization
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [currentStage, setCurrentStage] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // seat: "",
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
      //   seat: "",
      serialNumber: "",
      price: "",
    });
  };

  useEffect(() => {
    if (!isOpen) {
      closeModal();
    }
  }, [isOpen]);

  const handleSubmit = (): void => setStep(2);

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

  return (
    <div>
      <Button onClick={openModal}>List your Ticket Here</Button>
      {/* Only render Dialog when mounted to prevent hydration mismatch */}
      {mounted && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {step === 1 && "List Your Ticket"}
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
              />
            )}
            {step === 4 && <SuccessUI formData={formData} />}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TicketListingFlow;
