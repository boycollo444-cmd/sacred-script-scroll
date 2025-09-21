import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BibleVerse, bibleApi } from "@/services/bibleApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, ArrowLeft, Share2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Search() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Type a word or phrase to search the Bible.",
      });
      return;
    }

    setLoading(true);
    setHasSearched(true);
    
    try {
      const searchResults = await bibleApi.searchVerses(query.trim());
      setResults(searchResults);
      
      if (searchResults.length === 0) {
        toast({
          title: "No results found",
          description: "Try searching for different keywords or phrases.",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "There was an error searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (verse: BibleVerse) => {
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
        title: "Copied to clipboard",
        description: "Verse copied to your clipboard.",
      });
    }
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary font-medium">
          {part}
        </mark>
      ) : part
    );
  };

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
            Search Scripture
          </h1>
          <p className="text-muted-foreground">
            Find verses, stories, and teachings
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="mb-8 animate-fade-in">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search for verses, keywords, or phrases..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg"
                disabled={loading}
              />
              <Button 
                type="submit" 
                disabled={loading || !query.trim()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <SearchIcon className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Try searching for: "love", "faith", "hope", "peace", "wisdom", or any biblical concept</p>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Searching through scripture...</p>
        </div>
      )}

      {!loading && hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-ui">
              {results.length > 0 ? (
                `${results.length} result${results.length !== 1 ? 's' : ''} found`
              ) : (
                'No results found'
              )}
            </h2>
            {query && (
              <Badge variant="secondary">
                Searching for: "{query}"
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {results.map((verse, index) => (
              <Card 
                key={`${verse.book_id}-${verse.chapter}-${verse.verse}`}
                className="animate-fade-in hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-primary text-primary">
                        {verse.book_name} {verse.chapter}:{verse.verse}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(verse)}
                      className="hover:bg-primary/10"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <blockquote className="verse-text text-lg leading-relaxed">
                    {highlightText(verse.text, query)}
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions for empty state */}
      {!hasSearched && (
        <div className="space-y-6 animate-gentle-bounce">
          <h2 className="text-xl font-semibold font-ui">Popular Searches</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { term: 'love', description: 'God\'s love and love for others' },
              { term: 'faith', description: 'Trust and belief in God' },
              { term: 'hope', description: 'Hope in Christ and eternal life' },
              { term: 'peace', description: 'Peace that comes from God' },
              { term: 'wisdom', description: 'Godly wisdom and understanding' },
              { term: 'joy', description: 'Joy in the Lord' },
            ].map((suggestion) => (
              <Card 
                key={suggestion.term}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setQuery(suggestion.term);
                  handleSearch({ preventDefault: () => {} } as React.FormEvent);
                }}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold font-ui capitalize">{suggestion.term}</h3>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}