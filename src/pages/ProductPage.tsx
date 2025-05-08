
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, formatPrice } from '@/utils/api';
import { useCart } from '@/context/CartContext';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import ProductList from '@/components/ProductList';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id)
  });
  
  // Also fetch related products
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['relatedProducts', product?.category],
    queryFn: async () => {
      if (product?.category) {
        const response = await fetch(`https://fakestoreapi.com/products/category/${product.category}`);
        const data = await response.json();
        return data.filter((p: any) => p.id !== product.id).slice(0, 4);
      }
      return [];
    },
    enabled: !!product?.category,
  });
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  if (isLoading) return <Loader />;
  
  if (error) return <div className="text-center py-10">Error loading product</div>;
  
  if (!product) return <div className="text-center py-10">Product not found</div>;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <Card>
            <CardContent className="flex items-center justify-center p-8 h-[400px]">
              <img 
                src={product.image} 
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          
          {product.rating && (
            <div className="flex items-center mb-4">
              <div className="bg-green-600 text-white px-2 py-0.5 rounded flex items-center">
                {product.rating.rate}★
              </div>
              <span className="text-gray-500 ml-2">({product.rating.count} reviews)</span>
            </div>
          )}
          
          <div className="text-2xl text-ekart-purple font-bold mb-4">
            {formatPrice(product.price)}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <span className="mr-4">Quantity:</span>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={incrementQuantity}
              >
                +
              </Button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            className="bg-ekart-orange hover:bg-orange-600 text-white w-full md:w-auto py-6"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </Button>
          
          {/* Delivery Info */}
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">Free Delivery</h3>
            <p className="text-gray-600 text-sm">
              Usually dispatched within 2-4 business days
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">You might also like</h2>
          <ProductList products={relatedProducts} />
        </section>
      )}
    </div>
  );
};

export default ProductPage;
