import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWriteContract, useWaitForTransactionReceipt, useAccount, useReadContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from "../../constants";
import { ethers } from "ethers";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";

const EtherscanLink = ({hash}) => {
    <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
        <Button variant="link" className="p-0 h-auto">View on Etherscan</Button>
    </a>
}

export function SubmissionForm() {

    const [content, setContent] = useState('');
    const {address} = useAccount();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {toast} = useToast();

    const {data: reputationData} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: "getReputationScore",
        args: [address],
        enabled: !!address,
    });

    const {data: collateralData} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: "SUBMISSION_COLLATERAL"
    })

    const {writeContract ,data: hash, isPending, error: writeError} = useWriteContract();

    const {isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError} = useWaitForTransactionReceipt({
        hash
    });


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

    useEffect(() => {
        if (isPending) {
            toast({
                title: "Check your wallet",
                description: "Please approve the transaction...",
            });
        } else if(isConfirming) {
            toast({
                title: "Transaction Sent",
                description: "Waiting for confirmation...",
                action: <EtherscanLink hash={hash} />,
            });
        }
    }, [isPending, isConfirming, hash, toast]);

    useEffect(() => {
        const e = writeError || receiptError;
        if (isConfirmed) {
            toast({
                title: "Success! 🎉",
                description: "Your submission is on-chain and pending review.",
                variant: "default", // You can style this to be green
            });
            queryClient.invalidateQueries({ queryKey: ['readContracts'] });
            setContent('');
            navigate('/');
        } else if (e) {
            toast({
                title: "Transaction Failed",
                description: e.shortMessage || e.message,
                variant: "destructive",
            });
        }
    }, [isConfirmed, writeError, receiptError, toast, queryClient, navigate]);

    const userReputation = reputationData ? BigInt(reputationData) : 0n;
    const requiredCollateral = collateralData ? BigInt(collateralData) : 25n;
    const hasEnoughReputation = userReputation >= requiredCollateral;

    return (
        <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
                <CardTitle>Submit New Knowledge</CardTitle>
                <CardDescription>Share what you know. Requires a {requiredCollateral.toString()} REP collateral.</CardDescription>
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
                    disabled={isPending || isConfirming || !hasEnoughReputation}
                    className="mt-4 w-full"
                >
                    {isPending ? 'Confirm...' : isConfirming ? 'Confirming...' : 'Submit'}
                </Button>
                {!hasEnoughReputation && (
                    <p className="text-red-500 text-sm mt-2 text-center">
                    You need {requiredCollateral.toString()} REP to submit. You only have {userReputation.toString()}.
                    </p>
                )}
                </form>
            </CardContent>
            </Card>
    );
}