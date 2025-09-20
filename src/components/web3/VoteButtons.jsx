import { useWriteContract } from "wagmi";
import { DKP_CONTRACT_ABI, DKP_CONTRACT_ADDRESS } from "../../constants";

export function VoteButtons({submissionId}) {

    const {isPending, error, writeContract, data: hash} = useWriteContract();

    const handleVote = (isUpVote) => {

        writeContract({
            address: DKP_CONTRACT_ADDRESS,
            abi: DKP_CONTRACT_ABI,
            functionName: 'vote',
            args: [submissionId, isUpVote],
        });
    };

    return (
        <div className="mt-4">
            <div className="flex gap-4">
                <button
                onClick={() => handleVote(true)} // true for upvote
                disabled={isPending}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-sm disabled:bg-gray-500"
                >
                {isPending ? '...' : 'Upvote'}
                </button>
                <button
                onClick={() => handleVote(false)} // false for downvote
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm disabled:bg-gray-500"
                >
                {isPending ? '...' : 'Downvote'}
                </button>
            </div>

            {/* Feedback UI for the user */}
            {isPending && <div className="mt-2 text-sm text-yellow-400">Confirm in wallet...</div>}
            {hash && <div className="mt-2 text-sm text-green-400 truncate">Tx Sent: {hash}</div>}
            {error && (
                // wagmi provides helpful, user-friendly error messages
                <div className="mt-2 text-sm text-red-500">Error: {error.shortMessage}</div>
            )}
        </div>
  );

}