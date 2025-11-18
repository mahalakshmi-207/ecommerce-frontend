import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/orders.css";

const Orders = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    if (savedOrders.length > 0) {
      setOrder(savedOrders[savedOrders.length - 1]); // latest order
    } else {
      toast.info("No recent order found");
    }
  }, []);

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h2>❌ No recent order found</h2>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-content">
        <h2 className="text-center fw-bold mb-4 text-gradient">
          🎉 Your order has been placed successfully!
        </h2>

        {/* Order Details */}
        <div className="order-card mb-4 p-3">
          <h4 className="fw-bold">Order Details</h4>
          <p><strong>Order ID:</strong> #{order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        </div>

        {/* Items Ordered */}
        <div className="mb-4">
          <h4 className="fw-bold">Items Ordered</h4>
          {order.orderItems?.map((item) => (
            <div
              key={item.product}
              className="item-card mb-3 p-3 d-flex align-items-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="item-img me-3"
              />
              <div>
                <h5 className="fw-bold">{item.name}</h5>
                <p>Price: ₹{item.price}</p>
                <p>Qty: {item.quantity}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="summary-card p-3 mb-4">
          <h4 className="fw-bold">Summary</h4>
          <p className="fw-bold">Total: ₹{order.totalPrice}</p>
        </div>

        <div className="text-center">
          <button
            className="btn btn-gradient fw-bold"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;