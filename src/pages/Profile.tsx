
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import UserProfile from "@/components/profile/UserProfile";
import { useAuth } from "@/context/AuthContext";
import { fetchUserBorrowedBooks, fetchBookById, returnBook } from "@/lib/api";
import { Book, Borrowing } from "@/data/mockData";
import { handleApiError } from "@/lib/api";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [borrowedBooks, setBorrowedBooks] = useState<
    { book: Book; dueDate: Date }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReturnLoading, setIsReturnLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/auth?mode=login");
    }
  }, [isAuthenticated, navigate, isLoading]);

  // Load user's borrowed books
  useEffect(() => {
    const loadBorrowedBooks = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        
        // Fetch the user's borrowings
        const borrowings = await fetchUserBorrowedBooks(user.id);
        
        // For each book, fetch full details and due date
        const borrowingsWithDueDates = await Promise.all(
          borrowings.map(async (book) => {
            const fetchedBorrowings = await fetchUserBorrowings(user.id);
            const borrowing = fetchedBorrowings.find(
              (b) => b.bookId === book.id && b.returnDate === null
            );
            
            return {
              book,
              dueDate: borrowing ? borrowing.dueDate : new Date(),
            };
          })
        );
        
        setBorrowedBooks(borrowingsWithDueDates);
      } catch (error) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBorrowedBooks();
  }, [user]);

  const handleReturnBook = async (bookId: string) => {
    if (!user) return;

    try {
      setIsReturnLoading(true);
      await returnBook(bookId, user.id);
      
      // Remove the returned book from state
      setBorrowedBooks((prev) => 
        prev.filter((item) => item.book.id !== bookId)
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsReturnLoading(false);
    }
  };

  // Helper function for user borrowings
  const fetchUserBorrowings = async (userId: string): Promise<Borrowing[]> => {
    try {
      // Simulate API call - in a real app, this would fetch from a real API
      const { borrowings } = await import("@/data/mockData");
      return borrowings.filter(b => b.userId === userId && b.returnDate === null);
    } catch (error) {
      console.error("Error fetching borrowings:", error);
      return [];
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-medium text-gray-900 mb-8">My Profile</h1>

        {isAuthenticated && user ? (
          <UserProfile
            user={user}
            borrowedBooks={borrowedBooks}
            isLoading={isLoading}
            onReturnBook={handleReturnBook}
            isReturnLoading={isReturnLoading}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              Please log in to view your profile.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
