import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useShopping, ShippingAddress } from '../contexts/ShoppingContext';
import { useAuth } from '../contexts/AuthContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CheckoutPageProps {
  onNavigate: (page: string) => void;
}

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { cart, placeOrder, clearCart } = useShopping();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingAddress>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
            <p className="text-gray-600 mb-6">Your cart is empty. Add some items first!</p>
            <Button onClick={() => onNavigate('catalog')} size="lg">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSubmitOrder = async () => {
    if (!user) {
      onNavigate('login');
      return;
    }

    // Validate shipping info
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'postalCode'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof ShippingAddress]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const orderId = placeOrder(shippingInfo);
      setIsProcessing(false);
      alert(`Order placed successfully! Order ID: ${orderId}`);
      onNavigate('orders');
    } catch (error) {
      setIsProcessing(false);
      alert('Order failed. Please try again.');
    }
  };

  const steps = [
    { id: 1, title: 'Shipping', icon: Truck },
    { id: 2, title: 'Payment', icon: CreditCard },
    { id: 3, title: 'Review', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('cart')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 ${currentStep >= step.id ? 'text-primary font-semibold' : 'text-gray-600'}`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-4 ${
                  currentStep > step.id ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={shippingInfo.name}
                        onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={shippingInfo.country}
                        onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <Button onClick={() => setCurrentStep(2)} className="w-full mt-6">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span>Credit/Debit Card</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay securely with your card</p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-5 w-5" />
                          <span>Cash on Delivery</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Pay when your order arrives</p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          className="bg-white"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Back to Shipping
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Review</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex space-x-4">
                          <ImageWithFallback
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-gray-600">
                              {item.selectedSize && `Size: ${item.selectedSize}`}
                              {item.selectedColor && ` | Color: ${item.selectedColor}`}
                            </p>
                            <p className="text-sm">Qty: {item.quantity} × ${item.product.price}</p>
                          </div>
                          <div className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Order Notes */}
                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special instructions for your order..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back to Payment
                    </Button>
                    <Button 
                      onClick={handleSubmitOrder} 
                      className="flex-1"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-600 pt-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>Secure SSL encrypted checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}