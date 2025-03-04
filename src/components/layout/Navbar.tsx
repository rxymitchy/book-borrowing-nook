
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpenText, User, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-primary font-medium transition-all duration-300"
        >
          <BookOpenText size={24} />
          <span className="text-xl font-medium">BookBorrow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname} label="Home" />
          <NavLink to="/books" currentPath={location.pathname} label="Books" />
          {isAuthenticated && (
            <NavLink to="/profile" currentPath={location.pathname} label="My Books" />
          )}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">{user?.name}</span>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <User size={16} />
                </div>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-900"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button variant="default" size="sm" className="btn-hover-effect">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md animate-fade-in">
          <nav className="flex flex-col py-4 px-6 space-y-3">
            <MobileNavLink to="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink to="/books" label="Books" onClick={() => setIsMobileMenuOpen(false)} />
            {isAuthenticated && (
              <MobileNavLink
                to="/profile"
                label="My Books"
                onClick={() => setIsMobileMenuOpen(false)}
              />
            )}
            {isAuthenticated ? (
              <>
                <div className="py-2 border-t border-gray-100 mt-2">
                  <div className="text-sm text-gray-600 mb-2">Signed in as {user?.name}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100 mt-2">
                <Link to="/auth?mode=login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link to="/auth?mode=register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="default" size="sm" className="w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

// Desktop Nav Link component
const NavLink: React.FC<{ to: string; currentPath: string; label: string }> = ({
  to,
  currentPath,
  label,
}) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={cn(
        "relative text-sm font-medium transition-colors duration-200 py-1",
        isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
};

// Mobile Nav Link component
const MobileNavLink: React.FC<{ to: string; label: string; onClick: () => void }> = ({
  to,
  label,
  onClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={cn(
        "px-2 py-2 text-sm font-medium rounded-md transition-colors",
        isActive ? "bg-primary/5 text-primary" : "text-gray-600 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navbar;
