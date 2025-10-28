import { Button } from "./ui/button";
import { ArrowRight, Shield, Coins } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero(){
    return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/30">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm">Decentralized Truth Verification</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Prove Knowledge,
            <br />
            <span className="glow-text bg-gradient-cyber bg-clip-text text-transparent">
              Earn Trust
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Submit knowledge, let the community verify it through staking. Get rewarded with DKP tokens 
            and reputation points for contributing verified facts. Fight misinformation together.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/submit"> {/* Link to submit page */}
              <Button size="lg" className="bg-gradient-cyber hover:opacity-90 transition-opacity text-lg px-8">
                Submit Knowledge
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            {/* You can link the "Learn More" button to a specific section if needed */}
            <Button size="lg" variant="outline" className="cyber-border text-lg px-8">
              <Coins className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};