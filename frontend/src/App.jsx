import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Login, ChatPage, LandingPage } from "./pages";
import "./App.css";

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show ChatPage if user is authenticated
  if (isAuthenticated) {
    return <ChatPage />;
  }

  // Show Login if user clicked "Get Started" or auth is needed
  if (showAuth) {
    return <Login onBack={() => setShowAuth(false)} />;
  }

  // Show Landing Page by default
  return <LandingPage onGetStarted={() => setShowAuth(true)} />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
              color: "#fff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
