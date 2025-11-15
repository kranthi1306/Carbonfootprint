import { Header } from "@/components/Header";
import { StatsCard } from "@/components/StatsCard";
import { ActivityForm } from "@/components/ActivityForm";
import { RecentActivities } from "@/components/RecentActivities";
import { CarbonChart } from "@/components/CarbonChart";
import { Leaf, TrendingDown, Award, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 py-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Track Your Carbon Footprint
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Monitor, reduce, and offset your carbon emissions using blockchain technology
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Emissions"
            value="487 kg"
            icon={Activity}
            trend="-12% from last month"
            trendUp={true}
          />
          <StatsCard
            title="Carbon Offset"
            value="125 kg"
            icon={Leaf}
            trend="+25% from last month"
            trendUp={true}
          />
          <StatsCard
            title="Net Footprint"
            value="362 kg"
            icon={TrendingDown}
            trend="-18% from last month"
            trendUp={true}
          />
          <StatsCard
            title="Carbon Credits"
            value="45"
            icon={Award}
            trend="+10 this month"
            trendUp={true}
          />
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <CarbonChart />
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ActivityForm />
          <RecentActivities />
        </div>
      </main>
    </div>
  );
};

export default Index;
