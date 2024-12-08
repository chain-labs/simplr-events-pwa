import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { InitialFormProps, SEAT_OPTIONS } from "./types";

const InitialForm: React.FC<InitialFormProps> = ({
  formData,
  setFormData,
  onSubmit,
}) => {
  // Client-side only state for input handling
  const [isMounted, setIsMounted] = useState(false);
  const [verifying, setVerifying] = useState(false);

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

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      seat: value,
    });
  };

  const isFormValid = formData.seat && formData.serialNumber && formData.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    await onSubmit();
    setVerifying(false);
  };

  if (!isMounted) {
    return null; // Prevent flash of unhydrated content
  }

  return (
    <div className="space-y-4 text-white">
      <div className="space-y-2 ">
        <label htmlFor="seat" className="text-sm font-medium">
          Seat Type
        </label>
        <Select
          name="seat"
          value={formData.seat}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger
            id="seat"
            className="w-[180px] bg-opacity-15 border border-gray-700"
          >
            <SelectValue placeholder="Select a seat" onChange={handleChange} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {SEAT_OPTIONS.map(seat => (
                <SelectItem key={seat} value={seat}>
                  {seat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="serialNumber" className="text-sm font-medium">
          TBW Moongate Token ID
        </label>
        <Input
          id="serialNumber"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          placeholder="Enter TBW Moongate Token ID"
          className="bg-opacity-15 border border-gray-700"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="price" className="text-sm font-medium">
          Price
        </label>
        <Input
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price in USD"
          type="number"
          className="bg-opacity-15 border border-gray-700"
        />
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full bg-brandBlue hover:bg-opacity-80"
        disabled={!isFormValid || verifying}
      >
        {verifying ? "Verifying..." : "List Ticket"}
      </Button>
    </div>
  );
};

export default InitialForm;
