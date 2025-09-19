import { useReadContract, useReadContracts } from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";

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
        <div className="text-white bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Submitted Knowledge</h2>
            <div className="flex flex-col gap-4">
                {submissionsData && submissionsData.map((submission, index) => (
                submission.result 
                ? <div key={index} className="bg-gray-700 p-3 rounded break-words">
                    <p><b>ID:</b> {submission.result[0].toString()}</p>
                    <p><b>Hash:</b> {submission.result[1]}</p>
                    <p><b>Author:</b> {submission.result[2]}</p>
                    <p><b>Upvotes:</b> {submission.result[4].toString()}</p>
                    <p><b>Downvotes:</b> {submission.result[5].toString()}</p>
                    </div>
                : null
                ))}
            </div>
        </div>
  );

}