import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

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
            <Link to="#" className="text-gray-800 hover:text-blue-600 transition duration-200">Contact</Link>
            <Link to="/signup" className="text-gray-800 hover:text-blue-600 transition duration-200">Sign Up</Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200">
              Search
            </button>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Heart Icon (Favoriting) */}
            <Link to="#" className="text-gray-800 hover:text-red-600 transition duration-200" aria-label="Favorites">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 21l-1-1.1C5.7 15.2 2 12.3 2 8.4 2 5.5 4.5 3 7.4 3c1.7 0 3.3.8 4.6 2.1C13.3 3.8 14.9 3 16.6 3 19.5 3 22 5.5 22 8.4c0 3.9-3.7 6.8-9 11.5l-1 1.1z"
                ></path>
              </svg>
            </Link>

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
            <Link to="#" className="text-gray-800 hover:text-blue-600 transition duration-200" aria-label="Profile">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zM12 14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}