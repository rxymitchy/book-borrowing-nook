
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Get mode from query params
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode") === "register" ? "register" : "login";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="max-w-md mx-auto px-6 py-16">
        <AuthForm mode={mode} />
      </div>
    </Layout>
  );
};

export default Auth;
