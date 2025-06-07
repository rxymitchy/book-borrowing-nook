# Book Lending Library Application

A beautifully designed book lending library application that allows users to discover, borrow, and manage books with ease.

## 📖 Project Overview

This application is a modern, user-friendly book lending platform built with React, TypeScript, and TailwindCSS. It provides an intuitive interface for users to browse available books, borrow them, and manage their borrowed books with a clean, minimalist design philosophy.

## ✨ Features

- **📚 Browse Books**: Explore our curated collection of books with advanced search and filtering capabilities
- **📖 Book Details**: View comprehensive information about each book including title, author, description, cover image, and real-time availability status
- **🔐 User Authentication**: Secure account creation and login system to enable borrowing functionality
- **📅 Borrow System**: Simple one-click borrowing process with automatic due date tracking (2-week lending period)
- **👤 User Profile**: Personal dashboard to manage your borrowed books, view borrowing history, and track return dates
- **📱 Responsive Design**: Fully responsive interface that works seamlessly on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Clean, minimalist design with smooth animations and intuitive navigation

## 🚀 Live Demo

**URL**: https://book-borrowing-nook.lovable.app/

## 🛠️ Technical Stack

This project leverages modern web technologies for optimal performance and developer experience:

- **React 18**: Latest version of React with hooks and modern patterns
- **TypeScript**: Static type checking for enhanced code quality and developer experience
- **Vite**: Lightning-fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework for rapid, consistent styling
- **shadcn-ui**: High-quality, accessible UI components built with Radix UI
- **React Router**: Client-side routing for seamless navigation
- **TanStack Query**: Powerful data fetching and state management
- **Lucide React**: Beautiful, customizable icons
- **Recharts**: Responsive charting library for data visualization

## 📋 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Quick Start Guide

1. **Browse the Application**: Visit the live demo to explore the interface
2. **Create an Account**: Sign up to unlock borrowing capabilities
3. **Discover Books**: Use the Books page to find your next great read
4. **Borrow & Read**: Click on any available book to borrow it instantly
5. **Manage Your Library**: Visit your profile to track borrowed books and due dates

## 🏗️ Development

### Option 1: Use Lovable (Recommended)

The easiest way to modify this project:

1. Visit the [Lovable Project](https://lovable.dev/projects/49733b47-aab0-4aac-9e9f-302308bd72fe)
2. Start making changes using natural language prompts
3. See changes reflected immediately in the preview
4. All changes are automatically committed to the connected GitHub repository

### Option 2: Local Development

If you prefer working with your own IDE:

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev

# Open your browser to http://localhost:5173
```

### Option 3: GitHub Codespaces

For cloud-based development:

1. Navigate to the repository on GitHub
2. Click the "Code" button → "Codespaces" tab
3. Click "New codespace"
4. Start coding directly in your browser

### Option 4: Direct GitHub Editing

For quick fixes:

1. Navigate to the file you want to edit on GitHub
2. Click the pencil icon (Edit button)
3. Make your changes and commit

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── books/          # Book-related components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/             # shadcn-ui components
├── pages/              # Main page components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API calls
└── data/               # Mock data and type definitions
```

## 🎨 Design System

The application uses a carefully crafted design system defined in:
- `src/index.css` - CSS custom properties and global styles
- `tailwind.config.ts` - Tailwind configuration and theme tokens

Key design principles:
- **Minimalist**: Clean, uncluttered interface focusing on content
- **Accessible**: WCAG compliant with proper contrast and keyboard navigation
- **Responsive**: Mobile-first design that scales beautifully
- **Consistent**: Unified spacing, typography, and color system

## 🚀 Deployment

### Deploy with Lovable

1. Open the [Lovable Project](https://lovable.dev/projects/49733b47-aab0-4aac-9e9f-302308bd72fe)
2. Click "Share" → "Publish"
3. Your app will be live instantly with a custom URL

### Deploy Elsewhere

The codebase is standard React and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

```bash
# Build for production
npm run build

# The dist/ folder contains your deployable assets
```

## 🌐 Custom Domain

- **Lovable Hosting**: Paid plans support custom domains via Project Settings
- **External Hosting**: Deploy the built application to any hosting service with your domain

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [shadcn-ui Components](https://ui.shadcn.com/)
- [Lovable Documentation](https://docs.lovable.dev/)

## 🆘 Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Documentation**: Visit [Lovable Docs](https://docs.lovable.dev/)
- **Community**: Join the [Lovable Discord](https://discord.gg/lovable)

## 📄 License

This project is open source and available under the MIT License.

---

Built with ❤️ using [Lovable](https://lovable.dev) - The AI-powered web application editor
