import { Upload, Vote, CheckCircle, Gift } from "lucide-react";

const steps = [
    { icon: Upload, number: "01", title: "Submit Knowledge", description: "Authors submit facts, articles, or research with supporting evidence and sources." },
    { icon: Vote, number: "02", title: "Community Stakes & Votes", description: "Validators review submissions and stake their reputation points to vote on accuracy." },
    { icon: CheckCircle, number: "03", title: "Verification Complete", description: "When consensus is reached, the knowledge is marked as verified or rejected." },
    { icon: Gift, number: "04", title: "Rewards Distributed", description: "Authors of verified knowledge receive DKP tokens and reputation. Accurate voters also earn rewards." },
];

export function HowItWorks() {
    return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial from-secondary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            How It <span className="glow-text bg-gradient-cyber bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A simple four-step process to verify knowledge and earn rewards
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-24 w-0.5 h-32 bg-gradient-to-b from-primary to-secondary" />
              )}

              <div className="flex flex-col md:flex-row gap-8 mb-16 group">
                {/* Icon & Number */}
                <div className="flex-shrink-0 relative">
                  <div className="w-20 h-20 rounded-xl bg-gradient-cyber flex items-center justify-center group-hover:animate-float">
                    <step.icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-lg bg-card/80 border border-primary/30 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{step.number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass-card p-8 rounded-xl cyber-border">
                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}