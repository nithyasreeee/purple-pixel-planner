import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  trend?: number;
}

const StatsCard = ({ title, value, icon, color, trend }: StatsCardProps) => (
  <Card className="task-card hover:shadow-glow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {trend && (
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className="w-3 h-3 text-success" />
              <span className="text-success">+{trend}% from last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

interface TaskStatsProps {
  tasks: any[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const completedTasks = tasks.filter(t => t.status === "completed").length;
  const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
  const pendingTasks = tasks.filter(t => t.status === "todo").length;

  const stats = [
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-success/20 text-success",
      trend: 12
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: <Clock className="w-6 h-6" />,
      color: "bg-primary/20 text-primary",
      trend: 5
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "bg-secondary/20 text-secondary"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <StatsCard {...stat} />
        </div>
      ))}
    </div>
  );
};

export default TaskStats;