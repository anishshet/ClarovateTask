import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types/auth';
import { userService } from '../services/userService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = {
  admin: { username: 'admin', password: 'admin123', role: 'admin' as const },
  user: { username: 'user', password: 'user123', role: 'user' as const },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const decoded = userService.verifyToken();
    return decoded ? { username: decoded.username, role: decoded.role } : null;
  });

  useEffect(() => {
    userService.setupInactivityListeners();
  }, []);

  const login = (username: string, password: string) => {
    const mockUser = Object.values(MOCK_USERS).find(
      (u) => u.username === username && u.password === password
    );

    if (mockUser) {
      const { password: _, ...userWithoutPassword } = mockUser;
      const token = userService.generateToken(mockUser.username, mockUser.role);
      userService.setToken(token);
      setUser(userWithoutPassword);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    userService.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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