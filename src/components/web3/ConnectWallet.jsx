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
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-48"
        >
          {connector.name}
        </button>
      ))}
      
      {isPending && <p className="text-white">Connecting...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
    </div>
  );

}