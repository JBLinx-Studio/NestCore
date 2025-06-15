
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
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Initialize services
    localStorageService.init();
    guestAuthService.init();
    
    // Check for existing authentication
    const existingUser = guestAuthService.getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
      setShowAuth(false);
    } else {
      setShowAuth(true);
    }
    
    setIsLoading(false);
  }, []);

  const handleAuthenticated = (user: GuestUser) => {
    setCurrentUser(user);
    setShowAuth(false);
  };

  const handleSignOut = () => {
    guestAuthService.signOut();
    setCurrentUser(null);
    setShowAuth(true);
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

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background relative">
          {/* Main App - always rendered */}
          <div className={showAuth ? 'blur-md brightness-50 pointer-events-none transition-all duration-500' : 'transition-all duration-500'}>
            <Routes>
              <Route path="/" element={
                currentUser ? 
                <Index currentUser={currentUser} onSignOut={handleSignOut} /> :
                <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          
          {/* Cinematic Auth Overlay */}
          {showAuth && (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95 backdrop-blur-xl">
              {/* Additional cinematic overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/20 to-black/60"></div>
              
              <GuestAuth onAuthenticated={handleAuthenticated} isOpen={showAuth} />
            </div>
          )}
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
