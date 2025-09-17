// src/App.jsx

import { ConnectWallet } from './components/web3/ConnectWallet';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Decentralized Knowledge Proof
        </h1>
      </header>
      <main>
        <ConnectWallet />
      </main>
    </div>
  );
}

export default App;