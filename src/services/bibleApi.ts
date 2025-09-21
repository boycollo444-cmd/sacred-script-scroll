// Bible API service to fetch King James Version content
export interface BibleVerse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapter {
  book_id: string;
  book_name: string;
  chapter: number;
  verses: BibleVerse[];
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'old' | 'new';
  chapters: number;
}

// Bible books data
const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { id: 'genesis', name: 'Genesis', testament: 'old', chapters: 50 },
  { id: 'exodus', name: 'Exodus', testament: 'old', chapters: 40 },
  { id: 'leviticus', name: 'Leviticus', testament: 'old', chapters: 27 },
  { id: 'numbers', name: 'Numbers', testament: 'old', chapters: 36 },
  { id: 'deuteronomy', name: 'Deuteronomy', testament: 'old', chapters: 34 },
  { id: 'joshua', name: 'Joshua', testament: 'old', chapters: 24 },
  { id: 'judges', name: 'Judges', testament: 'old', chapters: 21 },
  { id: 'ruth', name: 'Ruth', testament: 'old', chapters: 4 },
  { id: '1-samuel', name: '1 Samuel', testament: 'old', chapters: 31 },
  { id: '2-samuel', name: '2 Samuel', testament: 'old', chapters: 24 },
  { id: '1-kings', name: '1 Kings', testament: 'old', chapters: 22 },
  { id: '2-kings', name: '2 Kings', testament: 'old', chapters: 25 },
  { id: '1-chronicles', name: '1 Chronicles', testament: 'old', chapters: 29 },
  { id: '2-chronicles', name: '2 Chronicles', testament: 'old', chapters: 36 },
  { id: 'ezra', name: 'Ezra', testament: 'old', chapters: 10 },
  { id: 'nehemiah', name: 'Nehemiah', testament: 'old', chapters: 13 },
  { id: 'esther', name: 'Esther', testament: 'old', chapters: 10 },
  { id: 'job', name: 'Job', testament: 'old', chapters: 42 },
  { id: 'psalms', name: 'Psalms', testament: 'old', chapters: 150 },
  { id: 'proverbs', name: 'Proverbs', testament: 'old', chapters: 31 },
  { id: 'ecclesiastes', name: 'Ecclesiastes', testament: 'old', chapters: 12 },
  { id: 'song-of-solomon', name: 'Song of Solomon', testament: 'old', chapters: 8 },
  { id: 'isaiah', name: 'Isaiah', testament: 'old', chapters: 66 },
  { id: 'jeremiah', name: 'Jeremiah', testament: 'old', chapters: 52 },
  { id: 'lamentations', name: 'Lamentations', testament: 'old', chapters: 5 },
  { id: 'ezekiel', name: 'Ezekiel', testament: 'old', chapters: 48 },
  { id: 'daniel', name: 'Daniel', testament: 'old', chapters: 12 },
  { id: 'hosea', name: 'Hosea', testament: 'old', chapters: 14 },
  { id: 'joel', name: 'Joel', testament: 'old', chapters: 3 },
  { id: 'amos', name: 'Amos', testament: 'old', chapters: 9 },
  { id: 'obadiah', name: 'Obadiah', testament: 'old', chapters: 1 },
  { id: 'jonah', name: 'Jonah', testament: 'old', chapters: 4 },
  { id: 'micah', name: 'Micah', testament: 'old', chapters: 7 },
  { id: 'nahum', name: 'Nahum', testament: 'old', chapters: 3 },
  { id: 'habakkuk', name: 'Habakkuk', testament: 'old', chapters: 3 },
  { id: 'zephaniah', name: 'Zephaniah', testament: 'old', chapters: 3 },
  { id: 'haggai', name: 'Haggai', testament: 'old', chapters: 2 },
  { id: 'zechariah', name: 'Zechariah', testament: 'old', chapters: 14 },
  { id: 'malachi', name: 'Malachi', testament: 'old', chapters: 4 },
  
  // New Testament
  { id: 'matthew', name: 'Matthew', testament: 'new', chapters: 28 },
  { id: 'mark', name: 'Mark', testament: 'new', chapters: 16 },
  { id: 'luke', name: 'Luke', testament: 'new', chapters: 24 },
  { id: 'john', name: 'John', testament: 'new', chapters: 21 },
  { id: 'acts', name: 'Acts', testament: 'new', chapters: 28 },
  { id: 'romans', name: 'Romans', testament: 'new', chapters: 16 },
  { id: '1-corinthians', name: '1 Corinthians', testament: 'new', chapters: 16 },
  { id: '2-corinthians', name: '2 Corinthians', testament: 'new', chapters: 13 },
  { id: 'galatians', name: 'Galatians', testament: 'new', chapters: 6 },
  { id: 'ephesians', name: 'Ephesians', testament: 'new', chapters: 6 },
  { id: 'philippians', name: 'Philippians', testament: 'new', chapters: 4 },
  { id: 'colossians', name: 'Colossians', testament: 'new', chapters: 4 },
  { id: '1-thessalonians', name: '1 Thessalonians', testament: 'new', chapters: 5 },
  { id: '2-thessalonians', name: '2 Thessalonians', testament: 'new', chapters: 3 },
  { id: '1-timothy', name: '1 Timothy', testament: 'new', chapters: 6 },
  { id: '2-timothy', name: '2 Timothy', testament: 'new', chapters: 4 },
  { id: 'titus', name: 'Titus', testament: 'new', chapters: 3 },
  { id: 'philemon', name: 'Philemon', testament: 'new', chapters: 1 },
  { id: 'hebrews', name: 'Hebrews', testament: 'new', chapters: 13 },
  { id: 'james', name: 'James', testament: 'new', chapters: 5 },
  { id: '1-peter', name: '1 Peter', testament: 'new', chapters: 5 },
  { id: '2-peter', name: '2 Peter', testament: 'new', chapters: 3 },
  { id: '1-john', name: '1 John', testament: 'new', chapters: 5 },
  { id: '2-john', name: '2 John', testament: 'new', chapters: 1 },
  { id: '3-john', name: '3 John', testament: 'new', chapters: 1 },
  { id: 'jude', name: 'Jude', testament: 'new', chapters: 1 },
  { id: 'revelation', name: 'Revelation', testament: 'new', chapters: 22 },
];

