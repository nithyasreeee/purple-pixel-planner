import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TaskStats from "@/components/TaskStats";
import TaskCard from "@/components/TaskCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import { Task } from "@/types/task";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Sample task data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design new landing page",
      description: "Create a modern, responsive landing page for the product launch",
      priority: "high" as const,
      status: "in-progress" as const,
      dueDate: "Dec 15, 2024",
      category: "Work",
      isStarred: true
    },
    {
      id: "2",
      title: "Review pull requests",
      description: "Review and approve pending pull requests from the development team",
      priority: "medium" as const,
      status: "todo" as const,
      dueDate: "Dec 12, 2024",
      category: "Work",
      isStarred: false
    },
    {
      id: "3",
      title: "Grocery shopping",
      description: "Buy groceries for the week including fruits, vegetables, and dairy",
      priority: "low" as const,
      status: "completed" as const,
      dueDate: "Dec 10, 2024",
      category: "Personal",
      isStarred: false
    },
    {
      id: "4",
      title: "Gym workout",
      description: "Complete the full body workout routine",
      priority: "medium" as const,
      status: "todo" as const,
      dueDate: "Dec 11, 2024",
      category: "Health",
      isStarred: true
    },
    {
      id: "5",
      title: "Team meeting preparation",
      description: "Prepare agenda and materials for the upcoming team meeting",
      priority: "high" as const,
      status: "todo" as const,
      dueDate: "Dec 13, 2024",
      category: "Work",
      isStarred: false
    },
    {
      id: "6",
      title: "Book dentist appointment",
      description: "Schedule routine dental checkup for next month",
      priority: "low" as const,
      status: "in-progress" as const,
      dueDate: "Dec 20, 2024",
      category: "Health",
      isStarred: false
    }
  ]);

  const handleToggleComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === "completed" ? "todo" : "completed" as const }
        : task
    ));
  };

  const handleToggleStar = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isStarred: !task.isStarred }
        : task
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <TaskStats />
        
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">My Tasks</h2>
                <p className="text-muted-foreground">
                  {tasks.filter(t => t.status !== "completed").length} active tasks, {tasks.filter(t => t.status === "completed").length} completed
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-background-secondary rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
            
            {/* Tasks Grid */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                : "space-y-4"
            }>
              {tasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className="animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskCard 
                    task={task} 
                    onToggleComplete={handleToggleComplete}
                    onToggleStar={handleToggleStar}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
