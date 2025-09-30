import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Contact Us', page: 'contact' },
    { label: 'Size Guide', page: 'size-guide' },
    { label: 'FAQ', page: 'faq' }
  ];

  const policies = [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms & Conditions', page: 'terms' },
    { label: 'Return Policy', page: 'returns' },
    { label: 'Shipping Info', page: 'shipping' }
  ];

  const categories = [
    { label: 'Men\'s Fashion', page: 'catalog', filter: 'men' },
    { label: 'Women\'s Fashion', page: 'catalog', filter: 'women' },
    { label: 'Kids\' Clothing', page: 'catalog', filter: 'kids' },
    { label: 'Accessories', page: 'catalog', filter: 'accessories' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">StyleStore</h3>
            <p className="text-sm">
              Your one-stop destination for trendy and comfortable clothing. 
              We bring you the latest fashion at affordable prices.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  className="block text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Categories</h4>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => onNavigate(category.filter ? `${category.page}?category=${category.filter}` : category.page)}
                  className="block text-sm hover:text-white transition-colors"
                >
                  {category.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">support@stylestore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © 2024 StyleStore. All rights reserved.
            </div>
            <nav className="flex space-x-6">
              {policies.map((policy) => (
                <button
                  key={policy.label}
                  onClick={() => onNavigate(policy.page)}
                  className="text-sm hover:text-white transition-colors"
                >
                  {policy.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}