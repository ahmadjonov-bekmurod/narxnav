// FavoriteContext.js
import React, { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    // Get the favorite books from localStorage if it exists
    const savedFavorites = localStorage.getItem('favoriteBooks');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const addToFavorites = (book) => {
    setFavoriteBooks((prevFavorites) => {
      // Check if book is already in favorites
      const isAlreadyFavorite = prevFavorites.some(favBook => favBook.id === book.id);
      if (isAlreadyFavorite) {
        return prevFavorites; // Prevent duplicate entries
      }
      const updatedFavorites = [...prevFavorites, book];
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFromFavorites = (bookId) => {
    setFavoriteBooks((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter(favBook => favBook.id !== bookId);
      localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const isBookFavorite = (bookId) => {
    return favoriteBooks.some(book => book.id === bookId);
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteBooks, addToFavorites, removeFromFavorites, isBookFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
