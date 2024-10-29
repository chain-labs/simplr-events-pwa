'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LoginContext } from '@/src/contexts/Web3Auth';
import { useWeb3Auth } from '@web3auth/no-modal-react-hooks';
import RPC from '@/src/utils/ethersRPC';
import { userInfo } from 'os';

type User = {
  walletAddress: string;
  email: string;
};

export function NavbarWithLoginAndDrawer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const web3auth = useContext(LoginContext);
  const { provider, isConnected, userInfo } = useWeb3Auth();

  const handleLogin = async (type: 'Web3' | 'Web2') => {
    setIsModalOpen(false);
    if (type === 'Web2') {
      try {
        await web3auth?.connect();
      } catch (err) {
        console.log({ err });
      }
    }
  };

  const handleLogout = async () => {
    await web3auth?.logout();
    setUser(null);
    setIsLoggedIn(false);
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (isConnected) {
      if (provider) {
        RPC.getAccounts(provider).then((data) => {
          setUser({ email: userInfo?.email ?? '', walletAddress: data });
        });
      }
    }
    setUser({ email: '', walletAddress: '' });
  }, [provider, isConnected, userInfo]);

  const condensedAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const LoginButton = () => (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Login Method</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <Button onClick={() => handleLogin('Web3')}>Web3 Login</Button>
          <Button onClick={() => handleLogin('Web2')}>Web2 Login</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[140px] justify-start">
          <span className="truncate">
            {condensedAddress(
              user?.walletAddress ?? '0x0000000000000000000000000000000000',
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            window.navigator.clipboard.writeText(user?.walletAddress ?? '');
            alert("'Wallet address copied!'");
          }}
        >
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="bg-neutral-950 border-b border-neutral-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="/images/logo.svg" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button variant="ghost" className="text-white">
                Home
              </Button>
              <Button variant="ghost" className="text-white">
                About
              </Button>
              <Button variant="ghost" className="text-white">
                Contact
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isConnected ? <UserMenu /> : <LoginButton />}
            </div>
          </div>
          <div className="md:hidden">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-neutral-950">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col space-y-4">
                  <Button variant="ghost" className="text-white">
                    Home
                  </Button>
                  <Button variant="ghost" className="text-white">
                    About
                  </Button>
                  <Button variant="ghost" className="text-white">
                    Contact
                  </Button>
                  {isConnected ? (
                    <>
                      <Button
                        variant="outline"
                        className="justify-start text-white"
                      >
                        <span className="truncate">
                          {condensedAddress(
                            user?.walletAddress ??
                              '0x000000000000000000000000000',
                          )}
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="text-white"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <LoginButton />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
