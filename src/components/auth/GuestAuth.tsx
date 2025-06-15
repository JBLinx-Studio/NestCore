
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { User, UserPlus, LogIn, Home } from 'lucide-react';
import { guestAuthService, GuestUser } from '../../services/GuestAuthService';
import { toast } from 'sonner';

interface GuestAuthProps {
  onAuthenticated: (user: GuestUser) => void;
}

export const GuestAuth: React.FC<GuestAuthProps> = ({ onAuthenticated }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Initialize auth service
    guestAuthService.init();
    
    // Check if user is already authenticated
    const currentUser = guestAuthService.getCurrentUser();
    if (currentUser) {
      onAuthenticated(currentUser);
    }
  }, [onAuthenticated]);

  const handleSignUp = async () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setIsLoading(true);
    try {
      const user = guestAuthService.signUpAsGuest(name.trim(), email.trim() || undefined);
      toast.success(`Welcome, ${user.name}! Your data will be saved locally on this device.`);
      onAuthenticated(user);
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      const user = guestAuthService.signIn(email.trim());
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        onAuthenticated(user);
      } else {
        toast.error('No account found with this email. Please sign up first.');
      }
    } catch (error) {
      toast.error('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickStart = () => {
    const guestName = `Guest User ${Math.floor(Math.random() * 1000)}`;
    setIsLoading(true);
    try {
      const user = guestAuthService.signUpAsGuest(guestName);
      toast.success(`Quick start activated! Welcome, ${user.name}`);
      onAuthenticated(user);
    } catch (error) {
      toast.error('Failed to start. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
            <Home className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">NestCore</h1>
            <p className="text-gray-600 mt-2">Professional Property Management</p>
          </div>
        </div>

        {/* Quick Start Option */}
        <Card className="border-2 border-dashed border-blue-200 bg-blue-50/50">
          <CardContent className="pt-6 text-center">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Start</h3>
            <p className="text-sm text-blue-700 mb-4">
              Jump right in with a temporary guest account
            </p>
            <Button 
              onClick={handleQuickStart}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <User className="h-4 w-4 mr-2" />
              Start as Guest
            </Button>
          </CardContent>
        </Card>

        {/* Sign Up / Sign In */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-center">
              {isSignUp 
                ? 'Create a local account to save your property data' 
                : 'Sign in to access your saved property data'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isSignUp ? 'signup' : 'signin'} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger 
                  value="signup" 
                  onClick={() => setIsSignUp(true)}
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </TabsTrigger>
                <TabsTrigger 
                  value="signin" 
                  onClick={() => setIsSignUp(false)}
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email (Optional)</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-gray-500">
                    Email helps you recover your account later
                  </p>
                </div>
                <Button 
                  onClick={handleSignUp}
                  disabled={isLoading || !name.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Button>
              </TabsContent>

              <TabsContent value="signin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <Input
                    id="email-signin"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button 
                  onClick={handleSignIn}
                  disabled={isLoading || !email.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Info */}
        <div className="text-center text-sm text-gray-500 space-y-2">
          <p>
            All data is stored locally on your device for privacy.
          </p>
          <p>
            No server registration required - works completely offline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestAuth;
