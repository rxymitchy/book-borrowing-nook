
import React from "react";
import { User } from "@/data/mockData";
import { Book } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpenText, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

interface UserProfileProps {
  user: User;
  borrowedBooks: {
    book: Book;
    dueDate: Date;
  }[];
  isLoading: boolean;
  onReturnBook: (bookId: string) => void;
  isReturnLoading: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  borrowedBooks,
  isLoading,
  onReturnBook,
  isReturnLoading,
}) => {
  const returnLoadingBook = isReturnLoading ? borrowedBooks[0]?.book.id : null;

  if (isLoading) {
    return <UserProfileSkeleton />;
  }

  return (
    <div className="animate-fade-in">
      {/* User Info Card */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-medium text-primary">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-medium mb-1 text-center sm:text-left">
              {user.name}
            </h1>
            <p className="text-gray-600 mb-4 text-center sm:text-left">
              {user.email}
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <BookOpenText size={16} className="mr-2" />
              <span>
                {borrowedBooks.length} book{borrowedBooks.length !== 1 ? "s" : ""} borrowed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Borrowed Books Section */}
      <h2 className="text-xl font-medium mb-4">Your Borrowed Books</h2>

      {borrowedBooks.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <BookOpenText size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No books borrowed yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't borrowed any books yet. Explore our collection and find something to read!
            </p>
            <Button
              onClick={() => window.location.href = "/books"}
              className="btn-hover-effect"
            >
              Browse Books
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {borrowedBooks.map(({ book, dueDate }) => (
            <div
              key={book.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col sm:flex-row border border-gray-100"
            >
              {/* Book cover (smaller on mobile) */}
              <div className="w-full sm:w-32 h-40 sm:h-auto flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book details and return button */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900 mb-1">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{book.author}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock size={14} className="mr-1.5" />
                    <span>
                      Due: {format(dueDate, "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onReturnBook(book.id)}
                  disabled={isReturnLoading && returnLoadingBook === book.id}
                  className="self-start"
                >
                  {isReturnLoading && returnLoadingBook === book.id
                    ? "Returning..."
                    : "Return Book"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Skeleton loader for user profile
const UserProfileSkeleton: React.FC = () => {
  return (
    <div>
      {/* User Info Card Skeleton */}
      <div className="glass-card rounded-xl p-6 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
          <div className="w-full">
            <Skeleton className="h-7 w-48 mx-auto sm:mx-0 mb-2" />
            <Skeleton className="h-5 w-64 mx-auto sm:mx-0 mb-4" />
            <Skeleton className="h-5 w-32 mx-auto sm:mx-0" />
          </div>
        </div>
      </div>

      {/* Borrowed Books Section Skeleton */}
      <Skeleton className="h-8 w-48 mb-4" />

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="glass-card rounded-xl overflow-hidden flex flex-col sm:flex-row animate-pulse"
          >
            <Skeleton className="w-full sm:w-32 h-40 sm:h-auto flex-shrink-0" />
            <div className="p-4 flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-3" />
              <Skeleton className="h-4 w-36 mb-4" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
