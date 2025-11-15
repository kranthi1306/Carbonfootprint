import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Zap, Trash2, Leaf } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
  icon: typeof Car;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "Transportation",
    amount: 12.5,
    date: "2 hours ago",
    description: "Car commute - 50km",
    icon: Car,
  },
  {
    id: "2",
    type: "Energy Usage",
    amount: 8.3,
    date: "5 hours ago",
    description: "Office electricity consumption",
    icon: Zap,
  },
  {
    id: "3",
    type: "Carbon Offset",
    amount: -15.0,
    date: "1 day ago",
    description: "Tree planting initiative",
    icon: Leaf,
  },
  {
    id: "4",
    type: "Waste",
    amount: 3.2,
    date: "2 days ago",
    description: "Plastic waste disposal",
    icon: Trash2,
  },
];

export const RecentActivities = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const isOffset = activity.amount < 0;
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isOffset ? "bg-success/20" : "bg-primary/20"
              }`}>
                <Icon className={`w-5 h-5 ${isOffset ? "text-success" : "text-primary"}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-foreground">{activity.type}</p>
                  <Badge variant={isOffset ? "outline" : "secondary"} className={isOffset ? "border-success text-success" : ""}>
                    {isOffset ? "" : "+"}{activity.amount} kg CO₂
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
