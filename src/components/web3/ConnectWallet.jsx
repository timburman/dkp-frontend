// src/components/web3/ConnectWallet.jsx

import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useAppKit } from "@reown/appkit/react";
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

// You can create this helper function in `src/lib/utils.js`
const shortenAddress = (addr) => {
  if (!addr) return '';
  return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
};

export function ConnectWallet() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary">{shortenAddress(address)}</Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
          {/* --- STYLE CHANGE 1: Make the label a muted title --- */}
          <DropdownMenuLabel className="font-normal text-gray-400">
            My Wallet
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem asChild className="cursor-pointer focus:bg-gray-700">
            <Link to="/profile">My Profile</Link>
          </DropdownMenuItem>
          
          {/* --- STYLE CHANGE 2: Add a red hover/focus effect --- */}
          <DropdownMenuItem
            onClick={() => disconnect()}
            className="cursor-pointer text-red-400 focus:bg-red-500/20 focus:text-red-300"
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <Button onClick={() => open()}>Connect Wallet</Button>;
}