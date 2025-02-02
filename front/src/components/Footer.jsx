import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
          <div>
            <h3 className="text-lg font-bold mb-4">Exclusive</h3>
            <p className="text-sm text-gray-400">Subscribe Get 10%</p>
            <p className="text-sm text-gray-400">off your first order</p>
          </div>

      
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>
                <a href="/" className="hover:text-blue-600 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-600 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>123 Main Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (123) 456-7890</li>
              <li>Email: info@example.com</li>
            </ul>
          </div>

        
          <div>
            <h3 className="text-lg font-bold mb-4">Download App</h3>
            <p className="text-sm text-gray-400 mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex items-center space-x-4 mb-6">
           
              <img
                src="https://tse2.mm.bing.net/th?id=OIP.-9N4K3Syg-OgbET8dgDwqAHaHa&pid=Api&P=0&h=180"
                alt="QR Code"
                className="w-24 h-24"
              />
             
              <div className="space-y-2">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.a7hkwxpVOiMzChf87GmGdwHaCM&pid=Api&P=0&h=180"
                  alt="Google Play"
                  className="h-10"
                />
                <img
                  src="https://tse2.mm.bing.net/th?id=OIP.1uekPFYzi2YM5d_bXG2_nQHaCj&pid=Api&P=0&h=180"
                  alt="App Store"
                  className="h-10"
                />
              </div>
            </div>
          
            <div className="flex justify-center mt-4 space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-pink-500 transition"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm9 2h-9A3.5 3.5 0 004 7.5v9A3.5 3.5 0 007.5 20h9A3.5 3.5 0 0020 16.5v-9A3.5 3.5 0 0016.5 4zM12 7a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.64 9.89V15h-2.44v-3h2.44v-2.2c0-2.4 1.44-3.7 3.62-3.7 1.05 0 2.14.18 2.14.18v2.34h-1.2c-1.18 0-1.54.74-1.54 1.5V12h2.62l-.42 3h-2.2v6.89A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition"
                aria-label="Twitter"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 5.5a7.55 7.55 0 01-2.17.6 3.82 3.82 0 001.67-2.1 7.55 7.55 0 01-2.41.92 3.78 3.78 0 00-6.48 3.44 10.72 10.72 0 01-7.79-3.95 3.78 3.78 0 001.16 5.06 3.72 3.72 0 01-1.71-.48v.05a3.78 3.78 0 003.03 3.7 3.7 3.7 0 01-1.7.07 3.79 3.79 0 003.53 2.63A7.59 7.59 0 012 17.53a10.72 10.72 0 005.79 1.69c7 0 10.83-5.8 10.83-10.83v-.49A7.5 7.5 0 0022 5.5z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-700 transition"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.98 3.5a2.48 2.48 0 012.5 2.5 2.5 2.5 0 11-5 0 2.48 2.48 0 012.5-2.5zM2 21h5v-9H2v9zm7 0h5v-4.6c0-2.5 3-2.7 3 0V21h5v-7.6c0-6.8-7.5-6.6-7.5 0V21z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-6 border-t border-gray-700 mt-8">
        <p className="text-sm text-gray-400">© 2025 Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
