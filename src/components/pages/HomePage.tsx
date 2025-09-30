import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { products, addToCart, toggleWishlist, wishlist } = useShopping();
  
  const featuredProducts = products.slice(0, 4);
  const categories = [
    {
      name: 'Men',
      image: 'https://images.unsplash.com/photo-1631883958724-4aebab11b6a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjB3ZWFyfGVufDF8fHx8MTc1OTI0MzQ2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      filter: 'men'
    },
    {
      name: 'Women',
      image: 'https://images.unsplash.com/photo-1700158777421-2fd9263cec53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NTkxNDkzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      filter: 'women'
    },
    {
      name: 'Kids',
      image: 'https://images.unsplash.com/photo-1601925240970-98447486fcdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwY2hpbGRyZW4lMjBjbG90aGluZ3xlbnwxfHx8fDE3NTkyMDg0MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      filter: 'kids'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1613896640137-bb5b31496315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYWNjZXNzb3JpZXMlMjBiYWd8ZW58MXx8fHwxNzU5MTc0Mzk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      filter: 'accessories'
    }
  ];

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative bg-cover bg-center h-96 md:h-[500px] flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1464854860390-e95991b46441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwYmFubmVyJTIwaGVyb3xlbnwxfHx8fDE3NTkyMjI4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      >
        <div className="text-center space-y-6 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            New Collection 2024
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Discover the latest trends in fashion. Premium quality at unbeatable prices.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg" 
              onClick={() => onNavigate('catalog')}
              className="bg-white text-black hover:bg-gray-100"
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('catalog?category=women')}
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Women's Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card 
              key={category.name} 
              className="cursor-pointer group overflow-hidden hover:shadow-lg transition-shadow"
              onClick={() => onNavigate(`catalog?category=${category.filter}`)}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our hand-picked selection of trending products.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                      onClick={() => onNavigate(`product/${product.id}`)}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart 
                        className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </button>
                  </div>
                  <div onClick={() => onNavigate(`product/${product.id}`)}>
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.rating})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price}</span>
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('catalog')}
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div 
                className="relative h-64 bg-cover bg-center flex items-center justify-center text-white"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1464854860390-e95991b46441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc2FsZSUyMGJhbm5lcnxlbnwxfHx8fDE3NTkyNDM1NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
                }}
              >
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-bold">Limited Time Offer</h3>
                  <p className="text-xl">Get 30% off on all summer collection</p>
                  <Button 
                    size="lg"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => onNavigate('catalog?sale=true')}
                  >
                    Shop Sale
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-lg mb-8">
            Subscribe to our newsletter and get the latest updates on new arrivals and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-black"
            />
            <Button className="bg-white text-primary hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}