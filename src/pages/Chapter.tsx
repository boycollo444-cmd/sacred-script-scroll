import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bibleApi, BibleChapter, BibleBook } from "@/services/bibleApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Share2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Chapter() {
  const { bookId, chapterNum } = useParams<{ bookId: string; chapterNum: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [chapter, setChapter] = useState<BibleChapter | null>(null);
  const [book, setBook] = useState<BibleBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chapterNumber = parseInt(chapterNum || '0', 10);

  useEffect(() => {
    const loadChapter = async () => {
      if (!bookId || !chapterNum) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Get book info
        const foundBook = bibleApi.getBook(bookId);
        if (!foundBook) {
          throw new Error('Book not found');
        }
        setBook(foundBook);
        
        // Fetch chapter content
        const chapterData = await bibleApi.fetchChapter(foundBook.name, chapterNumber);
        setChapter(chapterData);
      } catch (err) {
        console.error('Error loading chapter:', err);
        setError('Failed to load chapter. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [bookId, chapterNum, chapterNumber]);

  const handleShare = async () => {
    if (!chapter || !book) return;

    const shareText = `${book.name} ${chapter.chapter} - King James Version Bible`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Chapter link copied to your clipboard.",
      });
    }
  };

  const handleVerseShare = async (verse: any) => {
    const shareText = `"${verse.text}" - ${verse.book_name} ${verse.chapter}:${verse.verse}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Bible Verse',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Verse copied",
        description: "Verse copied to your clipboard.",
      });
    }
  };

  const goToPreviousChapter = () => {
    if (book && chapterNumber > 1) {
      navigate(`/book/${book.id}/chapter/${chapterNumber - 1}`);
    }
  };

  const goToNextChapter = () => {
    if (book && chapterNumber < book.chapters) {
      navigate(`/book/${book.id}/chapter/${chapterNumber + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading chapter...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !chapter || !book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary">
            {error || 'Chapter not found'}
          </h1>
          <Button onClick={() => navigate(`/book/${bookId}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {book?.name || 'Book'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/book/${book.id}`)}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {book.name}
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold font-bible text-primary">
              {book.name} {chapter.chapter}
            </h1>
            <Badge variant="secondary">
              {chapter.verses.length} verses
            </Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={handleShare}
          className="hover:bg-primary/10"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Chapter Navigation */}
      <div className="flex justify-between items-center mb-8">
        <Button
          variant="outline"
          onClick={goToPreviousChapter}
          disabled={chapterNumber <= 1}
          className="border-primary text-primary hover:bg-primary/10"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Chapter {chapterNumber - 1}
        </Button>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            Chapter {chapterNumber} of {book.chapters}
          </span>
        </div>

        <Button
          variant="outline"
          onClick={goToNextChapter}
          disabled={chapterNumber >= book.chapters}
          className="border-primary text-primary hover:bg-primary/10"
        >
          Chapter {chapterNumber + 1}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      {/* Verses */}
      <Card className="animate-fade-in">
        <CardContent className="p-8">
          <div className="space-y-6">
            {chapter.verses.map((verse, index) => (
              <div
                key={verse.verse}
                className="group flex items-start space-x-4 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Badge
                  variant="outline"
                  className="mt-1 border-primary/30 text-primary text-sm font-medium min-w-[2rem] justify-center"
                >
                  {verse.verse}
                </Badge>
                
                <div className="flex-1 space-y-2">
                  <p className="verse-text text-lg leading-relaxed">
                    {verse.text}
                  </p>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleVerseShare(verse)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs hover:bg-primary/10"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share verse
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom Navigation */}
      <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
        <Button
          variant="outline"
          onClick={goToPreviousChapter}
          disabled={chapterNumber <= 1}
          className="border-primary text-primary hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous Chapter
        </Button>

        <Button
          variant="outline"
          onClick={goToNextChapter}
          disabled={chapterNumber >= book.chapters}
          className="border-primary text-primary hover:bg-primary/10"
        >
          Next Chapter
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}