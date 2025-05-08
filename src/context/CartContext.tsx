
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity?: number;
  rating?: {
    rate: number;
    count: number;
  };
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Load cart from localStorage on initial render
    const storedCart = localStorage.getItem('eKartCart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever cart changes
    localStorage.setItem('eKartCart', JSON.stringify(cart));
    
    // Calculate total price and item count
    const total = cart.reduce((sum, item) => sum + (item.price * 83 * (item.quantity || 1)), 0);
    setCartTotal(total);
    
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setItemCount(count);
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prevCart => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingProductIndex >= 0) {
        // If product exists, update quantity
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingProductIndex].quantity || 1;
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: currentQuantity + quantity
        };
        
        toast({
          title: "Product updated in cart",
          description: `${product.title} quantity updated to ${currentQuantity + quantity}`,
        });
        
        return updatedCart;
      } else {
        // If product doesn't exist, add it with quantity
        const newProduct = {
          ...product,
          quantity: quantity
        };
        
        toast({
          title: "Product added to cart",
          description: `${product.title} added to your cart`,
        });
        
        return [...prevCart, newProduct];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const productToRemove = prevCart.find(item => item.id === productId);
      
      if (productToRemove) {
        toast({
          title: "Product removed",
          description: `${productToRemove.title} removed from cart`,
        });
      }
      
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId
          ? { ...item, quantity: quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        cartTotal,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
