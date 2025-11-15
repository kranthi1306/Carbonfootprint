import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { month: "Jan", emissions: 145, offset: 20 },
  { month: "Feb", emissions: 132, offset: 30 },
  { month: "Mar", emissions: 158, offset: 25 },
  { month: "Apr", emissions: 142, offset: 40 },
  { month: "May", emissions: 128, offset: 50 },
  { month: "Jun", emissions: 115, offset: 60 },
];

export const CarbonChart = () => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Carbon Footprint Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOffset" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="emissions"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorEmissions)"
            name="Emissions (kg)"
          />
          <Area
            type="monotone"
            dataKey="offset"
            stroke="hsl(var(--success))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorOffset)"
            name="Offset (kg)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};
