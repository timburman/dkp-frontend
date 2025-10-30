import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI, DKP_TOKEN_ADDRESS, DKP_TOKEN_ABI } from "@/constants";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { ethers } from "ethers";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const EtherscanLink = ({ hash }) => (
  <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
    <Button variant="link" className="p-0 h-auto">View on Etherscan</Button>
  </a>
);

export function BoostModal({ submissionId }) {
    const [amount, setAmount] = useState('10');
    const {address} = useAccount();
    const queryClient = useQueryClient();

    const {toast} = useToast();

    const {data: allowance, refetch: refetchAllowance} = useReadContract({
        address: DKP_TOKEN_ADDRESS,
        abi: DKP_TOKEN_ABI,
        functionName: 'allowance',
        args: [address, DKP_CONTRACT_ADDRESS],
        watch: true,
    });

    const {writeContract, data: hash, isPending, error: writeError} = useWriteContract();

    const parsedAmount = ethers.parseUnits(amount || '0', 18);
    const hasEnoughAllowance = allowance >= parsedAmount;

    async function handleApprove() {
        writeContract({
            address: DKP_TOKEN_ADDRESS,
            abi: DKP_TOKEN_ABI,
            functionName: 'approve',
            args: [DKP_CONTRACT_ADDRESS, parsedAmount],
        });
    }

    async function handleBoost() {
        writeContract({
            address: DKP_CONTRACT_ADDRESS,
            abi: DKP_CONTRACT_ABI,
            functionName: 'boost',
            args: [submissionId, parsedAmount],
        });
    }

    const {isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError} = useWaitForTransactionReceipt({
        hash
    });

    if (isConfirmed) {
        queryClient.invalidateQueries({queryKey: ['readContracts']});
        queryClient.invalidateQueries({queryKey: ['balance']});
        refetchAllowance();
    }

    useEffect(() => {
        if (isPending) {
            toast({
                title: "Check your wallet",
                description: "Please approve the transaction...",
            });
        } else if(isConfirming) {
            toast({
                title: "Transaction Sent",
                description: "Waiting for confirmation...",
                action: <EtherscanLink hash={hash} />,
            });
        }
    }, [isPending, isConfirming, hash, toast]);

    useEffect(() => {
        const e = writeError || receiptError;
        if (isConfirmed) {
            toast({
                title: "Success! 🎉",
                description: "Post Boosted!",
                variant: "default", // You can style this to be green
            });
            queryClient.invalidateQueries({ queryKey: ['readContracts'] });
        } else if (e) {
            toast({
                title: "Transaction Failed",
                description: e.shortMessage || e.message,
                variant: "destructive",
            });
        }
    }, [isConfirmed, writeError, receiptError, toast, queryClient]);

    return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 border-none">
          Boost 🔥
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle>Boost this Submission</DialogTitle>
          <DialogDescription>
            Spend $DKP to increase this post's visibility.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="col-span-3 bg-gray-900 border-gray-600"
          />
        </div>
        <DialogFooter>
          {hasEnoughAllowance ? (
            <Button
              onClick={handleBoost}
              disabled={isPending || isConfirming}
              className="w-full"
            >
              {isConfirming ? 'Confirming...' : 'Confirm Boost'}
            </Button>
          ) : (
            <Button
              onClick={handleApprove}
              disabled={isPending || isConfirming}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              {isConfirming ? 'Approving...' : 'Approve $DKP Spend'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}