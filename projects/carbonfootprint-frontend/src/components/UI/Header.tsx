import { Button } from "@/components/ui/button";
import { Leaf, Wallet } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = () => {
    // Placeholder for Algorand wallet connection
    setWalletConnected(true);
    setWalletAddress("ALGO...X7Y9");
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CarbonTrack</h1>
            <p className="text-xs text-muted-foreground">Blockchain Carbon Footprint</p>
          </div>
        </div>
        
        <Button
          onClick={connectWallet}
          variant={walletConnected ? "outline" : "default"}
          className="gap-2"
        >
          <Wallet className="w-4 h-4" />
          {walletConnected ? walletAddress : "Connect Wallet"}
        </Button>
      </div>
    </header>
  );
};
