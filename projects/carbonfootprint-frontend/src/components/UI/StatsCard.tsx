import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatsCard = ({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`text-sm font-medium ${trendUp ? "text-success" : "text-destructive"}`}>
              {trend}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};
