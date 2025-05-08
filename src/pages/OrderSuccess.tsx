
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const OrderSuccess: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Generate a random order ID
  const orderId = React.useMemo(() => {
    return `EK${Math.floor(100000000 + Math.random() * 900000000)}`;
  }, []);
  
  useEffect(() => {
    // If user is not authenticated, redirect to home
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle size={72} className="text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We've received your request and will process it shortly.
        </p>
        
        <div className="bg-gray-50 p-4 rounded mb-6">
          <div className="mb-2">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-semibold ml-2">{orderId}</span>
          </div>
          <div>
            <span className="text-gray-500">Estimated Delivery:</span>
            <span className="font-semibold ml-2">
              {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Link to="/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              View Orders
            </Button>
          </Link>
          <Link to="/" className="flex-1">
            <Button className="w-full bg-ekart-purple hover:bg-ekart-vivid-purple">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
