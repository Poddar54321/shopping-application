import { useState } from 'react';
import { AuthProvider } from './components/contexts/AuthContext';
import { ShoppingProvider } from './components/contexts/ShoppingContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductCatalog } from './components/pages/ProductCatalog';
import { ProductDetail } from './components/pages/ProductDetail';
import { ShoppingCart } from './components/pages/ShoppingCart';
import { LoginPage } from './components/pages/LoginPage';
import { CheckoutPage } from './components/pages/CheckoutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const handleNavigate = (page: string) => {
    if (page.includes('?')) {
      const [pageName, queryString] = page.split('?');
      const params = new URLSearchParams(queryString);
      const paramsObj: Record<string, string> = {};
      params.forEach((value, key) => {
        paramsObj[key] = value;
      });
      setCurrentPage(pageName);
      setPageParams(paramsObj);
    } else if (page.includes('/')) {
      const [pageName, ...pathParts] = page.split('/');
      setCurrentPage(pageName);
      setPageParams({ id: pathParts.join('/') });
    } else {
      setCurrentPage(page);
      setPageParams({});
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'catalog':
        return <ProductCatalog onNavigate={handleNavigate} />;
      case 'product':
        return <ProductDetail productId={pageParams.id} onNavigate={handleNavigate} />;
      case 'cart':
        return <ShoppingCart onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <UserDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'orders':
        return <OrdersPage onNavigate={handleNavigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Simple placeholder components for pages not yet implemented

  const UserDashboard = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
        <p className="text-gray-600 mb-4">User account management would be implemented here</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const AdminDashboard = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">Admin/seller management would be implemented here</p>
        <div className="space-x-4">
          <button 
            onClick={() => onNavigate('home')}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
          >
            Back to Home
          </button>
          <button 
            onClick={() => onNavigate('catalog')}
            className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/90"
          >
            View Products
          </button>
        </div>
      </div>
    </div>
  );

  const OrdersPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Order History</h1>
        <p className="text-gray-600 mb-4">Order tracking and history would be implemented here</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const WishlistPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Wishlist</h1>
        <p className="text-gray-600 mb-4">Saved items would be displayed here</p>
        <button 
          onClick={() => onNavigate('catalog')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  const ContactPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-4">Contact form and information would be implemented here</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const AboutPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">About StyleStore</h1>
        <p className="text-gray-600 mb-4">Company information and story would be displayed here</p>
        <button 
          onClick={() => onNavigate('home')}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  const showHeaderFooter = !['login'].includes(currentPage);

  return (
    <AuthProvider>
      <ShoppingProvider>
        <div className="min-h-screen flex flex-col">
          {showHeaderFooter && (
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
          )}
          
          <main className="flex-1">
            {renderPage()}
          </main>
          
          {showHeaderFooter && (
            <Footer onNavigate={handleNavigate} />
          )}
        </div>
      </ShoppingProvider>
    </AuthProvider>
  );
}