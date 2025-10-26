import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "@/constants";
import { ethers } from "ethers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { VoteButtons } from "./VoteButtons";
import { BoostModal } from "./BoostModal";
import { shortenAddress } from "@/lib/utils";

function ClaimRewardsButton({submissionId}) {
    const {writeContract, data: hash, isPending} = useWriteContract();
    const {isLoading: isConfirming} = useWaitForTransactionReceipt({hash});

    return(
        <Button
            size="sm"
            onClick={() => writeContract({
                address: DKP_CONTRACT_ADDRESS,
                abi: DKP_CONTRACT_ABI,
                functionName: 'claimRewards',
                args: [submissionId],
            })}
            disabled={isPending || isConfirming}
            className="bg-purple-600 hover:bg-purple-700"
        >
            {isPending || isConfirming ? 'Claiming...' : "Claim Reward"}
        </Button>
    );
}

function ReputationReclaimButton({submissionId}) {
    const {writeContract, data: hash, isPending} = useWriteContract();
    const {isLoading: isConfirming} = useWaitForTransactionReceipt({hash});

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
        className="bg-gray-600 hover:bg-gray-700"
        >
        {isPending || isConfirming ? 'Reclaiming...' : 'Reclaim Stake'}
        </Button>
    );
}

export function SubmissionCard({submissionId}) {
     const {address: userAddress} = useAccount();
     const queryClient = useQueryClient();

     const {data: submission} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'submissions',
        args: [submissionId],
        watch: true,
    });

    const {data: statusIndex} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getSubmissionStatus',
        args: [submissionId],
        watch: true,
    });

    const {data: userVote} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'userVotes',
        args: [submissionId, userAddress],
        watch: true,
    });

    if (!submission) return <div className="text-white">Loading...</div>;

    const [id, hash, author, ts, upVotes, downVotes, boostAmountWei, totalVoteWeight, ...rest] = submission;

    console.log("Time stamp:", ts);
    console.log("Up Votes", upVotes);
    console.log("Down Votes:", downVotes);
    console.log("Total vote weight", totalVoteWeight);

    const boostAmount = ethers.formatUnits(boostAmountWei, 18);

    const statusMap = ["Pending", "In Review", "Verified", "Rejected", "Claimed"];
    const status = statusMap[statusIndex];

    const isAuthor = userAddress === author;
    const canVote = status === "Pending" || status === "In Review";
    const canClaimReward = isAuthor && status === "Verified";
    const canReclaim = (status === "Verified" || status === "Rejected") && (userVote > 0);

    return (
        <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader>
            <div className="flex justify-between items-start">
            <div>
                <CardTitle>Submission ID: {id.toString()}</CardTitle>
                <CardDescription>Author: {shortenAddress(author)}</CardDescription>
            </div>
            <Badge 
                variant={status === "Verified" ? "default" : status === "Rejected" ? "destructive" : "secondary"}
                className={status === "Verified" ? "bg-green-600" : ""}
            >
                {status}
            </Badge>
            </div>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-400 break-words">Hash: {hash}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
            <div className="flex gap-4 text-sm">
            <span className="text-green-400">Up: {ethers.formatUnits(upVotes, 0)}</span>
            <span className="text-red-400">Down: {ethers.formatUnits(downVotes, 0)}</span>
            <span className="text-blue-400">Boost: {boostAmount}</span>
            </div>
            <div className="flex gap-2">
            {/* Show the correct action based on status and user */}
            {canVote && <VoteButtons submissionId={id} />}
            {canClaimReward && <ClaimRewardButton submissionId={id} />}
            {canReclaim && <ReclaimReputationButton submissionId={id} />}
            <BoostModal submissionId={id} />
            </div>
        </CardFooter>
        </Card>
    );

}