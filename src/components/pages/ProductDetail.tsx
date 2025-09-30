import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Star, ShoppingCart, Heart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductDetailProps {
  productId: string;
  onNavigate: (page: string) => void;
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const { products, addToCart, toggleWishlist, wishlist } = useShopping();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
            <Button onClick={() => onNavigate('catalog')}>
              Browse All Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const relatedProducts = products.filter(p => 
    p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const images = [product.image]; // In a real app, products would have multiple images

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      alert('Please select a size');
      return;
    }
    if (product.colors.length > 1 && !selectedColor) {
      alert('Please select a color');
      return;
    }
    
    addToCart(product, quantity, selectedSize, selectedColor);
    alert('Product added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => onNavigate('catalog')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square relative">
                  <ImageWithFallback
                    src={images[activeImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart 
                      className={`h-6 w-6 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                    />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail images would go here in a real app */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>
              <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h3 className="font-semibold mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h3 className="font-semibold mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {product.stock} items in stock
                </p>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    handleAddToCart();
                    onNavigate('checkout');
                  }}
                  disabled={product.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <Separator />

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Category:</span>
                <span className="ml-2 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="font-semibold">Availability:</span>
                <span className="ml-2">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card 
                  key={relatedProduct.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate(`product/${relatedProduct.id}`)}
                >
                  <CardContent className="p-4">
                    <ImageWithFallback
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold">${relatedProduct.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}