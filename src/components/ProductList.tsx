
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/context/CartContext';
import ProductSkeleton from './ProductSkeleton';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  title?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  products, 
  isLoading = false,
  title
}) => {
  return (
    <div className="my-6">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          // Show skeletons when loading
          Array(8).fill(0).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : (
          // Show actual products
          products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      
      {!isLoading && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
