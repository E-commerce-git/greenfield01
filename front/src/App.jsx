// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { CartProvider } from './pages/cart/CartContext';  // Import the CartProvider
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import ProductList from './components/ProductList';
import RegisterForm from './features/auth/RegisterForm';
import LoginForm from './features/auth/LoginForm';
import Cart from './pages/cart/cart';
import ContactUs from './pages/ContactUS';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <CartProvider>  {/* Wrap the app in CartProvider */}
        <BrowserRouter>
          <Navbar />
          <Routes>
          <Route path="*" element={<NotFound />} />
            <Route path="/" element={<ProductList />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/ContactUs" element={<ContactUs />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  );
}

export default App;
