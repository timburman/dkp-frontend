import { useReadContract} from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";
import { SubmissionCard } from "./SubmissionCard";

export function SubmissionList() {

    const { data: idCounter, isLoading: isCounterLoading} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getCurrentId',
    });

    const submissionCount = idCounter ? Number(idCounter) : 0;
    const submissionIds = Array.from({length: submissionCount - 1}, (_, i) => i + 1).reverse();

    if (isCounterLoading) {
      return <p className="text-white">Loading submissions...</p>;
    }

    if (submissionIds.length === 0) {
      return (
        <Card className="bg-gray-800 border-gray-700 text-white p-6 text-center">
          <CardTitle>No submissions yet</CardTitle>
          <CardDescription>Be the first to submit some knowledge!</CardDescription>
        </Card>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {submissionIds.map(id => (
          <SubmissionCard key={id} submissionId={id} />
        ))}
      </div>
    );

    
}