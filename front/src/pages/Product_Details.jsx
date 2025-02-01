"use client"

import { useState } from "react"
import { Heart, Minus, Plus, Eye } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice'

export default function ProductDetail({ product, productList }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("white")
  
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  
  const isInWishlist = wishlist.some((item) => item.id === product?.id)

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }

  // Generate related products based on the current product's category or other criteria
  const relatedProducts = productList
    ?.filter(item => 
      item.id !== product?.id && 
      item.category === product?.category
    )
    .slice(0, 4) // Limit to 4 related products

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product?.images?.[selectedImage] || "/placeholder.svg"}
              alt={product?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product?.images?.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden ${
                  selectedImage === index ? "ring-2 ring-[#db4444]" : ""
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.floor(product?.rating || 0))}
                {"☆".repeat(5 - Math.floor(product?.rating || 0))}
              </div>
              <span className="text-gray-500">({product?.reviews} Reviews)</span>
              <span className="text-green-500">In Stock</span>
            </div>
            <p className="text-2xl font-semibold">${product?.price}</p>
          </div>

          <p className="text-gray-600">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install &
            mess free removal Pressure sensitive.
          </p>

          {/* Colors */}
          <div className="space-y-2">
            <p className="font-medium">Colours:</p>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedColor("white")}
                className={`w-6 h-6 rounded-full bg-white border ${
                  selectedColor === "white" ? "ring-2 ring-[#db4444] ring-offset-2" : ""
                }`}
              />
              <button
                onClick={() => setSelectedColor("red")}
                className={`w-6 h-6 rounded-full bg-red-500 ${
                  selectedColor === "red" ? "ring-2 ring-[#db4444] ring-offset-2" : ""
                }`}
              />
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <p className="font-medium">Size:</p>
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size ? "border-[#db4444] text-[#db4444]" : "border-gray-300 text-gray-600"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button className="px-8 py-2 bg-[#db4444] text-white rounded hover:bg-[#db4444]/90 transition-colors">
              Add to Cart
            </button>
            <button 
              onClick={handleWishlist} 
              className={`p-2 border rounded hover:bg-gray-100 ${
                isInWishlist ? 'text-[#db4444]' : ''
              }`}
            >
              <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Delivery Info */}
          <div className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">🚚</div>
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-600">Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8">↩️</div>
              <div>
                <p className="font-medium">Return Delivery</p>
                <p className="text-sm text-gray-600">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">Related Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts?.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-[#db4444] text-white px-2 py-1 text-sm rounded">
                    {product.discount}
                  </span>
                )}
                <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => dispatch(addToWishlist(product))} 
                    className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  >
                    <Heart className={`w-4 h-4 ${
                      wishlist.some((item) => item.id === product.id) ? 'fill-current text-[#db4444]' : ''
                    }`} />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex space-x-2">
                  <span className="text-[#db4444]">${product.price}</span>
                  <span className="text-gray-500 line-through">${product.oldPrice}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400 text-sm">{"★".repeat(Math.floor(product.rating))}</div>
                  <span className="text-gray-500 text-sm">({product.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

