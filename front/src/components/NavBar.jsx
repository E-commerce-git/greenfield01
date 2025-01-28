
function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand Name */}
          <div className="text-2xl font-bold text-gray-800">Exclusive</div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-200">Home</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-200">Contact</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-200">About</a>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-200">Sign Up</a>
          </div>

          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;