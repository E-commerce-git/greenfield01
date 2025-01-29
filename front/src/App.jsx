import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Your main content goes here */}
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;