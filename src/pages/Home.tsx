import { DailyVerse } from "@/components/DailyVerse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Users, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-6 py-16 space-y-20 max-w-5xl">
      {/* Hero Section */}
      <section className="text-center space-y-8 animate-fade-in">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-light font-bible text-foreground tracking-wide">
            Holy Bible
          </h1>
          <div className="space-y-3">
            <p className="text-lg md:text-xl text-muted-foreground font-ui font-light">
              King James Version
            </p>
            <p className="text-base text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
              Read, study, and reflect on God's Word. Complete access to all 66 books 
              with search and daily inspiration.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => navigate('/books')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-ui font-medium tracking-wide"
            >
              Browse Books
            </Button>
            
            <Button 
              variant="ghost"
              onClick={() => navigate('/search')}
              className="text-foreground hover:bg-accent/50 px-8 py-3 text-base font-ui font-medium tracking-wide"
            >
              Search Scripture
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Verse */}
      <section className="animate-slide-up">
        <DailyVerse />
      </section>

      {/* Testament Navigation */}
      <section className="space-y-12 animate-gentle-bounce">        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Testament */}
          <Card className="hover:bg-accent/20 transition-all duration-500 cursor-pointer border-border/30 bg-card/50">
            <CardContent 
              className="p-8 space-y-6"
              onClick={() => navigate('/books?testament=old')}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-ui tracking-wide">Old Testament</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  The foundational scriptures from Genesis through Malachi. 
                  39 books containing the Law, Prophets, and Writings.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                39 Books
              </div>
            </CardContent>
          </Card>

          {/* New Testament */}
          <Card className="hover:bg-accent/20 transition-all duration-500 cursor-pointer border-border/30 bg-card/50">
            <CardContent 
              className="p-8 space-y-6"
              onClick={() => navigate('/books?testament=new')}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold font-ui tracking-wide">New Testament</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  The life of Jesus and the early Christian church. 
                  27 books from the Gospels through Revelation.
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                27 Books
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}