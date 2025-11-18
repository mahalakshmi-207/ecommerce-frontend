import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext(); // ✅ named export

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    let updatedCart = [...cart];
    const existing = updatedCart.find((item) => item._id === product._id);
    if (existing) {
      existing.qty += 1;
    } else {
      updatedCart.push({ ...product, qty: 1 });
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
