import { useWriteContract, useWaitForTransactionReceipt, useReadContract, useAccount } from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";


export function VoteButtons({submissionId}) {

    const [stakeAmount, setStakeAmount] = useState('5');
    const [isUpvote, setIsUpvote] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const {address} = useAccount();
    const queryClient = useQueryClient();

    const {data: reputationData} = useReadContract({
        address: DKP_CONTRACT_ABI,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getReputationScore',
        args: [address],
        watch: true,
    });
    const userReputation = reputationData ? reputationData.toString() : '0';

    const { writeContract, data: hash, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

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
        if (isConfirmed) {
        queryClient.invalidateQueries({ queryKey: ['readContracts'] });
        queryClient.invalidateQueries({ queryKey: ['readContract'] });
        setIsOpen(false);
        }
    }, [isConfirmed, queryClient]);

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
            {error && <p className="text-red-500 text-sm mt-2">Error: {error.shortMessage}</p>}
        </DialogContent>
        </Dialog>
  );


}