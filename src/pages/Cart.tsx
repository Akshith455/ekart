
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please login to proceed to checkout",
        variant: "destructive",
      });
    }
  };
  
  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add items to your cart to see them here</p>
          <Link to="/">
            <Button className="bg-ekart-purple hover:bg-ekart-vivid-purple">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({cart.length} items)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Cart Items List */}
        <div className="md:col-span-8">
          <div className="bg-white rounded-lg shadow">
            {cart.map(item => (
              <div key={item.id} className="p-4 border-b flex flex-col md:flex-row">
                <div className="flex-shrink-0 w-full md:w-24 h-24 mb-4 md:mb-0">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1 px-4">
                  <Link to={`/product/${item.id}`} className="font-semibold hover:text-ekart-purple">
                    {item.title}
                  </Link>
                  <p className="text-ekart-purple font-bold mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
                
                <div className="flex items-center mt-4 md:mt-0">
                  {/* Quantity Control */}
                  <div className="flex items-center border rounded">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2">{item.quantity || 1}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Remove Button */}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="p-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              
              <Link to="/">
                <Button 
                  variant="ghost"
                  className="flex items-center"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(cartTotal / 83)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>{formatPrice((cartTotal / 83) * 0.18)}</span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice((cartTotal / 83) * 1.18)}</span>
              </div>
            </div>
            
            {isAuthenticated ? (
              <Link to="/checkout">
                <Button 
                  className="w-full mt-6 bg-ekart-orange hover:bg-orange-600 flex items-center justify-center"
                >
                  Proceed to Checkout 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Link to="/login" onClick={handleCheckout}>
                <Button 
                  className="w-full mt-6 bg-ekart-orange hover:bg-orange-600 flex items-center justify-center"
                >
                  Login to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
