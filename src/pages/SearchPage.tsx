
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/utils/api';
import ProductList from '@/components/ProductList';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  // Fetch all products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });
  
  // Filter products by search query
  const filteredProducts = React.useMemo(() => {
    if (!query) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(
      product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }, [products, query]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">
        Search Results: "{query}"
      </h1>
      <p className="text-gray-500 mb-6">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
      </p>
      
      <ProductList 
        products={filteredProducts} 
        isLoading={isLoading} 
      />
      
      {!isLoading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-gray-500">
            Try different keywords or check for spelling errors.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
