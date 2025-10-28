import { SubmissionList } from "@/components/web3/SubmissionList";

export function ExplorePage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-white mb-4">Explore Knowledge</h1>
            <SubmissionList />
        </div>
    )
}