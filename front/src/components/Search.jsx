// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// export default function SearchResults() {
//     const [products, setProducts] = useState([]);
//     const location = useLocation();
//     const query = new URLSearchParams(location.search).get('query');

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3000/api/product/search?query=${query}`);
//                 const data = await response.json();
//                 setProducts(data.products);
//             } catch (error) {
//                 console.error('Error fetching search results:', error);
//             }
//         };

//         if (query) {
//             fetchSearchResults();
//         }
//     }, [query]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-2xl font-bold mb-8">Search Results for "{query}"</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//                             <div className="relative">
//                                 {product.discount && (
//                                     <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
//                                         -{product.discount}%
//                                     </span>
//                                 )}
//                                 <img
//                                     src={product.imageUrl || "https://via.placeholder.com/300"}
//                                     alt={product.name}
//                                     className="w-full h-48 object-cover"
//                                 />
//                             </div>
//                             <div className="p-4">
//                                 <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
//                                 <p className="text-sm text-gray-600 mt-2">{product.description}</p>
//                                 <div className="flex items-center justify-between mt-4">
//                                     <p className="text-lg font-bold text-gray-900">${product.price}</p>
//                                     <div className="flex items-center">
//                                         <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                                         </svg>
//                                         <span className="text-sm text-gray-600 ml-1">4.5</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="col-span-4 text-center text-gray-600">No products found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }