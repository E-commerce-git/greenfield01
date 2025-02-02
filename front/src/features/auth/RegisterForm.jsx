import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        <div className="hidden lg:block lg:w-1/2">
          <img src="/assets/register-image.jpg" alt="Register" className="w-full h-full object-cover" />
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
                <input id="userName" name="userName" type="text" required className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors" placeholder="Username" value={formData.userName} onChange={handleChange} />
                <input id="email" name="email" type="email" required className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input id="password" name="password" type="password" required className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors" placeholder="Password" value={formData.password} onChange={handleChange} />
                <input id="confirmPassword" name="confirmPassword" type="password" required className="w-full px-3 py-2 border-b border-gray-300 focus:border-[#db4444] outline-none transition-colors" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              </div>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div className="space-y-4">
                <button type="submit" disabled={loading} className="w-full bg-[#db4444] text-white px-4 py-2.5 rounded hover:bg-[#db4444]/90 transition-colors">
                  {loading ? 'Creating account...' : `Register as ${formData.role === 'user' ? 'Customer' : 'Seller'}`}
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
