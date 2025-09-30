import { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { useShopping } from '../contexts/ShoppingContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { cart, wishlist } = useShopping();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'Shop', page: 'catalog' },
    { label: 'Men', page: 'catalog', filter: 'men' },
    { label: 'Women', page: 'catalog', filter: 'women' },
    { label: 'Kids', page: 'catalog', filter: 'kids' },
    { label: 'Accessories', page: 'catalog', filter: 'accessories' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate(`catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-primary"
            >
              StyleStore
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.filter ? `${item.page}?category=${item.filter}` : item.page)}
                className={`${
                  currentPage === item.page ? 'text-primary' : 'text-gray-700'
                } hover:text-primary transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-2 text-gray-700 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-primary transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button
                    onClick={() => onNavigate(user.role === 'admin' ? 'admin-dashboard' : 'dashboard')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {user.role === 'admin' ? 'Admin Dashboard' : 'My Account'}
                  </button>
                  <button
                    onClick={() => onNavigate('orders')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </button>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => onNavigate('login')}
                variant="outline"
                size="sm"
              >
                Login
              </Button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.filter ? `${item.page}?category=${item.filter}` : item.page);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}