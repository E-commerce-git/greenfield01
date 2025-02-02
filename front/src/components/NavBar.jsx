import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom';
import { useWishlist } from '../pages/wishlist/WishlistContext';

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserInfo, setShowUserInfo] = useState(false);

  const { wishlistItems } = useWishlist();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      // Skip the API call if there's no token
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }

      try {
        const {data} = await axios.get('http://localhost:3000/api/user/check-auth', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        setIsAuthenticated(data.isAuthenticated);
        setUser(data.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear auth state on error
        setIsAuthenticated(false);
        setUser(null);
        // Optionally clear token if it's invalid
        localStorage.removeItem('token');
      }
    };
    
  //   checkAuth();
  // }, []);

  // Debug logs
  // console.log('Auth state:', { isAuthenticated, user, showUserInfo });

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold text-gray-800">GlobBuy</div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 transition duration-200">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-blue-600 transition duration-200">About</Link>
            <Link to="#" className="text-gray-800 hover:text-blue-600 transition duration-200">Shop</Link>
            <Link to="/ContactUs" className="text-gray-800 hover:text-blue-600 transition duration-200">Contact</Link>
            <Link to="/register" className="text-gray-800 hover:text-blue-600 transition duration-200">Sign Up</Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200">
              Search
            </button>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist Icon */}
            <div className="relative">
              <Link to="/wishlist" className="text-gray-800 hover:text-blue-600 transition duration-200">
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#db4444] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>

            {/* Shopping Cart Icon */}
            <button onClick={() => navigate('/Cart')} className="text-gray-800 hover:text-blue-600 transition duration-200" aria-label="Cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </button>

            {/* Profile Icon */}
            <div className="relative">
              <Link 
                to="/profile" 
                className={`text-gray-800 hover:text-red-600 transition duration-200 ${isAuthenticated ? '!text-red-500' : ''}`}
                onMouseEnter={() => setShowUserInfo(true)}
                onMouseLeave={() => setShowUserInfo(false)}
              >
                <div className="flex flex-col items-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                    ></path>
                  </svg>
                  {isAuthenticated && user && (
                    <span className="text-xs text-gray-600 mt-1">
                      {user.userName || user.name || 'User'}
                    </span>
                  )}
                </div>
              </Link>
              {showUserInfo && isAuthenticated && user && (
                <div className="absolute right-0 mt-2 py-2 px-4 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[200px]">
                  <p className="whitespace-nowrap text-sm font-medium text-gray-800 mb-2">
                    Welcome, {user.userName || user.name || 'User'}!
                  </p>
                  <hr className="my-2" />
                  <button 
                    onClick={() => {
                      localStorage.removeItem('token');
                      setIsAuthenticated(false);
                      setUser(null);
                      navigate('/');
                    }}
                    className="text-sm text-red-600 hover:text-red-800 transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}