import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', formData);
      const { token, user } = response.data;
      
      // Store auth data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);

      // Configure axios defaults for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      dispatch(loginSuccess({ token, user }));
      
      // Navigate based on role
      if (user.role === 'seller') {
        navigate('/SellerDashboard');
      } else {
        navigate('/'); // or wherever you want users to go
      }

    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        {/* Image Column */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="/assets/login-image.jpg"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Column */}
        <div className="w-full lg:w-1/2 px-8 py-12">
          <div className="w-full max-w-md space-y-8 mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-[#030406]">Welcome Back</h1>
              <p className="text-sm text-gray-600 mt-2">Please enter your details</p>
            </div>

            {/* Role Switcher */}
            <div className="flex justify-center space-x-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  formData.role === 'user'
                    ? 'bg-white shadow text-[#db4444]'
                    : 'text-gray-600 hover:text-[#db4444]'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
              >
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${
                  formData.role === 'seller'
                    ? 'bg-white shadow text-[#db4444]'
                    : 'text-gray-600 hover:text-[#db4444]'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'seller' }))}
              >
                Seller
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors"
                  placeholder="Email or Phone Number"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  id="password"
                  name="password"
                  type="password"   
                  required
                  className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#db4444] text-white px-4 py-2.5 rounded hover:bg-[#db4444]/90 transition-colors"
                >
                  {loading ? 'Signing in...' : `Sign in as ${formData.role === 'user' ? 'Customer' : 'Seller'}`}
                </button>
                <div className="text-center">
                  <span className="text-sm text-gray-600">Don't have an account?</span>
                  <button 
                    type="button" 
                    className="text-[#db4444] text-sm hover:underline ml-1"
                    onClick={() => navigate('/register')}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;