
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookOpenText, Book, UserRound } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="px-6 pt-16 pb-24 md:pt-32 md:pb-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6">
                Discover, Borrow, and <span className="text-primary">Read</span> with Ease
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                A beautifully designed book lending library that puts the joy of reading at your fingertips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/books">
                  <Button size="lg" className="w-full sm:w-auto btn-hover-effect">
                    Browse Books
                  </Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/5 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Book library"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl font-medium text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our minimalist design philosophy makes borrowing books simple and delightful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8 animate-scale-in transition-all duration-300 hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Book size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Discover Books</h3>
              <p className="text-gray-600">
                Browse our carefully curated collection of books available for borrowing.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8 animate-scale-in transition-all duration-300 hover:shadow-md animation-delay-200">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <BookOpenText size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Borrow with Ease</h3>
              <p className="text-gray-600">
                Check out books with a single click and enjoy them for up to two weeks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8 animate-scale-in transition-all duration-300 hover:shadow-md animation-delay-400">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UserRound size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">Manage Your Books</h3>
              <p className="text-gray-600">
                Keep track of your borrowed books and return them when you're done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-gray-900 mb-6">
            Ready to start borrowing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Create your free account today and discover books to expand your horizons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Books
              </Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
