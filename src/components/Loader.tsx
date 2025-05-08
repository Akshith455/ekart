
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-ekart-purple rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
