import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "../../constants";
import { ethers } from "ethers";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export function SubmissionForm() {

    const [content, setContent] = useState('');
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {writeContract ,data: hash, isPending, error} = useWriteContract();

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

    const {isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({
        hash,
    })

    useEffect(() => {

        if (isConfirmed) {
            console.log("Submission confirmed! Refetching data....");
        }

        queryClient.invalidateQueries({ queryKey: ['readContracts'] });
        setContent('');

        navigate('/');

    }, [isConfirmed, queryClient, navigate]);

    return (
        <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
                <CardTitle>Submit New Knowledge</CardTitle>
                <CardDescription>Share what you know with the community.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit}>
                {/* 3. Replace the old textarea with the new one */}
                <Textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type your content here..."
                    className="bg-gray-900 border-gray-600"
                />
                <Button
                    type="submit"
                    disabled={isPending || isConfirming}
                    className="mt-4 w-full"
                >
                    {isPending ? 'Confirm...' : isConfirming ? 'Confirming...' : 'Submit'}
                </Button>
                </form>
                {/* Feedback UI for the user */}
                {hash && <div className="mt-2 text-green-400">Transaction Sent! Hash: {hash}</div>}
                {error && (
                    <div className="mt-2 text-red-500">Error: {error.message}</div>
                )}
            </CardContent>
            </Card>
    );
}