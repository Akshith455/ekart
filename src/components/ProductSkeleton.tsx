
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const ProductSkeleton: React.FC = () => {
  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <div className="h-48 p-4 flex items-center justify-center">
        <div className="w-full h-full bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 background-repeat" />
      </div>
      <CardContent className="flex-1 p-4 space-y-3">
        <div className="h-4 w-full bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 background-repeat rounded" />
        <div className="h-4 w-2/3 bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 background-repeat rounded" />
        <div className="h-6 w-1/3 bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 background-repeat rounded" />
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <div className="h-9 w-full bg-gray-200 animate-shimmer bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 background-repeat rounded" />
      </CardFooter>
    </Card>
  );
};

export default ProductSkeleton;
