
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory } from '@/utils/api';
import ProductList from '@/components/ProductList';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'default');
  
  // Fetch products by category
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['category', category],
    queryFn: () => fetchProductsByCategory(category || '')
  });
  
  // Filter and sort products
  const filteredAndSortedProducts = React.useMemo(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        // Default sorting (no change)
        break;
    }
    
    return result;
  }, [products, searchQuery, sortOption]);
  
  // Update search params when filters change
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (sortOption !== 'default') params.set('sort', sortOption);
    setSearchParams(params);
  }, [searchQuery, sortOption, setSearchParams]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category?.replace(/%20/g, ' ')}
      </h1>
      
      {/* Filters and Sort */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Filter */}
          <div>
            <Label htmlFor="search" className="mb-1 block">Search</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Sort Options */}
          <div>
            <Label htmlFor="sort" className="mb-1 block">Sort By</Label>
            <Select 
              value={sortOption}
              onValueChange={(value) => setSortOption(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* Display Products */}
      <ProductList 
        products={filteredAndSortedProducts} 
        isLoading={isLoading} 
      />
      
      {/* No Results */}
      {!isLoading && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
