import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, MoreVertical, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggleComplete?: (taskId: string) => void;
  onToggleStar?: (taskId: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

const TaskCard = ({ task, onToggleComplete, onToggleStar, onEdit, onDelete }: TaskCardProps) => {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      onToggleComplete?.(task.id);
      setIsCompleting(false);
    }, 600);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground";
      case "medium":
        return "bg-primary text-primary-foreground";
      case "low":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const isCompleted = task.status === "completed";

  return (
    <Card
      className={cn(
        "task-card group relative overflow-hidden transition-all duration-300",
        isCompleted && "opacity-75",
        isCompleting && "task-complete-animation"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "w-5 h-5 rounded-full border-2 transition-all duration-200",
                isCompleted
                  ? "bg-success border-success text-success-foreground"
                  : "border-muted-foreground hover:border-primary hover:bg-primary/10"
              )}
              onClick={handleComplete}
            >
              {isCompleted && <Check className="w-3 h-3" />}
            </Button>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onToggleStar?.(task.id)}
            >
              <Star
                className={cn(
                  "w-4 h-4",
                  task.isStarred ? "fill-primary text-primary" : "text-muted-foreground"
                )}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onEdit?.(task)}
            >
              <MoreVertical className="w-4 h-4 text-muted-foreground" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3
            className={cn(
              "font-semibold text-card-foreground",
              isCompleted && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t border-secondary/20">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span className="text-secondary">{task.category}</span>
          </div>
        </div>
      </CardFooter>

      {/* Glow effect for completed tasks */}
      {isCompleted && (
        <div className="absolute inset-0 bg-gradient-to-r from-success/10 to-primary/10 pointer-events-none" />
      )}
    </Card>
  );
};

export default TaskCard;