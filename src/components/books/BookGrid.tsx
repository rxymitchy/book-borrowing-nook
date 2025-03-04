
import React from "react";
import { Book } from "@/data/mockData";
import BookCard from "./BookCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BookGridProps {
  books: Book[];
  isLoading?: boolean;
}

const BookGrid: React.FC<BookGridProps> = ({ books, isLoading = false }) => {
  // Render skeleton grid when loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Render empty state when no books
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No books found.</p>
      </div>
    );
  }

  // Render books grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

// Skeleton loader for book card
const BookCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-4/5 mb-2" />
        <Skeleton className="h-4 w-3/5 mb-3" />
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  );
};

export default BookGrid;
