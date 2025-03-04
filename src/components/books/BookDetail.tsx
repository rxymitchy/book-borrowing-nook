
import React from "react";
import { Book } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookDetailProps {
  book: Book;
  isLoading?: boolean;
  onBorrow?: () => void;
  onReturn?: () => void;
  isBorrowed?: boolean;
  dueDate?: Date | null;
  isActionLoading?: boolean;
  isAuthenticated?: boolean;
}

const BookDetail: React.FC<BookDetailProps> = ({
  book,
  isLoading = false,
  onBorrow,
  onReturn,
  isBorrowed = false,
  dueDate = null,
  isActionLoading = false,
  isAuthenticated = false,
}) => {
  if (isLoading) {
    return <BookDetailSkeleton />;
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden shadow-sm animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Book cover image */}
        <div className="bg-gray-50 p-6 flex items-center justify-center md:justify-start">
          <div className="relative w-full max-w-[250px] aspect-[3/4] rounded-lg overflow-hidden shadow-md">
            <img
              src={book.coverImage}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Book details */}
        <div className="p-6 md:pr-8 flex flex-col">
          <div className="mb-2">
            {book.isAvailable ? (
              <Badge className="bg-green-50 text-green-600 border-green-100 mb-3">
                <CheckCircle size={12} className="mr-1" /> Available
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-amber-50 text-amber-600 border-amber-100 mb-3">
                <AlertCircle size={12} className="mr-1" /> Currently Borrowed
              </Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 mb-2">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-6">By {book.author}</p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">ISBN: {book.isbn}</p>
          </div>

          <p className="text-gray-700 mb-8">{book.description}</p>

          <div className="mt-auto">
            {isAuthenticated ? (
              <>
                {isBorrowed ? (
                  <div className="space-y-4">
                    {dueDate && (
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Clock size={16} className="mr-2" />
                        <span>
                          Due on{" "}
                          {dueDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <Button
                      onClick={onReturn}
                      disabled={isActionLoading}
                      className={cn(
                        "w-full md:w-auto btn-hover-effect",
                        isActionLoading && "opacity-70"
                      )}
                    >
                      {isActionLoading ? "Processing..." : "Return Book"}
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={onBorrow}
                    disabled={isActionLoading || !book.isAvailable}
                    className={cn(
                      "w-full md:w-auto btn-hover-effect",
                      isActionLoading && "opacity-70",
                      !book.isAvailable && "opacity-50"
                    )}
                  >
                    {isActionLoading
                      ? "Processing..."
                      : book.isAvailable
                      ? "Borrow Book"
                      : "Currently Unavailable"}
                  </Button>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Please log in to borrow books.</p>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = "/auth?mode=login"}
                >
                  Log in to continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton loader for book detail
const BookDetailSkeleton: React.FC = () => {
  return (
    <div className="glass-card rounded-xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Book cover skeleton */}
        <div className="bg-gray-50 p-6 flex items-center justify-center md:justify-start">
          <Skeleton className="w-full max-w-[250px] aspect-[3/4] rounded-lg" />
        </div>

        {/* Book details skeleton */}
        <div className="p-6 md:pr-8">
          <Skeleton className="h-6 w-24 mb-3" />
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />

          <Skeleton className="h-16 w-full rounded-lg mb-6" />

          <div className="space-y-2 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-10 w-32 mt-auto" />
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
