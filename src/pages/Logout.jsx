import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    toast.info("👋 Logged out successfully");
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Logout;