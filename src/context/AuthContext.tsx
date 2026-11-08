import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (
    name: string,
    email: string,
    password?: string,
    company?: string,
    role?: UserRole
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  allUsers: User[];
}

const DEFAULT_ADMIN: User = {
  id: 'admin-marcus',
  name: 'Marcus Kern',
  email: 'admin@valtkern.com',
  role: 'admin',
  title: 'Lead Atelier Director & Founder',
  company: 'Valt & Kern Atelier',
  phone: '+1 (212) 555-0198',
};

const DEFAULT_CLIENT: User = {
  id: 'client-julian',
  name: 'Julian Vance',
  email: 'julian@vanceloft.com',
  role: 'client',
  title: 'Principal Architect',
  company: 'Vance Loft Architects',
  phone: '+1 (415) 890-3421',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('vk_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_CLIENT;
      }
    }
    return DEFAULT_CLIENT;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('vk_all_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [DEFAULT_ADMIN, DEFAULT_CLIENT];
      }
    }
    return [DEFAULT_ADMIN, DEFAULT_CLIENT];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vk_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vk_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('vk_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const login = async (email: string): Promise<{ success: boolean; message?: string }> => {
    const trimmed = email.trim().toLowerCase();
    const found = allUsers.find((u) => u.email.toLowerCase() === trimmed);
    if (found) {
      setCurrentUser(found);
      return { success: true };
    }

    // If logging in with admin keyword
    if (trimmed.includes('admin')) {
      setCurrentUser(DEFAULT_ADMIN);
      return { success: true };
    }

    // Auto-create client if not found
    const newClient: User = {
      id: `client-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()),
      email: trimmed,
      role: 'client',
      company: 'Architectural Client',
    };
    setAllUsers((prev) => [...prev, newClient]);
    setCurrentUser(newClient);
    return { success: true };
  };

  const signup = async (
    name: string,
    email: string,
    _password?: string,
    company?: string,
    role: UserRole = 'client'
  ): Promise<{ success: boolean; message?: string }> => {
    const trimmed = email.trim().toLowerCase();
    const existing = allUsers.find((u) => u.email.toLowerCase() === trimmed);
    if (existing) {
      setCurrentUser(existing);
      return { success: true, message: 'Account exists, signed in directly.' };
    }

    const newUser: User = {
      id: `${role}-${Date.now()}`,
      name,
      email: trimmed,
      role,
      company: company || (role === 'admin' ? 'Valt & Kern Atelier' : 'Private Client'),
      title: role === 'admin' ? 'Atelier Director' : 'Client Designer',
    };

    setAllUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN);
    } else {
      setCurrentUser(DEFAULT_CLIENT);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        signup,
        logout,
        switchRole,
        allUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
