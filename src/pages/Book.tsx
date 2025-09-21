import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bibleApi, BibleBook } from "@/services/bibleApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function Book() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BibleBook | null>(null);

  useEffect(() => {
    if (bookId) {
      const foundBook = bibleApi.getBook(bookId);
      setBook(foundBook || null);
    }
  }, [bookId]);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">Book not found</h1>
          <Button onClick={() => navigate('/books')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  const handleChapterClick = (chapter: number) => {
    navigate(`/book/${book.id}/chapter/${chapter}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/books')}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Books
        </Button>
        
        <div>
          <h1 className="text-3xl font-bold font-bible text-primary">
            {book.name}
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span className="capitalize">{book.testament} Testament</span>
            <span>•</span>
            <span>{book.chapters} chapters</span>
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold font-ui">Chapters</h2>
        
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
            <Card
              key={chapter}
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20"
              onClick={() => handleChapterClick(chapter)}
            >
              <CardContent className="p-3 text-center">
                <span className="text-lg font-semibold font-ui text-primary">
                  {chapter}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testament Badge */}
      <div className="mt-8 flex justify-center">
        <Badge variant="secondary" className="text-sm">
          Part of the {book.testament === 'old' ? 'Old' : 'New'} Testament
        </Badge>
      </div>
    </div>
  );
}