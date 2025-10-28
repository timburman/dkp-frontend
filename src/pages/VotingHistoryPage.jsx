import { useAccount, useReadContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "@/constants";
import { SubmissionCard } from "@/components/web3/SubmissionCard";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

export function VotingHistoryPage() {
    const {address, isConnected} = useAccount();

    const {data: votedSubmissionIds, isLoading} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'userVotedOnSubmissions',
        args: [address],
        query: {
            enabled: isConnected,
        },
    });

    const uniqueIds = votedSubmissionIds ? [...new Set(votedSubmissionIds)] : [];

    return (
        <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white">My Voting History</h1>
        <p className="text-muted-foreground">
            Review submissions you have voted on and reclaim your staked reputation for finalized posts.
        </p>
        
        {isLoading && <p className="text-white">Loading your voting history...</p>}

        {!isLoading && uniqueIds.length > 0 && (
            <div className="flex flex-col gap-4">
            {/* Map over the IDs (in reverse to show newest first) */}
            {[...uniqueIds].reverse().map(id => (
                // Use toString() for the key as IDs are BigInts
                <SubmissionCard key={id.toString()} submissionId={id} /> 
            ))}
            </div>
        )}

        {!isLoading && uniqueIds.length === 0 && (
            <Card className="bg-gray-800 border-gray-700 text-white p-6 text-center">
            <CardTitle>No Voting History Yet</CardTitle>
            <CardDescription>
                Go to the <Link to="/explore" className="text-blue-400 underline">Explore</Link> page to vote on submissions!
            </CardDescription>
            </Card>
        )}
        </div>
  );
}
