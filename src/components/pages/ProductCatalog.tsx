import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Star, ShoppingCart, Heart, Filter, Grid, List } from 'lucide-react';
import { useShopping, Product } from '../contexts/ShoppingContext';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProductCatalogProps {
  onNavigate: (page: string) => void;
}

export function ProductCatalog({ onNavigate }: ProductCatalogProps) {
  const { products, addToCart, toggleWishlist, wishlist } = useShopping();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'Kids' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const search = urlParams.get('search');
    
    if (category) {
      setSelectedCategory(category);
    }
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
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
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold">${product.price}</span>
            <Badge variant="secondary">{product.category}</Badge>
          </div>
        </div>
        <Button
          className="w-full"
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
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <div className="relative w-32 h-32 flex-shrink-0">
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-md"
              onClick={() => onNavigate(`product/${product.id}`)}
            />
          </div>
          <div className="flex-1" onClick={() => onNavigate(`product/${product.id}`)}>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
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
              <span className="text-xl font-bold">${product.price}</span>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart 
                className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
              />
            </button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold mb-2">Product Catalog</h1>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setPriceRange([0, 200]);
                  }}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => 
                  viewMode === 'grid' ? (
                    <ProductCard key={product.id} product={product} />
                  ) : (
                    <ProductListItem key={product.id} product={product} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}