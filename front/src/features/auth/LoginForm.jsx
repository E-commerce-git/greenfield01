import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import img from "../../assets/"
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      dispatch(loginStart());
      const response = await axios.post('http://localhost:3000/api/user/login', formData);
      console.log(response , "response")
      const { token, user } = response.data;
      console.log(token , "token")
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role)
      dispatch(loginSuccess({ token, user }));
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl gap-8">
        {/* Product Image Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg">
          <img 
            src="../../assets" // Replace with your actual image path
            alt="Product"
            className="w-full max-w-md rounded-lg shadow-lg mb-6"
          />
        
          
        </div>

        {/* Login Form Section */}
        <div className="w-1/2">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="block w-full px-3 py-2 bg-gray-50 text-gray-900 border-b border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-0 sm:text-sm"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"   
                    required
                    className="block w-full px-3 py-2 bg-gray-50 text-gray-900 border-b border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-0 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="role" className="sr-only">Select Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-gray-50 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {loading ? 'Signing in...' : `Sign in as ${formData.role}`}
                </button>
              </div>
            </form>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button" 
                  className="font-medium text-amber-600 hover:text-amber-500"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;