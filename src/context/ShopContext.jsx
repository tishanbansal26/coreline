import React, { useState } from 'react';
import { ShopContext } from './ShopContextDefinition.js'; // Import the context definition

// Create a provider component
export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // State to hold cart items

  // Function to add item to cart
  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === productToAdd.id &&
                item.selectedSize === productToAdd.selectedSize &&
                item.selectedColor === productToAdd.selectedColor
      );

      if (existingItemIndex > -1) {
        // If item with same ID, size, and color exists, update quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += productToAdd.quantity || 1;
        return newCart;
      } else {
        // Otherwise, add new item
        return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });
  };

  // Function to update item quantity in cart
  const updateQuantity = (id, size, color, newQuantity) => {
    setCart(prevCart => {
      const newCart = prevCart.map(item => {
        if (item.id === id && item.selectedSize === size && item.selectedColor === color) {
          return { ...item, quantity: Math.max(1, newQuantity) }; // Ensure quantity is at least 1
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove item if quantity drops to 0
      return newCart;
    });
  };

  // Function to remove item from cart
  const removeFromCart = (id, size, color) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  // The value that will be supplied to any components consuming this context
  const shopContextValue = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={shopContextValue}>
      {children}
    </ShopContext.Provider>
  );
};
