import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'kids' | 'accessories';
  description: string;
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  date: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShoppingContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: ShippingAddress) => string;
  updateOrderStatus: (orderId: string, status: 'pending' | 'shipped' | 'delivered') => void;
  addProduct: (product: Omit<Product, 'id' | 'reviews'>) => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

// Mock products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Black T-Shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1562572159-4efc207f5aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBtb2RlbHxlbnwxfHx8fDE3NTkyMDgwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'men',
    description: 'Premium quality cotton t-shirt perfect for everyday wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    stock: 50,
    rating: 4.5,
    reviews: [
      { id: '1', userId: '1', userName: 'John D.', rating: 5, comment: 'Great quality!', date: '2024-01-15' }
    ]
  },
  {
    id: '2',
    name: 'Casual Denim Jeans',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1631883958724-4aebab11b6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc1OTI0MzQ2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'men',
    description: 'Comfortable slim-fit denim jeans for modern lifestyle.',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Gray'],
    stock: 30,
    rating: 4.2,
    reviews: []
  },
  {
    id: '3',
    name: 'Elegant Summer Dress',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1700158777421-2fd9263cec53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTkxNDkzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'women',
    description: 'Flowing summer dress perfect for any occasion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Pink', 'Blue'],
    stock: 25,
    rating: 4.8,
    reviews: []
  },
  {
    id: '4',
    name: 'Kids Colorful Hoodie',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1601925240970-98447486fcdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2hpbGRyZW4lMjBjbG90aGluZ3xlbnwxfHx8fDE3NTkyMDg0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'kids',
    description: 'Soft and comfortable hoodie for active kids.',
    sizes: ['4Y', '6Y', '8Y', '10Y', '12Y'],
    colors: ['Red', 'Blue', 'Green', 'Yellow'],
    stock: 40,
    rating: 4.6,
    reviews: []
  },
  {
    id: '5',
    name: 'Designer Handbag',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1613896640137-bb5b31496315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBiYWd8ZW58MXx8fHwxNzU5MTc0Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'accessories',
    description: 'Elegant handbag perfect for work and evening events.',
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tan'],
    stock: 15,
    rating: 4.7,
    reviews: []
  }
];

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
      );
      
      if (existingItem) {
        return prev.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prev, { product, quantity, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prev => prev.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (shippingAddress: ShippingAddress): string => {
    const orderId = Date.now().toString();
    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: orderId,
      userId: '1', // Mock user ID
      items: [...cart],
      total,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress
    };
    
    setOrders(prev => [...prev, newOrder]);
    clearCart();
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: 'pending' | 'shipped' | 'delivered') => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'reviews'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      reviews: []
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product =>
      product.id === productId ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <ShoppingContext.Provider value={{
      products,
      cart,
      wishlist,
      orders,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      toggleWishlist,
      clearCart,
      placeOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
}