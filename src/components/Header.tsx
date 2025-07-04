import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Menu, Bell, User } from "lucide-react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="sticky top-0 z-50 bg-background-secondary/80 backdrop-blur-md border-b border-secondary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">TaskFlow</h1>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input/50 border-secondary/30 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              className="btn-primary hidden sm:flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Task</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <User className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-secondary hover:bg-secondary/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;