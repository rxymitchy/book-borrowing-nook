
import { Book, Borrowing, User, books, borrowings, users } from "@/data/mockData";
import { toast } from "sonner";

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Auth APIs
export const loginUser = async (email: string, password: string): Promise<User> => {
  await delay(800);
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error("Invalid credentials");
  }
  
  // In a real app, we would verify the password here
  return user;
};

export const registerUser = async (name: string, email: string, password: string): Promise<User> => {
  await delay(800);
  
  if (users.find(u => u.email === email)) {
    throw new Error("Email already in use");
  }
  
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
  };
  
  users.push(newUser);
  return newUser;
};

// Book APIs
export const fetchBooks = async (): Promise<Book[]> => {
  await delay(500);
  return [...books];
};

export const fetchBookById = async (id: string): Promise<Book> => {
  await delay(300);
  
  const book = books.find(book => book.id === id);
  
  if (!book) {
    throw new Error("Book not found");
  }
  
  return book;
};

// Borrowing APIs
export const borrowBook = async (bookId: string, userId: string): Promise<Borrowing> => {
  await delay(800);
  
  // Find the book
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    throw new Error("Book not found");
  }
  
  if (!books[bookIndex].isAvailable) {
    throw new Error("Book is already borrowed");
  }
  
  // Create new borrowing
  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + 14); // 2 weeks from now
  
  const newBorrowing: Borrowing = {
    id: `${borrowings.length + 1}`,
    bookId,
    userId,
    borrowDate,
    dueDate,
    returnDate: null,
  };
  
  // Update book availability
  books[bookIndex] = { ...books[bookIndex], isAvailable: false };
  
  // Add borrowing record
  borrowings.push(newBorrowing);
  
  return newBorrowing;
};

export const returnBook = async (bookId: string, userId: string): Promise<Borrowing> => {
  await delay(800);
  
  // Find the borrowing record
  const borrowingIndex = borrowings.findIndex(
    b => b.bookId === bookId && b.userId === userId && b.returnDate === null
  );
  
  if (borrowingIndex === -1) {
    throw new Error("Borrowing record not found");
  }
  
  // Update the borrowing record
  const updatedBorrowing = {
    ...borrowings[borrowingIndex],
    returnDate: new Date(),
  };
  
  borrowings[borrowingIndex] = updatedBorrowing;
  
  // Update book availability
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex !== -1) {
    books[bookIndex] = { ...books[bookIndex], isAvailable: true };
  }
  
  return updatedBorrowing;
};

export const fetchUserBorrowings = async (userId: string): Promise<Borrowing[]> => {
  await delay(500);
  
  return borrowings.filter(b => b.userId === userId && b.returnDate === null);
};

// Helper function to get user's borrowed books with full book data
export const fetchUserBorrowedBooks = async (userId: string): Promise<Book[]> => {
  await delay(600);
  
  const userBorrowings = borrowings
    .filter(b => b.userId === userId && b.returnDate === null)
    .map(b => b.bookId);
  
  return books.filter(book => userBorrowings.includes(book.id));
};

// Error handler
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    toast.error(error.message);
    return error.message;
  }
  
  const errorMessage = "An unexpected error occurred";
  toast.error(errorMessage);
  return errorMessage;
};
