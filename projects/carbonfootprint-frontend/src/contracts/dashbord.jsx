import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LogOut, Car, Zap, Utensils, Trash2, TrendingDown, Award } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const categories = [
    {
      icon: Car,
      name: "Transportation",
      value: 2.5,
      total: 5,
      unit: "tons CO₂/year",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Zap,
      name: "Energy",
      value: 3.2,
      total: 6,
      unit: "tons CO₂/year",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Utensils,
      name: "Food",
      value: 1.8,
      total: 4,
      unit: "tons CO₂/year",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Trash2,
      name: "Waste",
      value: 0.7,
      total: 2,
      unit: "tons CO₂/year",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const totalFootprint = categories.reduce((sum, cat) => sum + cat.value, 0);
  const averageFootprint = 16; // Global average
  const reductionPercentage = ((averageFootprint - totalFootprint) / averageFootprint) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Carbon Footprint Dashboard</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-md border-border/50">
            <CardHeader className="pb-3">
              <CardDescription>Total Annual Footprint</CardDescription>
              <CardTitle className="text-3xl">{totalFootprint.toFixed(1)} tons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">CO₂ equivalent per year</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/50 bg-success/5">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-success" />
                Below Average
              </CardDescription>
              <CardTitle className="text-3xl text-success">
                {reductionPercentage.toFixed(0)}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Better than global average</p>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/50 bg-accent/5">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                Eco Warrior
              </CardDescription>
              <CardTitle className="text-2xl">Level 7</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Keep reducing your impact!</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Carbon Footprint by Category</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category) => (
              <Card key={category.name} className="shadow-md border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${category.bgColor}`}>
                        <category.icon className={`w-6 h-6 ${category.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription className="text-xs">{category.unit}</CardDescription>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-foreground">{category.value}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={(category.value / category.total) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {category.value} of {category.total} tons CO₂
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="shadow-md border-border/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              Suggestions to Reduce Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Consider carpooling or using public transportation 2-3 days per week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Switch to LED bulbs and unplug devices when not in use</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Try having at least 2 meat-free days per week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Start composting organic waste to reduce landfill emissions</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;