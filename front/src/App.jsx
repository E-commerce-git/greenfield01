<<<<<<< HEAD
import Navbar from "./components/NavBar.jsx"
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import LoginForm from './features/auth/LoginForm';

function App() {
  return (
   <>
   <Provider store={store}>
   <Navbar/>
   <LoginForm />
   </Provider>
   </>
=======
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
>>>>>>> a639b261944efcf55af01bf5eb2206ba6a2d16ed
  );
}

export default App;
