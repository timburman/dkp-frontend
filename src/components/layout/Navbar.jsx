import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Wallet } from "lucide-react";
import { ConnectWallet } from "../web3/ConnectWallet";
import { UserStats } from "../web3/UserStats";

export function Navbar() {
  return (
    // Apply styles from your Navbar.tsx
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-cyber flex items-center justify-center">
              <span className="text-xl font-bold">D</span>
            </div>
            <span className="text-2xl font-bold glow-text">DKP</span>
          </Link>

          {/* Navigation Links - Use React Router Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/explore" className="text-foreground/80 hover:text-primary transition-colors">
              Explore
            </Link>
            <Link to="/profile" className="text-foreground/80 hover:text-primary transition-colors">
              Profile
            </Link>
            {/* Add other links if needed */}
          </div>

          {/* Right Side: Stats, Submit Button, Connect Button */}
          <div className="flex items-center gap-4">
            {/* Use your dynamic UserStats component */}
            <UserStats /> 
            
            {/* Submit Knowledge Button - Use React Router Link */}
            <Link to="/submit">
              <Button 
                variant="secondary"
                className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-secondary-foreground" // Added text color
              >
                Submit Knowledge
              </Button>
            </Link>

            {/* Use your dynamic ConnectWallet component */}
            <ConnectWallet /> 
          </div>
        </div>
      </div>
    </nav>
  );
};
