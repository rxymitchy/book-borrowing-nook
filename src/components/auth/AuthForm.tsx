
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpenText, Loader2 } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      navigate("/books");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-3">
            <BookOpenText size={28} className="text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-medium mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-gray-600 max-w-sm mx-auto">
          {mode === "login"
            ? "Enter your credentials to access your account"
            : "Fill out the form below to create your account"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        {mode === "register" && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              autoComplete="name"
              className="h-11"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
            className="h-11"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            className="h-11"
          />
        </div>
        
        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">{error}</div>
        )}
        
        <Button
          type="submit"
          className="w-full h-11 mt-2 btn-hover-effect"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {mode === "login" ? "Log in" : "Sign up"}
        </Button>
        
        <div className="text-center text-sm text-gray-500 mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <a
                href="/auth?mode=register"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="/auth?mode=login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </a>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
