// src/App.jsx
import { useAccount } from 'wagmi';
import { ConnectWallet } from './components/web3/ConnectWallet';
import { ContractInfo } from './components/web3/ContractInfo';
import { SubmissionForm } from './components/web3/SubmissionForm';
import { SubmissionList } from './components/web3/SubmissionList';


function App() {

  const {isConnected} = useAccount();

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-md mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Decentralized Knowledge Proof
          </h1>
        </header>
        <main className="flex flex-col gap-6">
          <ConnectWallet />
          <ContractInfo />

          {isConnected && (
            <>
              <SubmissionForm />
              <SubmissionList /> {/* 2. Add the list here */}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;