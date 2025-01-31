import React from 'react';

function Payment() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Complete Your Payment
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Cardholder Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="card-number">
            Card Number
          </label>
          <input
            type="text"
            id="card-number"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="1234 5678 9876 5432"
          />
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="expiry">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiry"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="MM/YY"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="cvc">
              CVC
            </label>
            <input
              type="text"
              id="cvc"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="CVC"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="johndoe@example.com"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-sm text-gray-600">Total: $49.99</span>
          <button className="bg-indigo-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-indigo-700 transition duration-300">
            Pay Now
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Secure payment through Stripe. We accept all major credit cards.
        </p>
      </div>
    </div>
  );
}

export default Payment;
