// src/App.jsx
import { Provider } from 'react-redux';
import store from './store/store';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
// import config from "../src/config/default.js"

const stripePromise = loadStripe("pk_test_51QmDigCSIHj5BO0w8Yl64lZRRUxBmKJfhl7GZ73qwZLoDRvqH9dwG84ltpUindF0mWqcw0w6WT23ShLwzbn99Juw00mSIL3wZe");

function App() {
  return (
    <Provider store={store}>
      <CartProvider> {}
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
            <Route 
              path="/Payment" 
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              } 
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider> 
    </Provider>
  );
}

export default App;
