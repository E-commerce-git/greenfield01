import CartItems from './CartItems';
import { useCart } from './CartContext';
import createOrder from "../../functions/addOrder.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, total } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleCheckout = async () => {
    try {
      await createOrder(user, cartItems, total, navigate); // Pass navigate here
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="text-left py-2"></th>
              <th className="text-left py-2">Product</th>
              <th className="text-left py-2">Price</th>
              <th className="text-left py-2">Quantity</th>
              <th className="text-left py-2">Subtotal</th>
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
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4 hover:bg-blue-600"
          onClick={handleCheckout} // Use the function here
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
