import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const ActivityForm = () => {
  const { toast } = useToast();
  const [activityType, setActivityType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Placeholder for smart contract interaction
    toast({
      title: "Activity Recorded",
      description: "Your carbon activity has been recorded on the blockchain.",
    });
    
    // Reset form
    setActivityType("");
    setAmount("");
    setDescription("");
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-foreground mb-6">Record Activity</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="activity-type">Activity Type</Label>
          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger id="activity-type">
              <SelectValue placeholder="Select activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transport">Transportation</SelectItem>
              <SelectItem value="energy">Energy Usage</SelectItem>
              <SelectItem value="waste">Waste Production</SelectItem>
              <SelectItem value="food">Food Consumption</SelectItem>
              <SelectItem value="offset">Carbon Offset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">CO₂ Amount (kg)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Add details about this activity..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full gap-2">
          <Plus className="w-4 h-4" />
          Record Activity
        </Button>
      </form>
    </Card>
  );
};
