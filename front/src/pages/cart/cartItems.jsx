
import React, { useState, useContext } from 'react';
import { useCart } from '../cart/CartContext';

const CartItems = ({ name, price, imageUrl, initialQuantity }) => {
  const { updateCart } = useCart();
  const [itemQuantity, setItemQuantity] = useState(initialQuantity);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const updatedQuantity = isNaN(value) || value < 0 ? 0 : value;
    setItemQuantity(updatedQuantity);

    updateCart((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.name === name ? { ...item, quantity: updatedQuantity } : item
      );
      return updatedItems;
    });
  };

  const handleIncrement = () => {
    const updatedQuantity = itemQuantity + 1;
    setItemQuantity(updatedQuantity);

    updateCart((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.name === name ? { ...item, quantity: updatedQuantity } : item
      );
      return updatedItems;
    });
  };

  const handleDecrement = () => {
    const updatedQuantity = itemQuantity > 0 ? itemQuantity - 1 : 0;
    setItemQuantity(updatedQuantity);

    updateCart((prevItems) => {
      const updatedItems = prevItems.map(item =>
        item.name === name ? { ...item, quantity: updatedQuantity } : item
      );
      return updatedItems;
    });
  };

  return (
    <tr>
      <td className="py-2">
        <img src={imageUrl} alt={name} className="w-16 h-16 object-cover" />
      </td>
      <td className="py-2">{name}</td>
      <td className="py-2">{price}$</td>
      <td className="py-2">
        <button onClick={handleDecrement} className="px-2 py-1 bg-gray-300 rounded">-</button>
        <input
          type="number"
          value={itemQuantity}
          onChange={handleQuantityChange}
          className="w-12 text-center mx-2"
        />
        <button onClick={handleIncrement} className="px-2 py-1 bg-gray-300 rounded">+</button>
      </td>
      <td className="py-2">{price * itemQuantity}$</td>
    </tr>
  );
};

export default CartItems;