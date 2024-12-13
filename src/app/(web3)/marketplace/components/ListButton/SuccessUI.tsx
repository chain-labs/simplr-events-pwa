import React from "react";
import { ArrowUpRightIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { SuccessUIProps } from "./types";

const SuccessUI: React.FC<SuccessUIProps> = ({ formData }) => {
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

      <p className="text-lg font-semibold text-yellow-300">
        Please keep an eye on your email inbox to get notified when your ticket
        is sold. You can also check the status of your ticket in{" "}
        <Link href="/my-tickets" target="_blank">
          <span className="inline-flex hover:underline cursor-pointer text-white">
            My Tickets
            <ArrowUpRightIcon />
          </span>
        </Link>
      </p>
    </div>
  );
};

export default SuccessUI;
