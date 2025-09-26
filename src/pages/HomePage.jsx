import { ContractInfo } from "@/components/web3/ContractInfo";
import { SubmissionList } from "@/components/web3/SubmissionList";

export function HomePage() {
    return (
        <div className="flex flex-col gap-6">
            <ContractInfo />
            <SubmissionList />
        </div>
    );
}