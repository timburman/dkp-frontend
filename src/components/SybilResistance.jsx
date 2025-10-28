import { Shield, Lock, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";

const benefits = [
  // ... (Keep the benefits array exactly as in SybilResistance.tsx) ...
  { icon: Lock, title: "Identity Verification", description: "Reputation-based system prevents anonymous bad actors from influencing votes." },
  { icon: Target, title: "Stake-to-Vote Mechanism", description: "Validators must stake reputation, creating accountability for their decisions." },
  { icon: Zap, title: "Economic Deterrent", description: "Wrong votes result in reputation loss, making attacks economically unfeasible." },
];

export function SybilResistance() {
    return (
    <section id="use-cases" className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm">Enterprise-Grade Security</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Built-in
                <br />
                <span className="glow-text bg-gradient-cyber bg-clip-text text-transparent">
                  Sybil Resistance
                </span>
              </h2>

              <p className="text-xl text-muted-foreground leading-relaxed">
                DKP's reputation-staking mechanism creates a robust defense against fake accounts, 
                bot networks, and coordinated manipulation attacks. Perfect for applications requiring 
                verified human participation.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-cyber flex items-center justify-center">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-gradient-cyber hover:opacity-90 transition-opacity">
                Explore Use Cases
              </Button>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="glass-card p-8 rounded-2xl cyber-border">
                {/* ... (Keep the use case cards section exactly as in SybilResistance.tsx) ... */}
                 <div className="space-y-6">
                  {/* Use Case Cards */}
                  <div className="space-y-4">
                    <div className="p-6 bg-card/50 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors">
                      <h4 className="font-semibold mb-2">🗳️ Governance Systems</h4>
                      <p className="text-sm text-muted-foreground">Ensure one-person-one-vote in DAOs and online governance</p>
                    </div>
                     <div className="p-6 bg-card/50 rounded-xl border border-primary/20 hover:border-primary/40 transition-colors">
                      <h4 className="font-semibold mb-2">📰 News Verification</h4>
                      <p className="text-sm text-muted-foreground">Combat fake news with community-verified fact-checking</p>
                    </div>
                    {/* ... other cards ... */}
                   </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl border border-primary/30 animate-float">
                <div className="text-2xl font-bold text-primary">99.7%</div>
                <div className="text-xs text-muted-foreground">Attack Prevention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}