import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import TicketListingFlow from "@/app/(web3)/marketplace/components/ListButton";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

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
  const account = useAccount();
  const [modal, setModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (account.address) {
      const checkAndPostUser = async () => {
        try {
          const response = await axios.get(
            `/api/users?address=${account.address}`
          );
          console.log({ response: response.data });
          setModal(false);
        } catch (e) {
          console.log({ error: e });
          setModal(true);
        }
      };
      checkAndPostUser();
    }
  }, [account.address]);

  return (
    <header className="flex justify-between items-center font-switzer font-bold tracking-[0.02em] max-w-[1280px] mx-auto md:px-8 py-4 px-2">
      <div>
        <Image
          src="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/svg/simplr-yellow_ClyqBegTE.svg?updatedAt=1733051453777"
          alt="Simplr Events Logo"
          width={100}
          height={50}
        />
      </div>
      <nav className="hidden md:flex items-center gap-[10px] text-brandWhite">
        {/* <p>link your ticket</p> */}
        <Link href="/marketplace" className="px-[16px] py-[8px]">
          buy
        </Link>
        {account.address && <TicketListingFlow />}
        {account.address && (
          <Link href="/my-tickets" className="px-[16px] py-[8px]">
            my tickets
          </Link>
        )}
      </nav>
      <div className="hidden md:flex justify-center items-center gap-[10px]">
        <button className="rounded-full px-[16px] py-[8px]">contact us</button>
        {/* <button className="rounded-full px-[16px] py-[8px]" >sign in</button>
         */}
        <ConnectButton label="sign in" />
      </div>
      <div className="md:hidden flex items-center gap-x-4 pr-2">
        <ConnectButton label="sign in" showBalance={false} />
        <Drawer activeSnapPoint="top">
          <DrawerTrigger asChild>
            <Menu color="#F2FF49" />
          </DrawerTrigger>
          <DrawerContent className="bg-brandBlue border-none font-switzer text-white">
            <div className="mx-auto w-full max-w-sm flex flex-col items-center">
              <DrawerHeader>
                <DrawerTitle>
                  <Image
                    src="https://ik.imagekit.io/chainlabs/simplr-events-designs/logo-face/svg/simplr-yellow_ClyqBegTE.svg?updatedAt=1733051453777"
                    alt="Simplr Events Logo"
                    width={100}
                    height={50}
                  />
                </DrawerTitle>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <nav className="flex items-center gap-[10px] text-brandWhite">
                  {/* <p>link your ticket</p> */}
                  <Link
                    href="/marketplace"
                    className="px-[16px] py-[8px] font-bold"
                  >
                    buy
                  </Link>
                  {account.address && <TicketListingFlow />}
                  {account.address && (
                    <Link
                      href="/my-tickets"
                      className="px-[16px] py-[8px] font-bold"
                    >
                      my tickets
                    </Link>
                  )}
                </nav>
                <div className="flex justify-center items-center gap-[10px] font-bold">
                  <button className="rounded-full px-[16px] py-[8px]">
                    contact us
                  </button>
                </div>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button className="bg-white rounded-full h-8 w-8 text-brandBlack">
                    <X />
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <UserForm isOpen={modal} setIsOpen={setModal} />
    </header>
  );
}

const UserForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const account = useAccount();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      // Here you would typically send the data to your server
      try {
        const postResponse = await axios.post("/api/users", {
          email,
          address: account.address,
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
          <DialogTitle>Enter Your Information</DialogTitle>
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
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
