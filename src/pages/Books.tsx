import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { bibleApi, BibleBook } from "@/services/bibleApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft } from "lucide-react";

export default function Books() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const testament = searchParams.get('testament') as 'old' | 'new' | null;
  
  const [books] = useState<BibleBook[]>(() => {
    if (testament) {
      return bibleApi.getBooksByTestament(testament);
    }
    return bibleApi.getBooks();
  });

  const oldTestamentBooks = books.filter(book => book.testament === 'old');
  const newTestamentBooks = books.filter(book => book.testament === 'new');

  const handleBookClick = (book: BibleBook) => {
    navigate(`/book/${book.id}`);
  };

  const BookCard = ({ book }: { book: BibleBook }) => (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-primary/20"
      onClick={() => handleBookClick(book)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h3 className="font-semibold font-ui">{book.name}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground capitalize">
          {book.testament} Testament
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
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
            {testament === 'old' ? 'Old Testament' : 
             testament === 'new' ? 'New Testament' : 
             'Bible Books'}
          </h1>
          <p className="text-muted-foreground">
            {books.length} books available
          </p>
        </div>
      </div>

      {/* Testament Filter */}
      {!testament && (
        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/books?testament=old')}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Old Testament ({oldTestamentBooks.length})
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/books?testament=new')}
            className="border-primary text-primary hover:bg-primary/10"
          >
            New Testament ({newTestamentBooks.length})
          </Button>
        </div>
      )}

      {/* Books Grid */}
      <div className="space-y-8">
        {(!testament || testament === 'old') && oldTestamentBooks.length > 0 && (
          <section className="space-y-4 animate-fade-in">
            {!testament && (
              <h2 className="text-2xl font-bold font-ui text-primary">Old Testament</h2>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {oldTestamentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}

        {(!testament || testament === 'new') && newTestamentBooks.length > 0 && (
          <section className="space-y-4 animate-slide-up">
            {!testament && (
              <h2 className="text-2xl font-bold font-ui text-primary">New Testament</h2>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newTestamentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}