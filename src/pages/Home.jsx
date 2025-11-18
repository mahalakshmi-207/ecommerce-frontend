import { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";
import "../styles/home.css";

export default function Home() {
  const [products, setProducts] = useState({});
  const { addToCart } = useContext(CartContext);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const productArray = Array.isArray(data.products) ? data.products : data;
        if (!Array.isArray(productArray))
          throw new Error("Invalid products format");

        const grouped = productArray.reduce((acc, product) => {
          acc[product.category] = acc[product.category] || [];
          acc[product.category].push(product);
          return acc;
        }, {});
        setProducts(grouped);
      })
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Banner */}
      <div className="hero">
        <img
          src="https://source.unsplash.com/1600x500/?shopping,ecommerce"
          alt="Hero Banner"
          className="hero-img"
        />
        <div className="hero-overlay">
          <h1>Welcome to MyShop</h1>
          <p>Find the best deals on top products</p>
          <button className="btn-shop">Shop Now</button>
        </div>
      </div>

      {/* Product Sections */}
      <div className="home-sections">
        {Object.keys(products).length === 0 ? (
          <p className="empty">No products available.</p>
        ) : (
          Object.keys(products).map((category) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>

              <div className="product-grid">
                {products[category].map((item) => (
                  <div key={item._id} className="product-card">
                    <img src={item.image} alt={item.name} />

                    <div className="product-info">
                      <h3>{item.name}</h3>
                      <p className="price">₹{item.price}</p>
                      <p className="rating">⭐ {item.rating}</p>

                      {item.expiryDate && (
                        <p className="expiry">Expiry: {item.expiryDate}</p>
                      )}

                      <button
                        className="add-btn"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
