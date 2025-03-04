
import React from "react";
import { Link } from "react-router-dom";
import { Book } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

interface BookCardProps {
  book: Book;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className }) => {
  return (
    <Link to={`/books/${book.id}`} className={cn("block", className)}>
      <div className="group book-card h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300">
        {/* Image container with aspect ratio */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {/* Book cover image */}
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Availability badge */}
          <div className="absolute top-3 right-3">
            {book.isAvailable ? (
              <Badge variant="default" className="bg-green-50 text-green-600 border border-green-100 hover:bg-green-100 transition-colors">
                <CheckCircle size={12} className="mr-1" />
                Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-amber-50 text-amber-600 border border-amber-100 hover:bg-amber-100 transition-colors">
                <AlertCircle size={12} className="mr-1" />
                Borrowed
              </Badge>
            )}
          </div>
        </div>
        
        {/* Book info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 mb-3">{book.author}</p>
          <p className="text-xs text-gray-400">ISBN: {book.isbn}</p>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
