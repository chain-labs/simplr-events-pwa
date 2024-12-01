import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import { Button } from "@/components/ui/button";
import TicketListingFlow from "@/app/(web3)/marketplace/components/ListButton";
import useEtherspot from "@/services/hooks/useEtherspot";
import useAccount from "@/services/hooks/useAccount";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { connect } = useWeb3Auth();
  const { address, name, email, handleLogout } = useAccount();

  useEffect(() => {
    if (address) {
      const checkAndPostUser = async () => {
        try {
          const response = await axios.get(`/api/users?address=${address}`);
          console.log({ response: response.data });
          setModal(false);
        } catch (e) {
          console.log({ error: e });
          setModal(true);
        }
      };
      checkAndPostUser();
    }
  }, [address]);

  const etherspot = useEtherspot();

  return (
    <nav className="bg-slate-700 border-b py-2 md:px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-x-6">
            <Link
              href="/marketplace"
              className="flex-shrink-0 flex items-center"
            >
              <div>
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  className="w-16 sm:w-24"
                  width={100}
                  height={100}
                />
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-x-4">
              {address && (
                <Link href={"/my-tickets"}>
                  <p className="font-normal text-white cursor-pointer">
                    My Tickets
                  </p>
                </Link>
              )}
              <Link href={"/marketplace"}>
                <p className="font-normal text-white cursor-pointer">
                  Marketplace
                </p>
              </Link>
            </div>
          </div>
          <button
            className="sm:hidden text-white"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            Menu
          </button>
          <div className="hidden sm:flex items-center gap-x-4">
            <a
              href={"https://t.me/+oXNaYmx7iwY3NjU1"}
              target="_blank"
              rel="noreferrer"
            >
              <p className="font-normal text-white cursor-pointer">Telegram</p>
            </a>
            {address && <TicketListingFlow />}
            {!address ? (
              <div
                className="flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer"
                style={{ backgroundColor: "#0364ff" }}
                onClick={connect}
              >
                Login
              </div>
            ) : (
              <div>
                <p className="font-normal text-white cursor-pointer">
                  Hello <span className="font-bold">{name}</span>
                </p>
                <div
                  onClick={handleLogout}
                  className="cursor-pointer border border-white bg-blue-800 rounded-full px-2 text-white text-sm py-2 text-center"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {drawerOpen && (
        <div className="sm:hidden bg-slate-800 p-4 flex flex-col gap-y-2 absolute top-20 left-0 w-full z-10">
          <ConnectButton />
          {address && <TicketListingFlow />}
          {address && (
            <Link href={"/my-tickets"}>
              <p className="font-normal text-white cursor-pointer">
                My Tickets
              </p>
            </Link>
          )}
          <Link href={"/marketplace"}>
            <p className="font-normal text-white cursor-pointer">Marketplace</p>
          </Link>
        </div>
      )}
      <UserForm isOpen={modal} setIsOpen={setModal} address={address} />
    </nav>
  );
}

const UserForm = ({
  isOpen,
  setIsOpen,
  address,
}: {
  isOpen: boolean;
  address: string | null;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { userInfo } = useWeb3Auth();

  useEffect(() => {
    if (userInfo?.email) {
      setEmail(userInfo.email);
    }
    if (userInfo?.name) {
      setName(userInfo.name);
    }
  }, [userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      // Here you would typically send the data to your server
      try {
        const postResponse = await axios.post("/api/users", {
          email,
          address: address,
          name,
        });
        setIsOpen(false);
        console.log("Form submitted:", { name, email });
      } catch (postError) {
        console.error("Failed to create user:", postError);
      }
      setEmail("");
      setName("");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setIsOpen(true);
    }
    // Prevent closing by clicking outside
    // The modal can only be closed by successful form submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Register to Simplr Events!</DialogTitle>
          <DialogDescription>
            {
              "Please provide your name and email address. We'll share necessary details on this email."
            }
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Get Started</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
