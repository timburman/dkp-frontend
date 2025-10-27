import { useAccount, useReadContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_TOKEN_ABI } from "@/constants";
import { SubmissionCard } from "@/components/web3/SubmissionCard";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function ProfilePage() {
    const {address, isConnected} = useAccount();

    const {data: submissionIds, isLoading} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_TOKEN_ABI,
        functionName: 'userSubmissions',
        args: [address],
        query: {
            enabled: isConnected,
        },
    });

    return (
        <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-white">My Submissions</h1>
        
        {isLoading && <p className="text-white">Loading your submissions...</p>}

        {!isLoading && submissionIds && submissionIds.length > 0 && (
            <div className="flex flex-col gap-4">
            {/* 2. Map over the IDs (in reverse to show newest first) */}
            {[...submissionIds].reverse().map(id => (
                <SubmissionCard key={id.toString()} submissionId={id} />
            ))}
            </div>
        )}

        {!isLoading && submissionIds && submissionIds.length === 0 && (
            <Card className="bg-gray-800 border-gray-700 text-white p-6 text-center">
            <CardTitle>No submissions yet</CardTitle>
            <CardDescription>
                Go to the <Link to="/submit" className="text-blue-400 underline">Submit</Link> page to create your first post!
            </CardDescription>
            </Card>
        )}
        </div>
    );
}