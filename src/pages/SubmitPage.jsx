import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useQueryClient } from '@tanstack/react-query';
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI } from '../constants';
import { ethers } from 'ethers';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, FileText, Coins } from "lucide-react";

const EtherscanLink = ({ hash }) => (
  <a href={`https://sepolia.etherscan.io/tx/${hash}`} target="_blank" rel="noopener noreferrer">
    <Button variant="link" className="p-0 h-auto">View on Etherscan</Button>
  </a>
);

export function SubmitPage() {
    const [content, setContent] = useState('');
    const { address } = useAccount();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { toast } = useToast();

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
    });

    const { data: hash, isPending, error: writeError, writeContract } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed, error: receiptError } = useWaitForTransactionReceipt({ hash });

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
        <div className="min-h-screen"> {/* Remove background, AppLayout handles it */}
        {/* Header (Simplified - Navbar handles main nav) */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-sm sticky top-16 z-40"> {/* Adjusted sticky top */}
            <div className="container mx-auto px-4 py-4">
            <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Button>
            </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Submit Knowledge</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold glow-text">
                Share Your Knowledge
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Submit facts, research, or insights for community validation. Help build a trustworthy knowledge base.
                </p>
                {/* Cost Notice */}
                <div className="glass-card p-6 border border-purple-500/30 inline-flex items-center gap-3">
                <Coins className="w-6 h-6 text-purple-400" />
                <div className="text-left">
                    <div className="font-semibold text-lg">Submission Cost: {requiredCollateral.toString()} REP</div>
                    <div className="text-sm text-muted-foreground">
                    Reputation points will be deducted upon submission
                    </div>
                </div>
                </div>
            </div>

            {/* Form */}
            {/* We use a simple form, not react-hook-form */}
            <form onSubmit={submit} className="space-y-8">
                <div className="glass-card p-8 space-y-6">
                {/* Content Field */}
                <div className="space-y-2">
                    <label className="text-lg font-semibold block">Knowledge Submission</label>
                    <p className="text-sm text-muted-foreground">
                    Write your detailed knowledge submission. Include sources, facts, and supporting evidence. (This hash will be stored on-chain).
                    </p>
                    <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your knowledge here..."
                    className="min-h-[300px] bg-background/50 border-primary/30 focus:border-primary resize-none"
                    />
                    {/* Optional: Add a character counter if needed */}
                </div>
                </div>

                {/* Submit Button & Warning */}
                <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Your submission hash will be sent for community validation.
                </div>
                <Button
                    type="submit"
                    size="lg"
                    disabled={isPending || isConfirming || !hasEnoughReputation}
                    className="bg-gradient-cyber hover:opacity-90 transition-opacity"
                >
                    {isPending ? "Confirm..." : isConfirming ? "Submitting..." : "Submit Knowledge"}
                </Button>
                </div>
                {!hasEnoughReputation && (
                <p className="text-red-500 text-sm mt-2 text-right">
                    You need {requiredCollateral.toString()} REP (You have {userReputation.toString()}).
                </p>
                )}
            </form>
            </div>
        </main>
        </div>
  );
}