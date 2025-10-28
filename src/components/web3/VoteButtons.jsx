import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";

const EtherscanLink = ({hash}) => {
    <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
        <Button variant="link" className="p-0 h-auto">View on Etherscan</Button>
    </a>
}


export function VoteButtons({submissionId}) {

    const [stakeAmount, setStakeAmount] = useState('5');
    const [isUpvote, setIsUpvote] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const {address} = useAccount();
    const queryClient = useQueryClient();

    const {toast} = useToast();

    const {data: reputationData} = useReadContract({
        address: DKP_CONTRACT_ABI,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getReputationScore',
        args: [address],
        watch: true,
    });
    const userReputation = reputationData ? reputationData.toString() : '0';

    const {writeContract, data: hash, isPending, error: writeError} = useWriteContract();

    const {isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError} = useWaitForTransactionReceipt({
        hash
    });

    function handleVote() {
        const voteWeight = BigInt(stakeAmount);
        writeContract({
            address: DKP_CONTRACT_ADDRESS,
            abi: DKP_CONTRACT_ABI,
            functionName: 'vote',
            args: [submissionId, voteWeight, isUpvote],
        });
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

    function openModal(upvote) {
        setIsUpvote(upvote);
        setIsOpen(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex gap-2">
            <Button onClick={() => openModal(true)} variant="outline" size="sm" className="text-green-400 border-green-400 hover:bg-green-900 hover:text-green-300">
            Upvote
            </Button>
            <Button onClick={() => openModal(false)} variant="outline" size="sm" className="text-red-400 border-red-400 hover:bg-red-900 hover:text-red-300">
            Downvote
            </Button>
        </div>
        
        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
            <DialogTitle>Stake Reputation to {isUpvote ? 'Upvote' : 'Downvote'}</DialogTitle>
            <DialogDescription>
                Your available reputation: {userReputation} REP
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <Label htmlFor="stake-amount">Stake Amount (5 - 50 REP)</Label>
            <Input
                id="stake-amount"
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="col-span-3 bg-gray-900 border-gray-600"
                min="5"
                max="50"
            />
            </div>
            <DialogFooter>
            <Button
                onClick={handleVote}
                disabled={isPending || isConfirming}
                className={`w-full ${isUpvote ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
                {isConfirming ? 'Confirming...' : `Confirm ${isUpvote ? 'Upvote' : 'Downvote'}`}
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
  );


}