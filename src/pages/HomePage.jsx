import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { SybilResistance } from "@/components/SybilResistance";
import { SubmissionList } from "@/components/web3/SubmissionList";

export function HomePage() {
    return (
        // Structure from Index.tsx
        <div className="min-h-screen"> {/* Removed bg-background as it's global */}
        {/* Navbar is handled by AppLayout */}
        <Hero />
        <Features />
        <HowItWorks />
        <SybilResistance />
        
        {/* Footer */}
        <footer className="border-t border-primary/20 py-8 mt-24">
            <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-cyber flex items-center justify-center">
                    <span className="text-lg font-bold">D</span>
                </div>
                <span className="text-xl font-bold">DKP</span>
                </div>
                <p className="text-muted-foreground text-sm">
                © 2025 DKP. Decentralized Knowledge Proof. All rights reserved.
                </p>
            </div>
            </div>
        </footer>
        </div>
    );
}