import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, TrendingDown, BarChart3, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const features = [
    {
      icon: BarChart3,
      title: "Track Your Impact",
      description: "Monitor your carbon footprint across transportation, energy, food, and waste",
    },
    {
      icon: TrendingDown,
      title: "Reduce Emissions",
      description: "Get personalized suggestions to lower your environmental impact",
    },
    {
      icon: Users,
      title: "Compare & Learn",
      description: "See how you compare to others and learn from the community",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">EcoTracker</span>
          </div>
          <Button onClick={() => navigate("/auth")} variant="outline">
            Get Started
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Leaf className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Track Your Carbon Footprint
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Take control of your environmental impact. Monitor, analyze, and reduce your carbon emissions with actionable insights.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate("/auth")} className="shadow-lg">
                Start Tracking
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-md border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 text-center">
          <Card className="max-w-2xl mx-auto shadow-lg border-border/50 bg-primary/5">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Make a Difference Today
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of users tracking and reducing their environmental impact
              </p>
              <Button size="lg" onClick={() => navigate("/auth")} className="shadow-lg">
                Create Your Account
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2024 EcoTracker. Help build a sustainable future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;