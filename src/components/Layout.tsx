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
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-7 w-7 text-primary" />
            <div>
              <h1 className="text-xl font-bold font-bible text-foreground tracking-wide">Holy Bible</h1>
              <span className="text-xs text-muted-foreground font-ui uppercase tracking-wider">King James Version</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className={`text-sm font-medium transition-colors hover:bg-accent/50 ${
                  isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/books')}
                className={`text-sm font-medium transition-colors hover:bg-accent/50 ${
                  isActive('/books') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Books
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/search')}
                className={`text-sm font-medium transition-colors hover:bg-accent/50 ${
                  isActive('/search') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Search
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/daily')}
                className={`text-sm font-medium transition-colors hover:bg-accent/50 ${
                  isActive('/daily') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Daily
              </Button>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="border-t border-border/30 bg-background/90 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className={`flex flex-col items-center space-y-1 hover:bg-accent/50 ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Home className="h-4 w-4" />
            <span className="text-xs font-medium">Home</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/books')}
            className={`flex flex-col items-center space-y-1 hover:bg-accent/50 ${
              isActive('/books') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">Books</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/search')}
            className={`flex flex-col items-center space-y-1 hover:bg-accent/50 ${
              isActive('/search') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Search className="h-4 w-4" />
            <span className="text-xs font-medium">Search</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/daily')}
            className={`flex flex-col items-center space-y-1 hover:bg-accent/50 ${
              isActive('/daily') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span className="text-xs font-medium">Daily</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}