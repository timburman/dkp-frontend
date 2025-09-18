import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectWallet() {
    const { address, isConnected } = useAccount();

    const { connect, connectors, isPending, error } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
    return (
      <div className="text-white text-center">
        <p className="mb-2">Connected: {address}</p>
        <button
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  // If not connected, display a button for EACH available connector
  return (
    <div className="flex flex-col items-center gap-4">
      {/* This logic now automatically shows MetaMask or Safe if they are installed */}
      {connectors
        .filter((connector) => connector.type === 'injected' || connector.id === 'walletConnect') // Optional: Filter to ensure only desired connectors appear
        .map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48"
          >
            {connector.name}
          </button>
      ))}
      
      {/* You can add a check for users who have no browser wallet installed */}
      {!connectors.some(c => c.type === 'injected') && (
        <p className="text-yellow-500 text-xs mt-2">
          No browser wallet detected. Install MetaMask to connect directly.
        </p>
      )}

      {isPending && <p className="text-white">Connecting...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );

}