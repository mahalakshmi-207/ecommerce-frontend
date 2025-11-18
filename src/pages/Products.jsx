import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../CartContext";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      search: params.get("search") || "",
    };
  };

  useEffect(() => {
    const { search } = getQueryParams();
    const API_URL = import.meta.env.VITE_API_URL;
    const url = `${API_URL}/api/products?page=${page}&limit=6${
      search ? `&search=${search}` : ""
    }`;

    setLoading(true);
    setError(false);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(
          Array.isArray(data.products)
            ? data.products
            : Array.isArray(data)
            ? data
            : []
        );
        setTotalPages(data.totalPages || 1);
      })
      .catch(() => {
        setError(true);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [location.search, page]);

  return (
    <div className="products-container mt-4">
      <h1 className="text-center fw-bold text-gradient mb-4">Products</h1>

      {/* Horizontal Product Scroll */}
      <div className="product-scroll">
        {loading ? (
          <p className="text-muted">Loading products...</p>
        ) : error ? (
          <p className="text-danger">⚠ Failed to load products.</p>
        ) : products.length === 0 ? (
          <p className="text-muted">No products found.</p>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
              <div className="product-body">
                <h5 className="fw-bold">{product.name}</h5>
                <p>₹{product.price}</p>
                <button
                  className="btn btn-sm btn-gradient mb-2 fw-bold"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
                <Link
                  to={`/products/${product._id}`}
                  className="btn btn-sm btn-outline-light fw-bold"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`btn btn-sm mx-1 ${
                page === i + 1 ? "btn-gradient" : "btn-outline-secondary"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;