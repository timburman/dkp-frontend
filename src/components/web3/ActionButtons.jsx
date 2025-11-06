// src/components/web3/ActionButtons.jsx

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from '../../constants';
import { Button } from "@/components/ui/button";

// Button for Authors to claim their reward
export function ClaimRewardButton({ submissionId }) {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });
  
  return (
    <Button 
      size="sm" 
      onClick={() => writeContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'claimRewards',
        args: [submissionId],
      })}
      disabled={isPending || isConfirming}
      className="bg-purple-600 hover:bg-purple-700 w-full"
    >
      {isPending || isConfirming ? 'Claiming...' : 'Claim Reward 💰'}
    </Button>
  );
}

// Button for Voters to reclaim their staked REP
export function ReclaimReputationButton({ submissionId }) {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  return (
    <Button 
      size="sm" 
      onClick={() => writeContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'reclaimReputation',
        args: [submissionId],
      })}
      disabled={isPending || isConfirming}
      className="bg-gray-600 hover:bg-gray-700 w-full"
    >
      {isPending || isConfirming ? 'Reclaiming...' : 'Reclaim Stake'}
    </Button>
  );
}