import { DailyVerse } from "@/components/DailyVerse";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Daily() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Home
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold font-bible text-primary">
            Daily Verse
          </h1>
          <p className="text-muted-foreground">
            Today's inspiration from God's Word
          </p>
        </div>
      </div>

      {/* Today's Date */}
      <Card className="mb-8 animate-fade-in">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold font-ui">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Daily Verse */}
      <div className="animate-slide-up mb-8">
        <DailyVerse />
      </div>

      {/* Inspirational Message */}
      <Card className="animate-gentle-bounce bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold font-bible text-primary mb-4">
            Reflection & Meditation
          </h2>
          
          <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
            Take a moment to meditate on today's verse. Let God's Word speak to your heart 
            and guide your steps throughout this day. His promises are faithful and His love endures forever.
          </p>
          
          <div className="mt-6 space-y-2">
            <p className="text-sm text-muted-foreground italic">
              "Thy word is a lamp unto my feet, and a light unto my path."
            </p>
            <p className="text-sm text-primary font-medium">
              Psalm 119:105
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
        <Button 
          onClick={() => navigate('/books')}
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
        >
          Explore More Scripture
        </Button>
        
        <Button 
          onClick={() => navigate('/search')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Search the Bible
        </Button>
      </div>
    </div>
  );
}