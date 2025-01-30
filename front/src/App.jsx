import React from 'react';
import Navbar from './components/NavBar.jsx';  // Import the Navbar component
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Carousel from './components/carousel.jsx';  // Import the Carousel component

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Include the Carousel here */}
        <Carousel />
        {/* ProductList or other components */}
        <ProductList />
      </main>
      <Footer />
    </>
  );
}

export default App;
