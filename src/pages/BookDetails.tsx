
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import BookDetail from "@/components/books/BookDetail";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { fetchBookById, borrowBook, returnBook, fetchUserBorrowings } from "@/lib/api";
import { Book, Borrowing } from "@/data/mockData";
import { handleApiError } from "@/lib/api";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [borrowing, setBorrowing] = useState<Borrowing | null>(null);

  useEffect(() => {
    const loadBookDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const bookData = await fetchBookById(id);
        setBook(bookData);

        // If user is authenticated, check if they have borrowed this book
        if (isAuthenticated && user) {
          const userBorrowings = await fetchUserBorrowings(user.id);
          const currentBorrowing = userBorrowings.find(
            (b) => b.bookId === id && b.returnDate === null
          );

          if (currentBorrowing) {
            setBorrowing(currentBorrowing);
          }
        }
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBookDetails();
  }, [id, isAuthenticated, user]);

  const handleBorrowBook = async () => {
    if (!book || !isAuthenticated || !user) return;

    try {
      setIsActionLoading(true);
      const borrowingResult = await borrowBook(book.id, user.id);
      setBorrowing(borrowingResult);

      // Update book availability in local state
      setBook((prevBook) => {
        if (prevBook) {
          return { ...prevBook, isAvailable: false };
        }
        return prevBook;
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReturnBook = async () => {
    if (!book || !isAuthenticated || !user) return;

    try {
      setIsActionLoading(true);
      await returnBook(book.id, user.id);
      setBorrowing(null);

      // Update book availability in local state
      setBook((prevBook) => {
        if (prevBook) {
          return { ...prevBook, isAvailable: true };
        }
        return prevBook;
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-8 p-0 hover:bg-transparent"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to books</span>
        </Button>

        {/* Book detail component */}
        {isLoading || !book ? (
          <BookDetail isLoading={true} book={{} as Book} />
        ) : (
          <BookDetail
            book={book}
            isLoading={isLoading}
            onBorrow={handleBorrowBook}
            onReturn={handleReturnBook}
            isBorrowed={!!borrowing}
            dueDate={borrowing?.dueDate || null}
            isActionLoading={isActionLoading}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>
    </Layout>
  );
};

export default BookDetails;
