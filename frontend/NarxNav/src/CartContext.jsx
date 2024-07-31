import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addToCart = (item) => {
    setCart((prevCart) => {
      if (prevCart.find(book => book.id === item.id)) {
        return prevCart;
      }
      const updatedCart = [...prevCart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(book => book.id !== item.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToFavorites = (item) => {
    setFavoriteBooks((prevFavorites) => {
      if (prevFavorites.find(book => book.id === item.id)) {
        return prevFavorites;
      }
      const updatedFavorites = [...prevFavorites, item];
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (item) => {
    setFavoriteBooks((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(book => book.id !== item.id);
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, favoriteBooks, addToFavorites, removeFromFavorites }}>
      {children}
    </CartContext.Provider>
  );
};
