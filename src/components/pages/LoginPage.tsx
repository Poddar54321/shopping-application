import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, register } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleLogin = (e: React.FormEvent, role: 'customer' | 'admin' = 'customer') => {
    e.preventDefault();
    setLoginError('');
    
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const success = login(loginForm.email, loginForm.password, role);
    if (success) {
      onNavigate(role === 'admin' ? 'admin-dashboard' : 'home');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Please fill in all fields');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters');
      return;
    }

    const success = register(registerForm.name, registerForm.email, registerForm.password);
    if (success) {
      onNavigate('home');
    } else {
      setRegisterError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">StyleStore</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to your account.</p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="admin">Admin/Seller</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Login</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={(e) => handleLogin(e, 'customer')} className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        />
                      </div>
                      {loginError && (
                        <p className="text-red-600 text-sm">{loginError}</p>
                      )}
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </form>

                    <div className="mt-4">
                      <Separator />
                      <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                          Demo credentials: john@example.com / password123
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="john@example.com"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          placeholder="Create a password"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          placeholder="Confirm your password"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        />
                      </div>
                      {registerError && (
                        <p className="text-red-600 text-sm">{registerError}</p>
                      )}
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin/Seller Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@example.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter admin password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                  {loginError && (
                    <p className="text-red-600 text-sm">{loginError}</p>
                  )}
                  <Button type="submit" className="w-full">
                    Admin Sign In
                  </Button>
                </form>

                <div className="mt-4">
                  <Separator />
                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                      Demo admin: admin@example.com / admin123
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
}