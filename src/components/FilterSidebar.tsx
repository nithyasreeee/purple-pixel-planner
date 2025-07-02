import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Calendar, Tag, Star, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: any) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  });

  const statusFilters = [
    { id: "all", label: "All Tasks", icon: <Filter className="w-4 h-4" />, count: 44 },
    { id: "completed", label: "Completed", icon: <CheckCircle className="w-4 h-4" />, count: 24 },
    { id: "in-progress", label: "In Progress", icon: <Clock className="w-4 h-4" />, count: 8 },
    { id: "todo", label: "To Do", icon: <AlertTriangle className="w-4 h-4" />, count: 12 }
  ];

  const priorityFilters = [
    { id: "high", label: "High Priority", color: "bg-destructive" },
    { id: "medium", label: "Medium Priority", color: "bg-primary" },
    { id: "low", label: "Low Priority", color: "bg-muted" }
  ];

  const categories = [
    { id: "work", label: "Work", count: 18 },
    { id: "personal", label: "Personal", count: 12 },
    { id: "shopping", label: "Shopping", count: 8 },
    { id: "health", label: "Health", count: 6 }
  ];

  return (
    <div className="w-80 space-y-6 animate-slide-in">
      {/* Quick Actions */}
      <Card className="task-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Star className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Star className="w-4 h-4 mr-2" />
            Starred Tasks
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Due Today
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Tag className="w-4 h-4 mr-2" />
            My Tasks
          </Button>
        </CardContent>
      </Card>

      {/* Status Filter */}
      <Card className="task-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {statusFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilters.status === filter.id ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => setActiveFilters({ ...activeFilters, status: filter.id })}
            >
              <div className="flex items-center space-x-2">
                {filter.icon}
                <span>{filter.label}</span>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Priority Filter */}
      <Card className="task-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Priority</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {priorityFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilters.priority === filter.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveFilters({ ...activeFilters, priority: filter.id })}
            >
              <div className={`w-3 h-3 rounded-full ${filter.color} mr-2`} />
              <span>{filter.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="task-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilters.category === category.id ? "default" : "ghost"}
              className="w-full justify-between"
              onClick={() => setActiveFilters({ ...activeFilters, category: category.id })}
            >
              <span>{category.label}</span>
              <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                {category.count}
              </Badge>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;