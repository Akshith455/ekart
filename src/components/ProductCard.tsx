
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/api';
import { useCart, Product } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="h-48 p-4 flex items-center justify-center bg-white">
          <img 
            src={product.image} 
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <CardContent className="flex-1 p-4">
          <h3 className="font-medium text-sm line-clamp-2 mb-1">{product.title}</h3>
          <p className="text-ekart-purple font-bold">{formatPrice(product.price)}</p>
          {product.rating && (
            <div className="flex items-center mt-1">
              <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                {product.rating.rate}★
              </div>
              <span className="text-gray-500 text-xs ml-2">({product.rating.count})</span>
            </div>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-3 pt-0">
        <Button 
          className="w-full bg-ekart-orange hover:bg-orange-600"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
