import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/redux/useAuth";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useAuth();

  useEffect(() => {
    fetchOrders();
    fetchOrderProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders/get-all-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrders(data.data || []);
    } catch (error) {
      setError("Failed to fetch orders");
      console.error("Error fetching orders:", error);
    }
  };

  const fetchOrderProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/get-all-product-orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrderProducts(data.data || []);
    } catch (error) {
      setError("Failed to fetch order products");
      console.error("Error fetching order products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      // Fetch order products
      const productsResponse = await fetch(`http://localhost:3000/api/orders/${orderId}/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const productsData = await productsResponse.json();

      // Fetch user details
      const userResponse = await fetch(`http://localhost:3000/api/user/user/${productsData.order.UserId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const userData = await userResponse.json();

      setOrderDetails({
        ...productsData.order,
        user: userData,
        products: productsData.products,
      });
    } catch (error) {
      setError("Failed to fetch order details");
      console.error("Error fetching order details:", error);
    }
  };

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    await fetchOrderDetails(order.id);
    setIsModalOpen(true);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        setError("Failed to update order status");
      }
    } catch (error) {
      setError("Error updating order status");
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const OrderDetailsModal = () => {
    if (!orderDetails) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Order Details #{selectedOrder.id}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Order Status and Total */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`mt-1 px-3 py-1 inline-flex text-sm font-medium rounded-full ${getStatusColor(orderDetails.status)}`}>
                    {orderDetails.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">${orderDetails.total}</p>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="mt-1">{orderDetails.user.userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1">{orderDetails.user.email}</p>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Products</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderDetails.products.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={product.imageUrl}
                                alt={product.name}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Size: {product.size}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.OrderProduct.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${product.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${(product.price * product.OrderProduct.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {[...orders].reverse().map((order) => {
              const orderProductItems = orderProducts.filter(op => op.OrderId === order.id);
              
              return (
                <li key={order.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #{order.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total: ${order.total}
                      </p>
                      <p className="text-sm text-gray-500">
                        Products in order: {orderProductItems.length}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md text-sm"
                      >
                        View Details
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'paid')}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Mark as Paid
                        </button>
                      )}
                      {order.status === 'paid' && (
                        <button
                          onClick={() => handleStatusUpdate(order.id, 'delivered')}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
                        >
                          Mark as Delivered
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </main>

      {isModalOpen && <OrderDetailsModal />}
    </div>
  );
};

export default OrderList; 