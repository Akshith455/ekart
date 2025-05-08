
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="relative text-2xl md:text-3xl font-bold">
        <span className="text-ekart-purple">e</span>
        <span className="text-ekart-dark-purple">Kart</span>
        <span className="absolute -top-1 -right-3 text-ekart-orange text-xs">™</span>
      </div>
    </Link>
  );
};

export default Logo;
