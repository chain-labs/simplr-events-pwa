import React, { useState } from "react";

import { Button } from "@/components/ui/button";

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
      <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md bg-opacity-20 text-white">
        <h5>
          <strong>TBW Moongate Token ID:</strong> {formData.serialNumber}
        </h5>
        <h5>
          <strong>Price:</strong> ${formData.price}
        </h5>
      </div>
      <div className="mt-6 p-4 bg-yellow-200 rounded-md shadow-md bg-opacity-40 text-white border border-yellow-100">
        <h5 className="text-lg underline mb-4 text-red-200 font-bold">
          Please read the instructions below before you proceed:
        </h5>
        <ul className="list-disc pl-5 text-white">
          <li>
            <span>
              An <strong>NFT</strong> will be minted for your ticket and listed
              on the marketplace.
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
        <label htmlFor="readInstructions" className="text-sm text-white">
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
