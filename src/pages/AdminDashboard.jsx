import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!user?.token) return navigate("/login");

    fetch(`${API_URL}/api/products/myproducts`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => toast.error("Failed to fetch products"));
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="admin-container mt-4">
      <h2 className="text-center fw-bold mb-4">⚙️ Admin Product Management</h2>

      <div className="d-flex justify-content-end mb-3">
        <a
          href={`${API_URL}/api/products/export`}
          className="btn btn-outline-success fw-bold"
        >
          Export CSV
        </a>
      </div>

      {products.length === 0 ? (
        <p className="text-muted text-center">No products found.</p>
      ) : (
        <div className="d-flex flex-wrap gap-4 justify-content-center">
          {products.map((product) => (
            <div className="admin-card p-3" key={product._id}>
              <h5 className="fw-bold">{product.name}</h5>
              <p className="text-light">₹{product.price}</p>
              <div className="mt-auto d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm fw-bold"
                  onClick={() => navigate(`/edit/${product._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm fw-bold"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;