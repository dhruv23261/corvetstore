import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.find(item => item._id === product._id)) {
        return prev.filter(item => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const removeWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item._id !== id));
  };

  const isInWishlist = (id) => wishlistItems.some(item => item._id === id);

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, isInWishlist, removeWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
