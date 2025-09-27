// src/components/web3/ConnectWallet.jsx

import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { useAppKit } from "@reown/appkit/react";

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
      <Button onClick={() => disconnect()} variant="secondary">
        {shortenAddress(address)}
      </Button>
    );
  }

  return <Button onClick={() => open()}>Connect Wallet</Button>;
}