import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { CartProvider } from './components/Cart/CartContext';
import { FavoritesProvider } from './components/FavoritePage/FavoriteContext';

import { AlertContainer } from './components/Alert/Alert';
import Alert from './components/Alert/Alert';
import PageNotFound from './components/PageNoteFound/PageNotFound';
import StartingPage from './components/StartingPage/StartingPage';
import MenuPage from './components/MenuPage/MenuPage';
import FavoritePage from './components/FavoritePage/FavoritePage';
import ProductDetails from './components/MenuPage/ProductDetails';
import Cart from './components/Cart/Cart';

import './App.css';

const API_URL = '/data/products.json';

function App() {
  const [products, setProducts] = useState([]);
  const [supplements, setSupplements] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data.products);
        setSupplements(data.supplements);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  if (error) {
    return Alert.warn('Ошибка: ' + { error });
  }

  return (
    <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="App">
            <AlertContainer />
            <Routes>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/" element={<StartingPage />} />
              <Route path="menu" element={<MenuPage products={products} />} />
              <Route
                path="favorites"
                element={<FavoritePage products={products} />}
              />
              <Route
                path="cart"
                element={
                  <Cart
                    cartItems={cart}
                    calculateTotalPrice={calculateTotalPrice}
                    products={products}
                  />
                }
              />
              <Route
                path="menu/:id"
                element={
                  <ProductDetails
                    products={products}
                    addToCart={addToCart}
                    supplements={supplements}
                  />
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
