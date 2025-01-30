
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Cart from './pages/cart/cart';
import ContactUs from "./pages/ContactUS"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/about" element={<About />} />
        <Route path="/Cart"element={<Cart/>} />
        <Route path="/Cart"element={<Cart/>} />
        <Route path="/ContactUs"element={<ContactUs/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;