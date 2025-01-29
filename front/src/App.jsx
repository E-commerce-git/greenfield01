import React from 'react';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Navbar from './components/NavBar.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/store" element={<ProductList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

