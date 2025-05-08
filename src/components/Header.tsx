
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from "lucide-react";
import Logo from './Logo';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="block lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Search Bar (Hidden on Mobile) */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearch} className="w-full flex">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-ekart-purple hover:bg-ekart-vivid-purple"
              >
                <Search size={20} />
              </Button>
            </form>
          </div>

          {/* Right Section - Cart and Auth */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User size={24} className="text-ekart-dark-purple" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm font-medium">
                      Hello, {user?.name}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="w-full cursor-pointer">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="w-full cursor-pointer">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist" className="w-full cursor-pointer">My Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full cursor-pointer">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup" className="w-full cursor-pointer">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart size={24} className="text-ekart-dark-purple" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ekart-orange text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Show below header on mobile */}
        <div className="mt-3 block md:hidden">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none border-r-0"
            />
            <Button 
              type="submit"
              className="rounded-l-none bg-ekart-purple hover:bg-ekart-vivid-purple"
            >
              <Search size={18} />
            </Button>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/categories" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
                Categories
              </Link>
              <Link to="/deals" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
                Today's Deals
              </Link>
              <Link to="/contact" className="p-2 hover:bg-gray-100 rounded" onClick={toggleMenu}>
                Contact Us
              </Link>
              {isAuthenticated ? (
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="w-full bg-ekart-purple hover:bg-ekart-vivid-purple">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Categories Navigation - Desktop Only */}
      <nav className="hidden lg:block bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 py-2">
            <Link to="/category/electronics" className="text-sm hover:text-ekart-purple transition-colors">
              Electronics
            </Link>
            <Link to="/category/jewelery" className="text-sm hover:text-ekart-purple transition-colors">
              Jewelry
            </Link>
            <Link to="/category/men's%20clothing" className="text-sm hover:text-ekart-purple transition-colors">
              Men's Clothing
            </Link>
            <Link to="/category/women's%20clothing" className="text-sm hover:text-ekart-purple transition-colors">
              Women's Clothing
            </Link>
            <Link to="/deals" className="text-sm hover:text-ekart-purple transition-colors">
              Today's Deals
            </Link>
            <Link to="/contact" className="text-sm hover:text-ekart-purple transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