class BibleApiService {
  private baseUrl = 'https://bible-api.com';
  private cache = new Map<string, any>();

  // Get all books
  getBooks(): BibleBook[] {
    return BIBLE_BOOKS;
  }

  // Get a specific book
  getBook(bookId: string): BibleBook | undefined {
    return BIBLE_BOOKS.find(book => book.id === bookId);
  }

  // Get books by testament
  getBooksByTestament(testament: 'old' | 'new'): BibleBook[] {
    return BIBLE_BOOKS.filter(book => book.testament === testament);
  }

  // Fetch a complete chapter with all verses
  async fetchChapter(bookName: string, chapter: number): Promise<BibleChapter> {
    const cacheKey = `${bookName}-${chapter}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${bookName}+${chapter}?translation=kjv`);
      if (!response.ok) {
        throw new Error(`Failed to fetch chapter: ${response.statusText}`);
      }

      const data = await response.json();
      
      const chapterData: BibleChapter = {
        book_id: bookName.toLowerCase().replace(/\s+/g, '-'),
        book_name: data.reference.split(' ')[0],
        chapter: chapter,
        verses: data.verses.map((verse: any) => ({
          book_id: bookName.toLowerCase().replace(/\s+/g, '-'),
          book_name: data.reference.split(' ')[0],
          chapter: chapter,
          verse: verse.verse,
          text: verse.text.trim(),
        })),
      };

      this.cache.set(cacheKey, chapterData);
      return chapterData;
    } catch (error) {
      console.error('Error fetching chapter:', error);
      throw error;
    }
  }

  // Fetch a specific verse
  async fetchVerse(bookName: string, chapter: number, verse: number): Promise<BibleVerse> {
    const cacheKey = `${bookName}-${chapter}-${verse}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const response = await fetch(`${this.baseUrl}/${bookName}+${chapter}:${verse}?translation=kjv`);
      if (!response.ok) {
        throw new Error(`Failed to fetch verse: ${response.statusText}`);
      }

      const data = await response.json();
      
      const verseData: BibleVerse = {
        book_id: bookName.toLowerCase().replace(/\s+/g, '-'),
        book_name: data.reference.split(' ')[0],
        chapter: chapter,
        verse: verse,
        text: data.text.trim(),
      };

      this.cache.set(cacheKey, verseData);
      return verseData;
    } catch (error) {
      console.error('Error fetching verse:', error);
      throw error;
    }
  }

  // Search for verses containing specific text
  async searchVerses(query: string): Promise<BibleVerse[]> {
    // Note: This is a simplified search - in a real app you'd want a proper search API
    // For now, we'll search through popular verses and books
    const searchBooks = ['john', 'matthew', 'psalms', 'proverbs', 'romans'];
    const results: BibleVerse[] = [];

    try {
      for (const bookName of searchBooks) {
        const book = this.getBooks().find(b => b.id === bookName);
        if (!book) continue;

        // Search first few chapters of each book for demonstration
        const chaptersToSearch = Math.min(5, book.chapters);
        
        for (let chapter = 1; chapter <= chaptersToSearch; chapter++) {
          try {
            const chapterData = await this.fetchChapter(bookName, chapter);
            const matchingVerses = chapterData.verses.filter(verse => 
              verse.text.toLowerCase().includes(query.toLowerCase())
            );
            results.push(...matchingVerses);
          } catch (error) {
            console.warn(`Failed to search ${bookName} ${chapter}:`, error);
          }
        }

        // Limit results to avoid overwhelming the UI
        if (results.length > 20) break;
      }

      return results.slice(0, 20); // Return max 20 results
    } catch (error) {
      console.error('Error searching verses:', error);
      return [];
    }
  }

  // Get a random daily verse
  async getDailyVerse(): Promise<BibleVerse> {
    // Popular verses for daily reading
    const dailyVerses = [
      { book: 'john', chapter: 3, verse: 16 },
      { book: 'psalms', chapter: 23, verse: 1 },
      { book: 'proverbs', chapter: 3, verse: 5 },
      { book: 'romans', chapter: 8, verse: 28 },
      { book: 'philippians', chapter: 4, verse: 13 },
      { book: 'jeremiah', chapter: 29, verse: 11 },
      { book: 'matthew', chapter: 11, verse: 28 },
      { book: 'isaiah', chapter: 41, verse: 10 },
      { book: '2-timothy', chapter: 3, verse: 16 },
      { book: 'hebrews', chapter: 11, verse: 1 },
    ];

    // Select based on day of year for consistency
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const selectedVerse = dailyVerses[dayOfYear % dailyVerses.length];

    return this.fetchVerse(selectedVerse.book, selectedVerse.chapter, selectedVerse.verse);
  }
}

export const bibleApi = new BibleApiService();