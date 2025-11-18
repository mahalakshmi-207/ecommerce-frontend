import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import { CartContext } from "../CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/productdetails.css";

function ProductDetail() {
  const { id } = useParams();
  const cleanId = id.trim();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { addToCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();   

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://ecommerce-backend-2-dkm0.onrender.com";

  // Fetch product
  useEffect(() => {
    fetch(`${API_URL}/api/products/${cleanId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [cleanId]);

  // Submit Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) return toast.error("Please login to submit a review");
    if (!comment.trim()) return toast.warning("Please enter a comment");

    try {
      const res = await fetch(`${API_URL}/api/products/${cleanId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: user?.name || "Anonymous",
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Review submission failed");

      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      setProduct(data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (!product) return <p className="text-center mt-5">Loading product...</p>;

  return (
    <div className="product-container">
      <div className="product-wrapper">
        {/* LEFT - Image */}
        <div className="product-image-box">
          <img src={product.image} alt={product.name} className="product-img" />
        </div>

        {/* RIGHT - Info */}
        <div className="product-info">
          <h1 className="fw-bold">{product.name}</h1>
          <p className="text-price">₹{product.price}</p>
          <p>⭐ {product.rating?.toFixed(1) || 0}</p>
          <p>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</p>

          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-gradient fw-bold"
              onClick={() => addToCart(product)}
              disabled={product.countInStock === 0}
            >
              {product.countInStock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

            {/* ✅ Buy Now navigates to checkout */}
            <button
              className="btn btn-outline-dark fw-bold"
              onClick={() => {
                addToCart(product);  
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description, Reviews, Submit Review sections  */}
    </div>
  );
}

export default ProductDetail;