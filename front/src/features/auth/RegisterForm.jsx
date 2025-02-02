import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import justImage from "../../assets/SignImg.png"
import { 
  registerStart, 
  registerSuccess as registerSuccessAction, 
  registerFailure,
  clearRegisterStatus 
} from '../../store/slices/authSlice';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' 
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, registerSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(clearRegisterStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (registerSuccess) {
      navigate('/login');
    }
  }, [registerSuccess, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure('Passwords do not match'));
      return;
    }
    try {
      dispatch(registerStart());
      const { confirmPassword, ...registerData } = formData;
      const response = await axios.post('http://localhost:3000/api/user/register', registerData);
      console.log(response.data);
      dispatch(registerSuccessAction());
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      dispatch(registerFailure(errorMessage));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl gap-8">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg">
          <img 
            src={justImage} // Replace with your actual image path
            alt="Product"
            className="w-full max-w-md rounded-lg shadow-lg mb-6"
          />
        </div>
        <div className="w-full lg:w-1/2 px-8 py-12">
          <div className="w-full max-w-md space-y-8 mx-auto">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-[#030406]">Create Your Account</h1>
              <p className="text-sm text-gray-600 mt-2">Please enter your details</p>
            </div>
            <div className="flex justify-center space-x-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${formData.role === 'user' ? 'bg-white shadow text-[#db4444]' : 'text-gray-600 hover:text-[#db4444]'}`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'user' }))}
              >
                Customer
              </button>
              <button
                type="button"
                className={`flex-1 py-2 px-4 rounded-md transition-all ${formData.role === 'seller' ? 'bg-white shadow text-[#db4444]' : 'text-gray-600 hover:text-[#db4444]'}`}
                onClick={() => setFormData(prev => ({ ...prev, role: 'seller' }))}
              >
                Seller
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="userName" className="sr-only">Username</label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    required
                    className="block w-full px-3 py-2 bg-gray-50 text-gray-900 border-b border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-0 sm:text-sm"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
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
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="block w-full px-3 py-2 bg-gray-50 text-gray-900 border-b border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-0 sm:text-sm"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
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
                  className="w-1/2 mx-auto flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#DB4444] hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {loading ? 'Creating account...' : `Register as ${formData.role}`}
                </button>
                <div className="text-center">
                  <span className="text-sm text-gray-600">Already have an account?</span>
                  <button type="button" className="text-[#db4444] text-sm hover:underline ml-1" onClick={() => navigate('/login')}>Sign in</button>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
