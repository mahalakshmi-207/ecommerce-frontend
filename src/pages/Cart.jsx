import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const handleRemove = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.info("Item removed from cart");
  };

  const handleQuantityChange = (_id, change) => {
    const updatedCart = cart.map((item) =>
      item._id === _id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-container mt-4">
      <h2 className="text-center fw-bold mb-4">🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-muted text-center mt-4">Your cart is empty!</p>
      ) : (
        <div className="d-flex flex-column flex-lg-row gap-4">
          {/* Cart Items */}
          <div className="flex-grow-1">
            {cart.map((item) => (
              <div className="cart-card mb-3 d-flex" key={item._id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-img"
                />
                <div className="cart-body flex-grow-1">
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="text-muted">₹{item.price}</p>
                  <div className="d-flex align-items-center mb-2">
                    <button
                      className="btn btn-outline-dark btn-sm me-2"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      −
                    </button>
                    <span className="fw-bold">{item.quantity || 1}</span>
                    <button
                      className="btn btn-outline-dark btn-sm ms-2"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="summary-card p-3">
            <h4 className="fw-bold">Order Summary</h4>
            <p>Total Items: {cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}</p>
            <p className="fw-bold">Total: ₹{totalPrice}</p>
            <button
              className="btn btn-success w-100 fw-bold"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;