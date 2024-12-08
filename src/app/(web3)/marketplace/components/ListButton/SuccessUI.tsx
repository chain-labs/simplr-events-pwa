import React, { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { SuccessUIProps } from "./types";

const SuccessUI: React.FC<SuccessUIProps> = ({ formData }) => {
  const { width, height } = useWindowSize();
  return (
    <div className="text-center space-y-6 p-6 shadow-lg rounded-lg">
      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
      <p className="text-lg font-semibold text-gray-100">
        Your ticket has been successfully listed!
      </p>
      <div className="mt-4 p-4 bg-gray-100 rounded-md text-left space-y-2 bg-opacity-20">
        <p className="text-gray-200">
          <strong>Seat:</strong> {formData.seat}
        </p>
        <h5 className="text-gray-200">
          <strong>TBW Moongate Token ID:</strong> {formData.serialNumber}
        </h5>
        <h5 className="text-gray-200">
          <strong>Price:</strong> ${formData.price}
        </h5>
      </div>
    </div>
  );
};

export default SuccessUI;
