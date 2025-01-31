// src/App.jsx
import { Provider } from 'react-redux';
import store from './store/store';
import { CartProvider } from './pages/cart/CartContext';  // Import the CartProvider
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import About from './components/About';
import ProductList from './components/ProductList';
import RegisterForm from './features/auth/RegisterForm';
import LoginForm from './features/auth/LoginForm';
import Profile from './components/Profile';
import NotFound from './pages/NotFound';
import Payment from './pages/payment/payment';
import Cart from './pages/cart/cart';
import ContactUs from './pages/ContactUS';

function App() {
  return (
    <Provider store={store}>
      <CartProvider> {/* Wrap with CartProvider */}
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
            <Route path="/category/:categoryId" element={<ProductList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/Payment" element={<Payment />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider> {/* Close CartProvider */}
    </Provider>
  );
}

export default App;
