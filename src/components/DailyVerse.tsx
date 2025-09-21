import { useEffect, useState } from "react";
import { BibleVerse, bibleApi } from "@/services/bibleApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DailyVerse() {
  const [verse, setVerse] = useState<BibleVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        const dailyVerse = await bibleApi.getDailyVerse();
        setVerse(dailyVerse);
      } catch (error) {
        console.error('Failed to fetch daily verse:', error);
        toast({
          title: "Error",
          description: "Failed to load daily verse. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, [toast]);

  const handleShare = async () => {
    if (!verse) return;

    const shareText = `"${verse.text}" - ${verse.book_name} ${verse.chapter}:${verse.verse}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Daily Bible Verse',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard",
        description: "Verse copied to your clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <Card className="bg-daily-verse animate-pulse">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!verse) return null;

  return (
    <Card className="bg-daily-verse border-primary/20 animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold font-ui text-primary">Verse of the Day</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="hover:bg-primary/10"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <blockquote className="verse-text text-xl mb-4 leading-relaxed text-foreground italic">
          "{verse.text}"
        </blockquote>
        
        <div className="text-right">
          <cite className="text-primary font-ui font-medium">
            {verse.book_name} {verse.chapter}:{verse.verse}
          </cite>
        </div>
      </CardContent>
    </Card>
  );
}