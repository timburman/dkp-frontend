import { useAccount, useBalance, useReadContract } from "wagmi";
import { DKP_CONTRACT_ADDRESS, DKP_CONTRACT_ABI, DKP_TOKEN_ADDRESS } from "@/constants";
import { ethers } from "ethers";

export function UserStats() {

    const {address, isConnected} = useAccount();

    const {data: balanceData} = useBalance({
        address: address,
        token: DKP_TOKEN_ADDRESS,
        watch: true,
    });

    const {data: reputationData} = useReadContract({
        address: DKP_CONTRACT_ADDRESS,
        abi: DKP_CONTRACT_ABI,
        functionName: 'getReputationScore',
        args: [address],
        watch: true,
    });

    if (!isConnected) {
        return null;
    }

    const balance = balanceData ? parseFloat(ethers.formatUnits(balanceData.value, 18)).toFixed(2) : '0.00';
    const reputation = reputationData ? reputationData.toString() : '0';

    return (
        // Apply styles matching the Navbar.tsx design
        <div className="hidden sm:flex items-center gap-4"> {/* Hide on small screens like the design */}
        {/* RP Balance */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-primary/30">
            {/* Animated glow icon (using Tailwind classes) */}
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-glow" /> 
            <span className="font-semibold">{reputation} REP</span>
        </div>
        
        {/* DKP Balance */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card/80 border border-primary/30">
            {/* Animated glow icon */}
            
            <span className="font-semibold">{balance} $DKP</span>
        </div>
        </div>
    );

}