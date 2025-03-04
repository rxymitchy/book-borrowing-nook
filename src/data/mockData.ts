
// Mock User Data
export interface User {
  id: string;
  name: string;
  email: string;
}

// Mock Book Data
export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  description: string;
  isAvailable: boolean;
}

// Mock Borrowing Data
export interface Borrowing {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate: Date | null;
}

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com"
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie@example.com"
  }
];

// Mock Books
export const books: Book[] = [
  {
    id: "1",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    isbn: "978-0465050659",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "In this entertaining and insightful analysis, cognitive scientist Don Norman hails excellence of design as the most important key to regaining the competitive edge in influencing consumer behavior.",
    isAvailable: true
  },
  {
    id: "2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "978-0374533557",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think.",
    isAvailable: false
  },
  {
    id: "3",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    isAvailable: true
  },
  {
    id: "4",
    title: "The Innovators",
    author: "Walter Isaacson",
    isbn: "978-1476708706",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "The Innovators is Walter Isaacson's revealing story of the people who created the computer and the Internet. It is destined to be the standard history of the digital revolution and an indispensable guide to how innovation really happens.",
    isAvailable: true
  },
  {
    id: "5",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    coverImage: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "From a renowned historian comes a groundbreaking narrative of humanity's creation and evolution—a #1 international bestseller—that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be 'human.'",
    isAvailable: true
  },
  {
    id: "6",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    isbn: "978-1451648539",
    coverImage: "https://images.unsplash.com/photo-1541323181484-d3753f4c0c9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    description: "Based on more than forty interviews with Jobs conducted over two years—as well as interviews with more than a hundred family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur.",
    isAvailable: false
  }
];

// Mock Borrowings
export const borrowings: Borrowing[] = [
  {
    id: "1",
    bookId: "2",
    userId: "1",
    borrowDate: new Date('2023-05-01'),
    dueDate: new Date('2023-05-15'),
    returnDate: null
  },
  {
    id: "2",
    bookId: "6",
    userId: "1",
    borrowDate: new Date('2023-05-10'),
    dueDate: new Date('2023-05-24'),
    returnDate: null
  }
];

// Helper function to get a user's borrowed books
export const getUserBorrowedBooks = (userId: string): Book[] => {
  const userBorrowings = borrowings
    .filter(b => b.userId === userId && b.returnDate === null)
    .map(b => b.bookId);
  
  return books.filter(book => userBorrowings.includes(book.id));
};

// Helper function to get all available books
export const getAvailableBooks = (): Book[] => {
  return books.filter(book => book.isAvailable);
};
