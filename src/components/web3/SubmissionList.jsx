import { useReadContract, useReadContracts } from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";
import { VoteButtons } from "./VoteButtons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export function SubmissionList() {

    const { data: idCounter, isLoading: isCounterLoading, isSuccess: isCounterSuccess } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getCurrentId',
    });

    console.log("Counter Hook:", { 
        idCounter, 
        isCounterLoading, 
        isCounterSuccess 
    });

    const submissionContracts = [];
    const submissionCount = idCounter ? Number(idCounter) : 0;

    for(let i = 1; i < submissionCount; i++) {
        submissionContracts.push({
            address: DKP_CONTRACT_ADDRESS,
            abi: DKP_CONTRACT_ABI,
            functionName: 'submissions',
            args: [i],
        });
    }

    const {data: submissionsData, isLoading} = useReadContracts({
        contracts: submissionContracts,

        query: {
            enabled: submissionCount > 1,
        },
    });

    console.log("Submissions Data:", submissionsData);

    if (submissionCount <= 1) {
        return (
            <div className="text-white bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Submitted Knowledge</h2>
                <p>No submissions have been made yet.</p>
            </div>
        );
    }

    if (isLoading) {
        return <p className="text-white">Loading submissions...</p>;
    }

    return (
        <div>
      <h2 className="text-xl font-bold mb-4 text-white">Submitted Knowledge</h2>
      <div className="flex flex-col gap-4">
        {submissionsData && submissionsData.map((submission, index) => {
          const submissionId = submission.result[0];
          const authorAddress = submission.result[2];
          const upVotes = submission.result[4].toString();
          const downVotes = submission.result[5].toString();

          // Helper to shorten the address for display
          const shortenAddress = (addr) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

          return submission.result ? (
            // 2. Replace the old div with the new Card component structure
            <Card key={index} className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle>Submission ID: {submissionId.toString()}</CardTitle>
                <CardDescription>Author: {shortenAddress(authorAddress)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 break-words">Hash: {submission.result[1]}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex gap-4 text-sm">
                  <span className="text-green-400">Upvotes: {upVotes}</span>
                  <span className="text-red-400">Downvotes: {downVotes}</span>
                </div>
                <VoteButtons submissionId={submissionId} />
              </CardFooter>
            </Card>
          ) : null;
        })}
      </div>
    </div>
    );
}