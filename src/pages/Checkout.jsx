import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cart.length) return toast.error("Your cart is empty!");

    const orderItems = cart.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity || 1,
    }));

    const totalPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      orderItems,
      shippingAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      totalPrice,
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    toast.success("🎉 Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container">
        <h2 className="fw-bold text-gradient text-center mb-4">Checkout</h2>

        <form onSubmit={handleSubmit} className="checkout-form">

          <div className="form-group">
            <label className="fw-bold">FULL NAME :</label>
            <input
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="fw-bold">ADDRESS :</label>
            <textarea
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="fw-bold">PAYMENT METHOD : </label>
            <select
              name="paymentMethod"
              className="form-select"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Credit/Debit Card</option>
            </select>
          </div>

          <button type="submit" className="btn-gradient fw-bold place-btn">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
