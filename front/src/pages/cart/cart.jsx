import React from 'react';
import CartItems from "./cartItems"
import axios from 'axios'
import { useState ,useEffect} from 'react';
const Cart = () => {
  const [products, setProducts] = useState([])
  // const [Total,setTotal]=useState(0)

  const getAllProducts = async() =>{
    try{const result = await axios.get("http://localhost:3000/api/product/products")
      setProducts(result.data)
      console.log(products)
    }catch(err){console.error(err,"error Fetching products data from server")}
  }// array of all products 
  useEffect(()=>{
    getAllProducts()
  },[])
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <CartItems/>
          </tbody>
        </table>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border p-2 rounded-l"
          />
          <button className="bg-green-500 text-white p-2 rounded-r hover:bg-green-600">
            Apply Coupon
          </button>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>$0</span>
          </div>
        </div>

        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-blue-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;