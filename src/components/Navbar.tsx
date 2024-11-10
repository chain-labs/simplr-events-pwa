import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import TicketListingFlow from "@/app/(web3)/marketplace/components/ListButton";
import { useAccount } from "wagmi";

export default function Navbar() {
  const account = useAccount();
  return (
    <nav className="bg-slate-700 border-b py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href="/marketplace"
              className="flex-shrink-0 flex items-center"
            >
              <div>
                <img src="/images/logo.svg" alt="logo" />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-x-4">
            <ConnectButton />
            {account.address && <TicketListingFlow />}
          </div>
        </div>
      </div>
    </nav>
  );
}
