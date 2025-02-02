"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { Heart, Minus, Plus, Eye } from "lucide-react"
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../redux/wishlistSlice'
import { useParams } from 'react-router-dom'
import { useCart } from '../pages/cart/CartContext'
import { addToCart } from '../functions/addToCard.jsx'
import ReviewForm from '../components/ReviewForm'
import axios from 'axios'

export default function ProductDetail({ product, productList }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("white")
  const [failedImages, setFailedImages] = useState(new Set())
  const [userRating, setUserRating] = useState(0)
  const [isHovering, setIsHovering] = useState(0)
  const [reviews, setReviews] = useState([])
  const { id } = useParams()
  
  const dispatch = useDispatch()
  const wishlist = useSelector((state) => state.wishlist.items)
  const { updateCart } = useCart()

  const handleRatingClick = async (rating) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to rate products');
        return;
      }
      
      const response = await axios.post(
        `http://localhost:3000/api/reviews/add`, 
        { productId: id, rating, comment: '' },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 201) {
        setUserRating(rating);
        // Update the product's rating in the UI
        product.rating = ((product.rating * product.reviews) + rating) / (product.reviews + 1);
        product.reviews += 1;
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to submit rating');
      } else {
        alert('Network error. Please try again.');
      }
    }
  };

  const isInWishlist = useMemo(() => {
    return wishlist.some((item) => item.id === product?.id)
  }, [wishlist, product?.id])

  const relatedProducts = useMemo(() => {
    return productList
      ?.filter(item => 
        item.id !== product?.id && 
        item.category === product?.category &&
        !failedImages.has(item.id) &&
        (item.images?.[0] || item.imageUrl)
      )
      .slice(0, 4)
  }, [productList, product?.id, product?.category, failedImages])

  const handleWishlist = useCallback(() => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id))
    } else {
      dispatch(addToWishlist(product))
    }
  }, [isInWishlist, product, dispatch])

  const placeholderImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDg4Ljg4ODlDMTAzLjAzNyA4OC44ODg5IDEwNS41IDg2LjQyNTggMTA1LjUgODMuMzg4OUMxMDUuNSA4MC4zNTIgMTAzLjAzNyA3Ny44ODg5IDEwMCA3Ny44ODg5Qzk2Ljk2MzEgNzcuODg4OSA5NC41IDgwLjM1MiA5NC41IDgzLjM4ODlDOTQuNSA4Ni40MjU4IDk2Ljk2MzEgODguODg4OSAxMDAgODguODg4OVoiIGZpbGw9IiM5Q0EzQUYiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTg1LjUgNjZIODVWNjUuNUM4NSA2NC4xMTkzIDg2LjExOTMgNjMgODcuNSA2M0gxMTIuNUMxMTMuODgxIDYzIDExNSA2NC4xMTkzIDExNSA2NS41VjY2SDExNC41SDg1LjVaTTExNSA2OEg4NVYxMzQuNUM4NSAxMzUuODgxIDg2LjExOTMgMTM3IDg3LjUgMTM3SDExMi41QzExMy44ODEgMTM3IDExNSAxMzUuODgxIDExNSAxMzQuNVY2OFpNODcuNSA2MUM4NC45MTAxIDYxIDgzIDYyLjkxMDEgODMgNjUuNVYxMzQuNUM4MyAxMzcuMDkgODQuOTEwMSAxMzkgODcuNSAxMzlIMTEyLjVDMTE1LjA5IDEzOSAxMTcgMTM3LjA5IDExNyAxMzQuNVY2NS41QzExNyA2Mi45MTAxIDExNS4wOSA2MSAxMTIuNSA2MUg4Ny41WiIgZmlsbD0iIzlDQTNBRiIvPjwvc3ZnPg=="

  const handleImageError = useCallback((productId) => {
    setFailedImages(prev => {
      if (prev.has(productId)) return prev;
      const newSet = new Set(prev)
      newSet.add(productId)
      return newSet
    })
  }, [])

  const handleAddToCart = () => {
    const productWithDetails = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    };
    addToCart(productWithDetails, quantity, updateCart);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/reviews/product/${id}`);
      if (response.status === 200) {
        setReviews(response.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to fetch reviews');
      } else {
        alert('Network error. Please try again.');
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = async (productId, rating, comment) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:3000/api/reviews/add`, 
        { productId, rating, comment },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={!failedImages.has(product?.id) ? (product?.images?.[0] || product?.imageUrl) : placeholderImage}
              alt={product?.name}
              className="w-full h-full object-cover"
              onError={() => handleImageError(product?.id)}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="focus:outline-none"
                    onMouseEnter={() => setIsHovering(star)}
                    onMouseLeave={() => setIsHovering(0)}
                    onClick={() => handleRatingClick(star)}
                  >
                    {star <= (isHovering || userRating || product?.rating || 0) 
                      ? "★" 
                      : "☆"
                    }
                  </button>
                ))}
              </div>
              <span className="text-gray-500">
                ({product?.reviews} Reviews{userRating ? ", Your rating: " + userRating : ""})
              </span>
              <span className="text-green-500">In Stock</span>
            </div>
            <p className="text-2xl font-semibold">${product?.price}</p>
          </div>

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
            <button 
              onClick={handleAddToCart}
              className="px-8 py-2 bg-[#db4444] text-white rounded hover:bg-[#db4444]/90 transition-colors"
            >
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
                  src={!failedImages.has(product.id) ? (product.images?.[0] || product.imageUrl) : placeholderImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(product.id)}
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

      {/* Reviews section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        <ReviewForm productId={id} onSubmit={handleReviewSubmit} />
        
        <div className="mt-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b py-4">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`text-yellow-400 ${index < review.rating ? 'fill-current' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">
                  by {review.User?.userName || 'Anonymous'}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}