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
        <div className="flex items-center gap-4">
        {/* Reputation */}
        <div className="text-sm text-white bg-gray-700/50 px-3 py-1.5 rounded-md">
            <span className="font-bold">{reputation}</span>
            <span className="text-gray-400"> REP</span>
        </div>
        {/* Token Balance */}
        <div className="text-sm text-white bg-gray-700/50 px-3 py-1.5 rounded-md">
            <span className="font-bold">{balance}</span>
            <span className="text-gray-400"> $DKP</span>
        </div>
        </div>
    );

}