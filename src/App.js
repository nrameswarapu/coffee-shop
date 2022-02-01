import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCallback } from 'react';
import Header from './components/header/Header';
import Home from './components/home/Home';
import { items } from './items/index';
import NotFound from './components/notfound/NotFound';
import Details from './components/details/Details';
import { CartTypes, UserCartReducer } from './reducers/cartReducer';
import Cart from './components/cart/cart';

import './App.css';

function App() {
  const [cart, dispatch] = UserCartReducer();
  const addToCart = useCallback(
    (itemId) => dispatch({ type: CartTypes.ADD, itemId }),
    [dispatch],
  );

  return (
    <Router>
      <Header cart={cart} />
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} items={items} dispatch={dispatch} />} />
        <Route path="/details/:id" element={<Details addToCart={addToCart} items={items} />} />
        <Route path="/" element={<Home items={items} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
