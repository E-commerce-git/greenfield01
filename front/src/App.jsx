import { Provider } from 'react-redux';
import store from './store/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from './pages/cart/CartContext';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
// import ProductDetails from './pages/Product_Details';
import SellerDashboard from './pages/SellerDashboard';
import { useSelector } from 'react-redux';
import { WishlistProvider } from './pages/wishlist/WishlistContext';
import Wishlist from './pages/wishlist/Wishlist';
import ProductCard from './components/ProductCard';
import SearchResults from './components/SearchResults';

// Stripe setup
const stripePromise = loadStripe("pk_test_51QmDigCSIHj5BO0w8Yl64lZRRUxBmKJfhl7GZ73qwZLoDRvqH9dwG84ltpUindF0mWqcw0w6WT23ShLwzbn99Juw00mSIL3wZe");

// Protected Route Component for Seller
const SellerRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  
  if (!token || user?.role !== 'seller') {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
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
                <Route path="/wishlist" element={<Wishlist />} />
                {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
                <Route path="/search/:query" element={<SearchResults />} />
                <Route path="*" element={< ProductCard/>} />
                <Route path="/" element={<  WishlistProvider/>} />

                
                
                {/* Payment route with Stripe */}
                <Route 
                  path="/Payment" 
                  element={
                    <Elements stripe={stripePromise}>
                      <Payment />
                    </Elements>
                  } 
                />
                
                {/* Product details route */}
                <Route 
                  path="/product/:id" 
                  element={<ProductList showDetails={true} />} 
                />
                
                {/* Seller Dashboard route with protection */}
                <Route 
                  path="/SellerDashboard" 
                  element={
                    <SellerRoute>
                      <SellerDashboard />
                    </SellerRoute>
                  } 
                />
              </Routes>
              <Footer />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
