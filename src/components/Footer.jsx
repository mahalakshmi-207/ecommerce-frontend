import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer-custom text-center py-4">
      <p className="mb-2 fw-bold">© 2025 MyShop. All rights reserved.</p>

      <div className="d-flex justify-content-center gap-4 mt-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-link"
        >
          <FaFacebook className="social-icon" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="social-link"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-link"
        >
          <FaInstagram className="social-icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;