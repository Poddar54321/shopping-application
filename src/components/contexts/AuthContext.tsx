import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: 'customer' | 'admin') => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'customer' as const },
  { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'customer' | 'admin' = 'customer') => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password && u.role === role);
    if (foundUser) {
      setUser({ id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const register = (name: string, email: string, password: string) => {
    // Mock registration - in real app, this would call backend
    const newUser = { id: Date.now().toString(), name, email, role: 'customer' as const };
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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