import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Panier from './components/Panier';
function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Your main content goes here */}
        <ProductList />
      </main>
      <Footer />
      <Panier/>
    </>
  );
}

export default App;