import { useState } from "react";
import { useWriteContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "../../constants";
import { ethers } from "ethers";

export function SubmissionForm() {

    const [content, setContent] = useState('');

    const {data: hash, isPending, error, writeContract} = useWriteContract();

    async function submit(e) {
        e.preventDefault();
        if (!content) {
            alert('Content cannot be empty');
            return;
        }

        const contentHash = ethers.keccak256(ethers.toUtf8Bytes(content));

        writeContract({
            address: DKP_CONTRACT_ADDRESS,
            abi: DKP_CONTRACT_ABI,
            functionName: 'submitContent',
            args: [contentHash],
        });
    }

    return (
        <div className="text-white bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Submit New Knowledge</h2>
            <form onSubmit={submit}>
                <textarea
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share what you know..."
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                />
                <button
                type="submit"
                disabled={isPending}
                className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
                >
                {isPending ? 'Confirming...' : 'Submit'}
                </button>
            </form>

            {/* Feedback UI for the user */}
            {hash && <div className="mt-2 text-green-400">Transaction Sent! Hash: {hash}</div>}
            {error && (
                <div className="mt-2 text-red-500">Error: {error.message}</div>
            )}
        </div>
    );
}