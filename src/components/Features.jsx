import { FileText, Users, Trophy, Shield, Coins, TrendingUp, Database } from "lucide-react";

const features = [
    { icon: FileText, title: "Submit Knowledge", description: "Share facts, articles, and research. Your contributions help build a verified knowledge base." },
    { icon: Users, title: "Community Voting", description: "Validators stake reputation points to vote on submissions, ensuring accuracy through collective wisdom." },
    { icon: Trophy, title: "Earn Rewards", description: "Get DKP tokens and reputation points for verified submissions. Quality knowledge pays off." },
    { icon: Shield, title: "Sybil Resistance", description: "Reputation-based staking prevents fake accounts and malicious actors from gaming the system." },
    { icon: Database, title: "IPFS Storage", description: "All knowledge submissions are stored on IPFS, ensuring decentralized, permanent, and censorship-resistant data." },
    { icon: Coins, title: "Token Economics", description: "DKP tokens power the ecosystem, rewarding truth and penalizing misinformation." },
    { icon: TrendingUp, title: "Build Reputation", description: "Accumulate reputation through accurate voting and quality submissions. Become a trusted validator." },
];

export function Features() {
    return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Powerful <span className="glow-text bg-gradient-cyber bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, verify, and trust decentralized knowledge
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl cyber-border group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-gradient-cyber flex items-center justify-center mb-6 group-hover:animate-float">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}