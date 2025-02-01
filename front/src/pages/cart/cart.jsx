import CartItems from './CartItems';
import { useCart } from './CartContext';
import createOrder from "../../functions/addOrder.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, total, setOrderIdInContext } = useCart();
  const navigate = useNavigate();  

  const handleCheckout = async () => {
    try {
      const user = localStorage.getItem("userId");
      await createOrder(user, cartItems, total, setOrderIdInContext, navigate);
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 w-[40%]">Product</th>
              <th className="text-left py-3">Price</th>
              <th className="text-left py-3">Quantity</th>
              <th className="text-right py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <CartItems
                key={index}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                imageUrl={item.imageUrl}
                initialQuantity={item.quantity}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <input
            type="text"
            placeholder="Coupon Code"
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
          />
          <button className="px-6 py-2 bg-[#DB4444] text-white rounded hover:bg-[#DC2626]">
            Apply Coupon
          </button>
        </div>

        <div className="border rounded-lg p-6 mt-6 space-y-4 bg-gray-50">
          <h3 className="text-lg font-semibold">Cart Total</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button 
            className="w-full py-2 bg-[#DB4444] text-white rounded hover:bg-[#DC2626]" 
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
