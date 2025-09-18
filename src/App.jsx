// src/App.jsx

import { ConnectWallet } from './components/web3/ConnectWallet';
import { ContractInfo } from './components/web3/ContractInfo';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Decentralized Knowledge Proof
          </h1>
        </header>
        <main className="flex flex-col gap-6">
          <ConnectWallet />
          <ContractInfo /> {/* 2. Add the component here */}
        </main>
      </div>
    </div>
  );
}

export default App;