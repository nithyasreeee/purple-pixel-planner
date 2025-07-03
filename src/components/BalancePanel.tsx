import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Briefcase, User, Heart, Coffee, Target, TrendingUp } from "lucide-react";
import { useBalance, BalanceData } from "@/hooks/useBalance";

export const BalancePanel = () => {
  const { balance, loading, updateBalance, getBalanceScore } = useBalance();
  const [isEditing, setIsEditing] = useState(false);
  const [tempBalance, setTempBalance] = useState<BalanceData | null>(null);

  const handleEdit = () => {
    setTempBalance(balance);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (tempBalance) {
      await updateBalance(tempBalance);
      setIsEditing(false);
      setTempBalance(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempBalance(null);
  };

  const updateTempBalance = (field: keyof BalanceData, value: number) => {
    if (tempBalance) {
      setTempBalance({ ...tempBalance, [field]: Math.max(0, value) });
    }
  };

  const getTotalHours = (data: BalanceData | null) => {
    if (!data) return 0;
    return data.workHours + data.personalHours + data.healthHours + data.leisureHours;
  };

  const getProgressData = (data: BalanceData | null) => {
    if (!data) return [];
    const total = getTotalHours(data);
    if (total === 0) return [];

    return [
      {
        label: "Work",
        hours: data.workHours,
        percentage: (data.workHours / total) * 100,
        color: "bg-primary",
        icon: <Briefcase className="w-4 h-4" />,
        ideal: 40
      },
      {
        label: "Personal",
        hours: data.personalHours,
        percentage: (data.personalHours / total) * 100,
        color: "bg-secondary",
        icon: <User className="w-4 h-4" />,
        ideal: 30
      },
      {
        label: "Health",
        hours: data.healthHours,
        percentage: (data.healthHours / total) * 100,
        color: "bg-success",
        icon: <Heart className="w-4 h-4" />,
        ideal: 20
      },
      {
        label: "Leisure",
        hours: data.leisureHours,
        percentage: (data.leisureHours / total) * 100,
        color: "bg-accent",
        icon: <Coffee className="w-4 h-4" />,
        ideal: 10
      }
    ];
  };

  const displayBalance = isEditing ? tempBalance : balance;
  const progressData = getProgressData(displayBalance);
  const balanceScore = getBalanceScore();

  if (loading) {
    return (
      <Card className="task-card">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="task-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Life Balance</span>
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave} className="btn-primary">
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Balance Score */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">Balance Score</span>
          </div>
          <div className="text-3xl font-bold text-primary">{balanceScore}%</div>
          <div className="text-xs text-muted-foreground">
            {balanceScore >= 80 ? "Excellent balance!" : 
             balanceScore >= 60 ? "Good balance" : 
             balanceScore >= 40 ? "Needs improvement" : 
             "Poor balance"}
          </div>
        </div>

        {/* Hours Input/Display */}
        <div className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="work">Work Hours</Label>
                <Input
                  id="work"
                  type="number"
                  min="0"
                  value={tempBalance?.workHours || 0}
                  onChange={(e) => updateTempBalance('workHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="personal">Personal Hours</Label>
                <Input
                  id="personal"
                  type="number"
                  min="0"
                  value={tempBalance?.personalHours || 0}
                  onChange={(e) => updateTempBalance('personalHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="health">Health Hours</Label>
                <Input
                  id="health"
                  type="number"
                  min="0"
                  value={tempBalance?.healthHours || 0}
                  onChange={(e) => updateTempBalance('healthHours', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="leisure">Leisure Hours</Label>
                <Input
                  id="leisure"
                  type="number"
                  min="0"
                  value={tempBalance?.leisureHours || 0}
                  onChange={(e) => updateTempBalance('leisureHours', parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {progressData.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{item.hours}h</span>
                      <span className="text-muted-foreground">
                        ({Math.round(item.percentage)}%)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={item.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Ideal: {item.ideal}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Hours */}
        <div className="pt-4 border-t border-secondary/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Hours Today</span>
            <span className="font-bold text-lg">{getTotalHours(displayBalance)}h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};