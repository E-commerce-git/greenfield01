import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apis, { makeRequest } from '../../stockApi/apistock';

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',  
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.userName || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updateData = {
        userName: formData.name,
        email: formData.email,
      };

      if (formData.currentPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert('New passwords do not match');
          return;
        }
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await makeRequest(apis.user.update, updateData);

      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Profile update error:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  // If not authenticated, show login message
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Please log in to continue</h2>
          <button
            onClick={handleRedirectToLogin}
            className="px-6 py-2 bg-[#DB4444] text-white rounded-md hover:bg-opacity-90"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  const SellerSection = () => {
    if (user?.role !== 'seller') {
      return null;
    }
    
    return (
      <div className="bg-white p-8 rounded-lg shadow mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Seller Dashboard</h2>
          <button
            onClick={() => navigate('/SellerDashboard')}
            className="px-6 py-2 bg-[#DB4444] text-white rounded-md hover:bg-opacity-90"
          >
            Go to Dashboard
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Active Products</h3>
            <p className="text-3xl font-bold text-[#DB4444]">{user.productCount || 0}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Total Sales</h3>
            <p className="text-3xl font-bold text-[#DB4444]">${user.totalSales || 0}</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Store Status</h3>
            <p className="text-lg font-medium text-green-600">Active</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/seller-dashboard/products/new')}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add New Product
            </button>
            <button
              onClick={() => navigate('/seller-dashboard/orders')}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {user?.userName}!</h1>
        <div className="flex gap-4">
          {user?.role === 'seller' && (
            <button
              onClick={() => navigate('/SellerDashboard')}
              className="px-4 py-2 bg-[#DB4444] text-white rounded-md hover:bg-opacity-90"
            >
              Seller Dashboard
            </button>
          )}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Edit Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Password Changes</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-md"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button type="button" className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-[#DB4444] text-white rounded-md hover:bg-opacity-90">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {user?.role === 'seller' && <SellerSection />}
    </div>
  );
};

export default Profile;