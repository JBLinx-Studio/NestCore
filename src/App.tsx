
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import GuestAuth from './components/auth/GuestAuth';
import { guestAuthService, GuestUser } from './services/GuestAuthService';
import { localStorageService } from './services/LocalStorageService';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState<GuestUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize services
    localStorageService.init();
    guestAuthService.init();
    
    // Check for existing authentication
    const existingUser = guestAuthService.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
    }
    
    setIsLoading(false);
  }, []);

  const handleAuthenticated = (user: GuestUser) => {
    setCurrentUser(user);
  };

  const handleSignOut = () => {
    guestAuthService.signOut();
    setCurrentUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="h-8 w-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600">Loading NestCore...</p>
        </div>
      </div>
    );
  }

  // Show authentication if user is not logged in
  if (!currentUser) {
    return (
      <QueryClientProvider client={queryClient}>
        <GuestAuth onAuthenticated={handleAuthenticated} />
        <Toaster />
      </QueryClientProvider>
    );
  }

  // Show main app if user is authenticated
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index currentUser={currentUser} onSignOut={handleSignOut} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
