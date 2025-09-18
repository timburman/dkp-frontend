import { useReadContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "../../constants/index";

export function ContractInfo() {

    const { data: submissionCount, isLoading, error } = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getCurrentId',
    });

    if (isLoading) {
        return <p className="text-white">Loading submission count...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error.message}</p>;
    }

    const totalSubmissions = submissionCount ? Number(submissionCount) - 1: 0;

    return (
        <div className="text-white bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Contract Stats</h2>
            <p>Total Submissions: {totalSubmissions.toString()}</p>
        </div>
    );

}