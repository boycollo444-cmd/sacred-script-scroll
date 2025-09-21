import { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Home, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-bible text-primary">Holy Bible</h1>
            <span className="text-sm text-muted-foreground font-ui">King James Version</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="border-t border-border bg-card/80 backdrop-blur-sm md:hidden">
        <div className="flex items-center justify-around py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className={`flex flex-col items-center space-y-1 ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/books')}
            className={`flex flex-col items-center space-y-1 ${isActive('/books') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Books</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className={`flex flex-col items-center space-y-1 ${isActive('/search') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/daily')}
            className={`flex flex-col items-center space-y-1 ${isActive('/daily') ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Heart className="h-5 w-5" />
            <span className="text-xs">Daily</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}