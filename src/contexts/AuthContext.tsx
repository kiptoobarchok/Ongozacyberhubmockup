import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

export type UserRole = 'student' | 'mentor' | 'admin' | 'employer';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  profilePicture?: string;
  onboardingCompleted?: boolean;
  // Student fields
  phoneNumber?: string;
  gender?: string;
  location?: string;
  // Employer fields
  companyName?: string;
  industry?: string;
  businessRegNumber?: string;
  companySize?: string;
  website?: string;
  companyDescription?: string;
  logo?: string;
  physicalAddress?: string;
  // Mentor fields
  linkedinProfile?: string;
  twitterProfile?: string;
  educationalBackground?: string;
  professionalBackground?: string;
  mentorshipInterests?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  completeOnboarding: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount and seed default admin
  useEffect(() => {
    // Seed default admin account if not exists
    const users = JSON.parse(localStorage.getItem('ochUsers') || '[]');
    const passwords = JSON.parse(localStorage.getItem('ochPasswords') || '{}');
    
    if (!users.some((u: User) => u.role === 'admin')) {
      const adminUser: User = {
        id: 'admin-001',
        email: 'admin@och.edu',
        role: 'admin',
        fullName: 'OCH Administrator',
      };
      users.push(adminUser);
      passwords['admin@och.edu'] = 'admin123';
      localStorage.setItem('ochUsers', JSON.stringify(users));
      localStorage.setItem('ochPasswords', JSON.stringify(passwords));
    }

    // Load current user
    const storedUser = localStorage.getItem('ochUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('ochUser');
      }
    }
  }, []);

  const signup = async (userData: Partial<User>, password: string): Promise<boolean> => {
    try {
      // Get existing users from localStorage
      const existingUsers = JSON.parse(localStorage.getItem('ochUsers') || '[]');
      
      // Check if email already exists
      if (existingUsers.some((u: User) => u.email === userData.email)) {
        toast.error('Email already registered. Please login instead.');
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        role: userData.role || 'student',
        fullName: userData.fullName || '',
        ...userData,
      };

      // Store password separately (in real app, this would be hashed on backend)
      const passwords = JSON.parse(localStorage.getItem('ochPasswords') || '{}');
      passwords[userData.email || ''] = password;
      localStorage.setItem('ochPasswords', JSON.stringify(passwords));

      // Store user
      existingUsers.push(newUser);
      localStorage.setItem('ochUsers', JSON.stringify(existingUsers));

      // Set current user
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('ochUser', JSON.stringify(newUser));

      toast.success('Account created successfully! Welcome to OCH!');
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to create account. Please try again.');
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('ochUsers') || '[]');
      const passwords = JSON.parse(localStorage.getItem('ochPasswords') || '{}');

      const foundUser = users.find((u: User) => u.email === email);
      
      if (!foundUser) {
        toast.error('User not found. Please sign up first.');
        return false;
      }

      if (passwords[email] !== password) {
        toast.error('Incorrect password. Please try again.');
        return false;
      }

      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('ochUser', JSON.stringify(foundUser));

      toast.success(`Welcome back, ${foundUser.fullName}!`);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ochUser');
    toast.success('Logged out successfully. See you soon!');
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = { ...user, onboardingCompleted: true };
      setUser(updatedUser);
      localStorage.setItem('ochUser', JSON.stringify(updatedUser));

      // Update in users list
      const users = JSON.parse(localStorage.getItem('ochUsers') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('ochUsers', JSON.stringify(users));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, completeOnboarding, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
