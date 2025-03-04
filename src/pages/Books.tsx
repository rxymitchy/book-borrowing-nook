
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import BookGrid from "@/components/books/BookGrid";
import { Input } from "@/components/ui/input";
import { fetchBooks } from "@/lib/api";
import { Book } from "@/data/mockData";
import { Search, BookOpenText } from "lucide-react";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        const booksData = await fetchBooks();
        setBooks(booksData);
        setFilteredBooks(booksData);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Filter books based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBooks(books);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.toLowerCase().includes(query)
    );

    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-medium text-gray-900 mb-2">Browse Books</h1>
            <p className="text-gray-600">
              Discover our collection of books available for borrowing
            </p>
          </div>

          {/* Search input */}
          <div className="w-full md:w-80">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <Input
                type="text"
                placeholder="Search by title, author or ISBN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>
        </div>

        {/* Books grid with conditional rendering */}
        {isLoading ? (
          <BookGrid books={[]} isLoading={true} />
        ) : filteredBooks.length > 0 ? (
          <BookGrid books={filteredBooks} />
        ) : (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpenText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No books found</h3>
            <p className="text-gray-600">
              We couldn't find any books matching your search. Try using different keywords.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
