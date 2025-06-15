
import { localStorageService, UserProfile } from './LocalStorageService';

interface GuestUser {
  id: string;
  name: string;
  email: string;
  isGuest: boolean;
  preferences: {
    currency: string;
    units: string;
    defaultLocation: string;
  };
  createdAt: string;
  lastLogin: string;
}

class GuestAuthService {
  private readonly AUTH_KEY = 'nestcore-auth';
  private currentUser: GuestUser | null = null;

  // Initialize auth service
  init(): void {
    const savedAuth = this.getSavedAuth();
    if (savedAuth) {
      this.currentUser = savedAuth;
    }
  }

  // Get saved authentication
  private getSavedAuth(): GuestUser | null {
    try {
      const data = localStorage.getItem(this.AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error reading auth from localStorage:', error);
      return null;
    }
  }

  // Save authentication
  private saveAuth(user: GuestUser): void {
    try {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth to localStorage:', error);
    }
  }

  // Generate guest ID
  private generateGuestId(): string {
    return `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Sign up as guest
  signUpAsGuest(name: string, email?: string): GuestUser {
    const guestUser: GuestUser = {
      id: this.generateGuestId(),
      name: name || 'Guest User',
      email: email || `guest_${Date.now()}@local.device`,
      isGuest: true,
      preferences: {
        currency: 'ZAR',
        units: 'metric',
        defaultLocation: 'South Africa'
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    this.currentUser = guestUser;
    this.saveAuth(guestUser);
    
    // Also save to profile in storage service
    const profile: UserProfile = {
      id: guestUser.id,
      name: guestUser.name,
      email: guestUser.email,
      preferences: guestUser.preferences,
      createdAt: guestUser.createdAt,
      lastLogin: guestUser.lastLogin
    };
    localStorageService.saveUserProfile(profile);

    return guestUser;
  }

  // Sign in existing guest
  signIn(email: string): GuestUser | null {
    const profile = localStorageService.getUserProfile();
    if (profile && profile.email === email) {
      const guestUser: GuestUser = {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        isGuest: true,
        preferences: profile.preferences,
        createdAt: profile.createdAt,
        lastLogin: new Date().toISOString()
      };
      
      this.currentUser = guestUser;
      this.saveAuth(guestUser);
      
      // Update last login
      localStorageService.saveUserProfile({
        ...profile,
        lastLogin: guestUser.lastLogin
      });
      
      return guestUser;
    }
    return null;
  }

  // Get current user
  getCurrentUser(): GuestUser | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Update user preferences
  updatePreferences(preferences: Partial<GuestUser['preferences']>): void {
    if (!this.currentUser) return;
    
    this.currentUser.preferences = { ...this.currentUser.preferences, ...preferences };
    this.saveAuth(this.currentUser);
    
    // Update in storage service too
    const profile = localStorageService.getUserProfile();
    if (profile) {
      localStorageService.saveUserProfile({
        ...profile,
        preferences: this.currentUser.preferences
      });
    }
  }

  // Update user profile
  updateProfile(updates: { name?: string; email?: string }): void {
    if (!this.currentUser) return;
    
    if (updates.name) this.currentUser.name = updates.name;
    if (updates.email) this.currentUser.email = updates.email;
    
    this.saveAuth(this.currentUser);
    
    // Update in storage service too
    const profile = localStorageService.getUserProfile();
    if (profile) {
      localStorageService.saveUserProfile({
        ...profile,
        name: this.currentUser.name,
        email: this.currentUser.email
      });
    }
  }

  // Sign out
  signOut(): void {
    this.currentUser = null;
    localStorage.removeItem(this.AUTH_KEY);
  }

  // Delete account and all data
  deleteAccount(): void {
    this.signOut();
    localStorageService.clearAllData();
  }
}

export const guestAuthService = new GuestAuthService();
export type { GuestUser };
