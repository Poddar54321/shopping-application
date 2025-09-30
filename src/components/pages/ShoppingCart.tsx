import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ShoppingCartProps {
  onNavigate: (page: string) => void;
}

export function ShoppingCart({ onNavigate }: ShoppingCartProps) {
  const { cart, updateCartQuantity, removeFromCart } = useShopping();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => onNavigate('catalog')} size="lg">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('catalog')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0">
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded-lg cursor-pointer"
                        onClick={() => onNavigate(`product/${item.product.id}`)}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-lg mb-2 cursor-pointer hover:text-primary"
                        onClick={() => onNavigate(`product/${item.product.id}`)}
                      >
                        {item.product.name}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.selectedSize && (
                          <p>Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p>Color: {item.selectedColor}</p>
                        )}
                        <p>Price: ${item.product.price}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-center space-y-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Item Total */}
                      <div className="text-lg font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {subtotal < 100 && (
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => onNavigate('checkout')}
                >
                  Proceed to Checkout
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onNavigate('catalog')}
                >
                  Continue Shopping
                </Button>

                {/* Security Badge */}
                <div className="text-center text-sm text-gray-600 pt-4">
                  <p>🔒 Secure checkout with SSL encryption</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recently Viewed or Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="text-center text-gray-600">
            <p>Recommended products based on your cart items would appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}