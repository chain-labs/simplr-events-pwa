import React, { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { EVENTS } from "@/content";

import { DisclaimerProps } from "./types";

const Disclaimer: React.FC<DisclaimerProps> = ({
  formData,
  onConfirm,
  onGoBack,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="space-y-6 max-h-[98vh] overflow-auto">
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
          <div className="flex flex-col gap-y-2">
            {[
              { label: "Seat", value: formData.seat },
              { label: "TBW Moongate Token ID", value: formData.serialNumber },
              { label: "Price", value: `${formData.price} USD` },
            ].map(({ label, value }) => (
              <div key={label}>
                <h5 className="text-slate-400/80 md:text-sm text-xs">
                  {label}
                </h5>
                <p className="font-bold md:text-xl text-white text-sm">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-200 rounded-md shadow-md bg-opacity-40 text-white border border-yellow-100 max-h-[250px] overflow-auto">
        <h5 className="text-lg underline mb-4 text-red-200 font-bold font-switzer">
          Please read the instructions below before you proceed:
        </h5>
        <ul className="list-disc pl-5 text-white font-switzer">
          <li>
            <span>
              You list the ticket for sale today. You{" "}
              <strong>cannot change</strong> the price of the ticket once it’s
              set.
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
              You must transfer the ticket to the buyer via{" "}
              <strong>email</strong> or by contacting our <strong>team</strong>.
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
              You are given the option to <strong>dispute the sale</strong> if
              you feel the buyer is <strong>not confirming</strong> the transfer
              even though you completed the transfer. This would result in a
              conflict resolution process with both parties.
            </span>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="readInstructions"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor="readInstructions"
          className="text-md text-white font-bold"
        >
          I have read and understood the instructions
        </label>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onGoBack}
          className="text-brandBlack"
        >
          Go Back
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-brandBlue text-white"
          disabled={!isChecked}
        >
          {`Verify Ownership & Proceed`}
        </Button>
      </div>
    </div>
  );
};

export default Disclaimer;
