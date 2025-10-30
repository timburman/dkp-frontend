import { useReadContract, useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "@/constants";
import { ethers } from "ethers";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { VoteButtons } from "./VoteButtons";
import { BoostModal } from "./BoostModal";
import { shortenAddress } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";


async function fetchIpfsContent(cid, gateway = "https://blush-big-horse-204.mypinata.cloud/ipfs/") {
  try {
    if (!cid || cid.trim() === "") {
      throw new Error("Invalid or empty CID");
    }
    const url = `${gateway}${cid}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to fetch from IPFS: ${res.status}`);

    const data = await res.json();
    console.log("Ipfs data:",data);
    return data;
  } catch (err) {
    console.error("Error fetching from IPFS:", err);
    return null;
  }
}

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

    const { data: lockedRep } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'lockedReputation',
        args: [submissionId, userAddress],
        watch: true,
    });

    const contentCID = submission ? submission[1] : null;

    const {data: ipfsData, isLoading: isLoadingIpfs} = useQuery({
      queryKey: ['ipfsContent', contentCID],
      queryFn: () => fetchIpfsContent(contentCID),
      enabled: !!contentCID && contentCID.trim() !== "",
      staleTime: 5 * 60 * 1000, // don’t refetch for 5 minutes
      refetchOnWindowFocus: false,
    });

    if (!submission) return <div className="text-white">Loading...</div>;

    const [id, , author, , upVotes, downVotes, boostAmountWei, ...rest] = submission;


    const boostAmount = parseFloat(ethers.formatUnits(boostAmountWei, 18)).toFixed(2);

    const statusMap = ["Pending", "In Review", "Verified", "Rejected", "Claimed"];
    const status = statusMap[statusIndex];

    const isAuthor = userAddress === author;
    const canVote = status === "Pending" || status === "In Review";
    const canClaimReward = isAuthor && status === "Verified";
    const canReclaim = (status === "Verified" || status === "Rejected") && (userVote > 0) && (lockedRep > 0);

    return (
    <Card className="bg-gray-800 border-gray-700 text-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            {/* 6. Display title from IPFS or skeleton */}
            {isLoadingIpfs ? (
              <Skeleton className="h-8 w-3/4 mb-2" />
            ) : (
              <CardTitle>{ipfsData?.title || "Submission " + id.toString()}</CardTitle>
            )}
            <CardDescription>Author: {shortenAddress(author)}</CardDescription>
          </div>
          <Badge /* ... */ >{status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* 7. Display content from IPFS or skeleton */}
        {isLoadingIpfs ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : (
          <p className="text-sm text-gray-400 break-words line-clamp-3">
            {ipfsData?.content || "No content found."}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4 text-sm">
          <span className="text-green-400">Up: {upVotes.toString()}</span>
          <span className="text-red-400">Down: {downVotes.toString()}</span>
          <span className="text-blue-400">Boost: {boostAmount}</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
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