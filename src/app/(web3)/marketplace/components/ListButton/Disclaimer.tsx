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
    <div className="space-y-6">
      <h5 className="text-md font-normal text-brandWhite">
        <span>
          Are you sure you want to list this ticket with the following details?
        </span>
      </h5>
      <div className="bg-brandBlack px-8 py-6 mt-4 overflow-hidden border border-white border-opacity-15 rounded-[8px]">
        <div className="flex p-6 text-sm items-center -rotate-12 scale-110 bg-brandBlue rounded-md shadow-md bg-opacity-50 text-white font-switzer gap-x-4 relative before:content-[''] before:absolute before:left-0 before:w-4 before:h-8 before:bg-black before:rounded-r-full before:top-1/2 before:-translate-y-1/2 after:content-[''] after:absolute after:w-4 after:h-8 after:bg-black after:rounded-l-full after:right-0 after:top-1/2 after:-translate-y-1/2">
          <div>
            <Image
              src={EVENTS.tbw.image}
              alt="event-image"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col gap-y-2 ">
            <h5 className="text-slate-400 text-opacity-80">
              Seat
              <br />
              <p className="font-bold text-xl text-white">{formData.seat}</p>
            </h5>
            <h5 className="text-slate-400 text-opacity-80">
              TBW Moongate Token ID
              <br />
              <p className="font-bold text-xl text-white">
                {formData.serialNumber}
              </p>
            </h5>
            <h5 className="text-slate-400 text-opacity-80">
              Price
              <br />
              <p className="font-bold text-xl text-white">
                {formData.price} USD
              </p>
            </h5>
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-200 rounded-md shadow-md bg-opacity-40 text-white border border-yellow-100">
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
        <Button variant="outline" onClick={onGoBack}>
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
