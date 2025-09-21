import { DailyVerse } from "@/components/DailyVerse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Users, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 animate-fade-in">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold font-bible text-primary">
            Holy Bible
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-ui">
            King James Version
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read, study, and reflect on God's Word. Access all 66 books with search, 
            daily verses, and offline reading.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => navigate('/books')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-ui"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            Start Reading
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/search')}
            className="border-primary text-primary hover:bg-primary/10 px-8 py-3 text-lg font-ui"
          >
            <Search className="mr-2 h-5 w-5" />
            Search Scripture
          </Button>
        </div>
      </section>

      {/* Daily Verse */}
      <section className="animate-slide-up">
        <DailyVerse />
      </section>

      {/* Quick Access */}
      <section className="space-y-6 animate-gentle-bounce">
        <h2 className="text-2xl font-bold font-ui text-center">Quick Access</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Old Testament */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20">
            <CardContent 
              className="p-6 text-center space-y-4"
              onClick={() => navigate('/books?testament=old')}
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Crown className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-ui">Old Testament</h3>
                <p className="text-muted-foreground">39 books from Genesis to Malachi</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The Law, Prophets, and Writings of ancient Israel
                </p>
              </div>
            </CardContent>
          </Card>

          {/* New Testament */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20">
            <CardContent 
              className="p-6 text-center space-y-4"
              onClick={() => navigate('/books?testament=new')}
            >
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold font-ui">New Testament</h3>
                <p className="text-muted-foreground">27 books from Matthew to Revelation</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The life of Jesus and the early Christian church
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-ui text-center">Features</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center space-y-2 p-4">
            <BookOpen className="h-8 w-8 text-primary mx-auto" />
            <h4 className="font-semibold font-ui">Complete Bible</h4>
            <p className="text-sm text-muted-foreground">All 66 books included</p>
          </div>
          
          <div className="text-center space-y-2 p-4">
            <Search className="h-8 w-8 text-primary mx-auto" />
            <h4 className="font-semibold font-ui">Powerful Search</h4>
            <p className="text-sm text-muted-foreground">Find any verse or topic</p>
          </div>
          
          <div className="text-center space-y-2 p-4">
            <Users className="h-8 w-8 text-primary mx-auto" />
            <h4 className="font-semibold font-ui">Share Verses</h4>
            <p className="text-sm text-muted-foreground">Share God's Word easily</p>
          </div>
          
          <div className="text-center space-y-2 p-4">
            <Crown className="h-8 w-8 text-primary mx-auto" />
            <h4 className="font-semibold font-ui">Daily Verses</h4>
            <p className="text-sm text-muted-foreground">Fresh inspiration daily</p>
          </div>
        </div>
      </section>
    </div>
  );
}