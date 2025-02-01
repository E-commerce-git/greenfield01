import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({}) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',  
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setIsAuthenticated(true);
        setFormData({
          name: response.data.userName,
          email: response.data.email,
        });
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
      }
    };
    fetchUser();
  }, []);

  const handleRedirectToLogin = () => {
    navigate('/login');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser({});
    setIsAuthenticated(false);
    navigate('/login');
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create update object with only filled fields
      const updateData = {
        userName: formData.name,
        email: formData.email,
      };

      // Only include password fields if current password is provided
      if (formData.currentPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          alert('New passwords do not match');
          return;
        }
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await axios.put(
        'http://localhost:3000/api/user/current', 
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setUser(response.data);
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update user data');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Welcome, {user.userName}!</h1>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <div className="flex items-center text-sm mb-8">
        <span className="text-gray-500">Home</span>
        <span className="mx-2">/</span>
        <span>My Account</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-64 flex-shrink-0">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Manage My Account</h3>
              <nav className="space-y-2">
                <a href="#" className="block text-[#DB4444]">
                  My Profile
                </a>
                <a href="#" className="block text-gray-600 hover:text-[#DB4444]">
                  Address Book
                </a>
                <a href="#" className="block text-gray-600 hover:text-[#DB4444]">
                  My Payment Options
                </a>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-3">My Orders</h3>
              <nav className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-[#DB4444]">
                  My Returns
                </a>
                <a href="#" className="block text-gray-600 hover:text-[#DB4444]">
                  My Cancellations
                </a>
              </nav>
            </div>
            <div>
              <h3 className="font-semibold mb-3">My Wishlist</h3>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white p-8 rounded-lg shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Edit Your Profile</h2>
            </div>

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
        </main>
      </div>
    </div>
  );
};

export default Profile;