import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoLogInOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import "../styles/navbar.css";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setTotalItems(total);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <header className="flipkart-header">
      {/* Logo */}
      <Link to="/" className="logo-container">
        <img
          src="https://i.pinimg.com/originals/ce/56/99/ce5699233cbc0f142250b520d967dff7.png"
          alt="MyShop Logo"
          className="logo"
        />
        <span className="logo-text">MyShop</span>
      </Link>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Navigation links */}
      <nav className="nav-links">
        <Link to="/products">Products</Link>
        <Link to="/orders">Orders</Link>

        {user?.role === "admin" && <Link to="/admin">Admin</Link>}

        <Link to="/cart" className="cart-icon">
          <HiOutlineShoppingCart size={22} />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>

        {user ? (
          <button onClick={handleLogout} className="logout-btn">
            <MdLogout size={22} />
          </button>
        ) : (
          <Link to="/login">
            <IoLogInOutline size={22} />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
