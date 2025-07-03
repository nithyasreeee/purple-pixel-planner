import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TaskStats from "@/components/TaskStats";
import TaskCard from "@/components/TaskCard";
import FilterSidebar from "@/components/FilterSidebar";
import { BalancePanel } from "@/components/BalancePanel";
import { TaskModal } from "@/components/TaskModal";
import { Button } from "@/components/ui/button";
import { Plus, Grid, List } from "lucide-react";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  
  const { user } = useAuth();
  const { tasks, loading, addTask, updateTask, deleteTask, toggleTaskComplete, toggleTaskStar } = useTasks();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id'>) => {
    if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(undefined);
    } else {
      await addTask(taskData);
    }
    setShowTaskModal(false);
  };

  const handleCloseModal = () => {
    setShowTaskModal(false);
    setEditingTask(undefined);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <Header />
        <HeroSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      
      {/* Main Dashboard */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <TaskStats tasks={tasks} />
        
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            <FilterSidebar />
            <BalancePanel />
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
                
                <Button 
                  className="btn-primary"
                  onClick={() => setShowTaskModal(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
            
            {/* Tasks Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="task-card animate-pulse">
                    <div className="h-32 bg-muted rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
              }>
                {tasks.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground mb-4">No tasks yet. Create your first task!</p>
                    <Button 
                      className="btn-primary"
                      onClick={() => setShowTaskModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                ) : (
                  tasks.map((task, index) => (
                    <div 
                      key={task.id} 
                      className="animate-bounce-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <TaskCard 
                        task={task} 
                        onToggleComplete={toggleTaskComplete}
                        onToggleStar={toggleTaskStar}
                        onEdit={handleEditTask}
                        onDelete={deleteTask}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Task Modal */}
      <TaskModal 
        open={showTaskModal}
        onOpenChange={handleCloseModal}
        onSave={handleSaveTask}
        task={editingTask}
      />
    </div>
  );
};

export default Index;
