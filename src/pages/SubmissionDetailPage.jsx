import { useParams } from 'react-router-dom';
import { useReadContract, useAccount} from 'wagmi';
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from '../constants';
import { ethers } from 'ethers';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { VoteButtons } from '@/components/web3/VoteButtons';
import { BoostModal } from '@/components/web3/BoostModal';
import { useQuery } from "@tanstack/react-query";

import {
  ClaimRewardButton,
  ReclaimReputationButton,
} from '@/components/web3/ActionButtons'; // We can refactor these later
import { shortenAddress } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const fetchIpfsContent = async (cid) => {
    if (!cid) return null;

    const url = `https://blush-big-horse-204.mypinata.cloud/ipfs/${cid}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch IPFS content:", error);
        return { title: "Error", content: "Failed to load content from IPFS." };
    }
};


export function SubmissionDetailPage() {
    const {id} = useParams();
    const {address: userAddress} = useAccount();
    const navigate = useNavigate();


    const { data: submission } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'submissions',
        args: [id],
        watch: true,
    });

    const { data: statusIndex } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getSubmissionStatus',
        args: [id],
        watch: true,
    });

    const {data: userVote} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'userVotes',
        args: [id, userAddress],
        watch: true,
    });

    const { data: lockedRep } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'lockedReputation',
        args: [id, userAddress],
        watch: true,
    });

    const contentCID = submission ? submission[1] : null;
    const { data: ipfsData, isLoading: isLoadingIpfs } = useQuery({
        queryKey: ['ipfsContent', contentCID],
        queryFn: () => fetchIpfsContent(contentCID),
        enabled: !!contentCID,
    });

    if (!submission) return <p className="text-white">Loading submission data...</p>;
    const [ , , author, , upVotes, downVotes, boostAmountWei, ...rest] = submission;
    const boostAmount = parseFloat(ethers.formatUnits(boostAmountWei, 18)).toFixed(2);
    const statusMap = ["Pending", "In Review", "Verified", "Rejected"];
    const status = statusMap[statusIndex];
    
    const isAuthor = userAddress === author;
    const canVote = status === "Pending" || status === "In Review";
    const canClaimReward = isAuthor && status === "Verified";
    const canReclaim = (status === "Verified" || status === "Rejected") && (userVote > 0) && (lockedRep > 0);

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- Left Column: Content --- */}
        <div className="lg:col-span-2 glass-card p-8 rounded-xl cyber-border">
            <Button
            variant="ghost"
            onClick={() => navigate(-1)} // Go back
            className="gap-2 mb-6"
            >
            <ArrowLeft className="w-4 h-4" />
            Back to list
            </Button>
            
            {/* Title */}
            {isLoadingIpfs ? (
            <Skeleton className="h-10 w-3/4 mb-4" />
            ) : (
            <h1 className="text-4xl font-bold mb-4 glow-text">{ipfsData?.title}</h1>
            )}
            
            {/* Author & Status */}
            <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span>By: {shortenAddress(author)}</span>
            <Badge 
                variant={status === "Verified" ? "default" : status === "Rejected" ? "destructive" : "secondary"}
                className={status === "Verified" ? "bg-green-600" : ""}
            >
                {status}
            </Badge>
            </div>

            {/* Full Content */}
            {isLoadingIpfs ? (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            ) : (
            <div className="prose prose-invert max-w-none text-gray-300 text-lg leading-relaxed">
                <p>{ipfsData?.content || "No content found."}</p>
            </div>
            )}
        </div>

        {/* --- Right Column: Actions --- */}
        <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-xl cyber-border space-y-4 sticky top-24">
            <h3 className="text-xl font-semibold text-white">Actions</h3>
            
            {/* Stats */}
            <div className="space-y-2">
                <div className="flex justify-between"><span>Upvotes:</span> <span className="text-green-400">{upVotes.toString()}</span></div>
                <div className="flex justify-between"><span>Downvotes:</span> <span className="text-red-400">{downVotes.toString()}</span></div>
                <div className="flex justify-between"><span>Boost:</span> <span className="text-blue-400">{boostAmount} $DKP</span></div>
            </div>
            
            <hr className="border-border" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
                {canVote && <VoteButtons submissionId={id} />}
                {canClaimReward && <ClaimRewardButton submissionId={id} />}
                {canReclaim && <ReclaimReputationButton submissionId={id} />}
                <BoostModal submissionId={id} />
            </div>
            </div>
        </div>
        </div>
    );
}

