import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css'; // Assuming we add custom CSS if needed

const imageMap = {
    "brake-pad.jpg": "/images/brake-pad.jpg",
    "oil-filter.jpg": "/images/oil-filter.jpg",
    "car-battery.jpg": "/images/car-battery.jpg",
    "shock-absorber.jpg": "/images/shock-absorber.jpg",
    "headlight.jpg": "/images/headlight.jpg",
    "clutch-plate.jpg": "/images/clutch-plate.jpg",
    "radiator.jpg": "/images/radiator.jpg",
    "spark-plug.jpg": "/images/spark-plug.jpg",
};

const getImageUrl = (image) => {
    if (!image) return "/images/brake-pad.jpg";
    if (typeof image !== "string") return image;
    const filename = image.split("/").pop();
    return imageMap[filename] || `/images/${filename}` || "/images/brake-pad.jpg";
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // WhatsApp phone number (from project context)
  const whatsappPhone = '919876543210'; // +91 98765 43210 without +

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Get 4 random products excluding current
        const allProducts = response.data.filter(p => p._id !== id);
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to load related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const handleOrderOnWhatsApp = () => {
    const message = `I want to order this product:\n\nProduct: ${product.name}\nBrand: ${product.brand}\nPrice: ₹${product.price}\n\nPlease assist me.`;
    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleAskOnWhatsApp = () => {
    const message = `I have a question about this product:\n\nProduct: ${product.name}\nBrand: ${product.brand}\nPrice: ₹${product.price}\n\nPlease help.`;
    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning text-center">Product not found.</div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i} className={`fa fa-star ${i <= rating ? 'text-warning' : 'text-muted'}`}></i>
      );
    }
    return stars;
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Main Product Section */}
        <div className="col-lg-8">
          <div className="row g-4">
            {/* Product Image */}
            <div className="col-md-6">
              <div className="product-image-container">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="img-fluid rounded shadow product-image"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <div className="product-info">
                <p className="text-muted small mb-1">{product.brand}</p>
                <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
                <div className="rating mb-3">
                  {renderStars(product.rating)} <span className="ms-2">({product.rating}/5)</span>
                </div>
                <h3 className="text-primary fw-bold mb-3">₹{product.price}</h3>
                <p className={`stock-status mb-3 ${product.stock === 'In Stock' ? 'text-success' : 'text-danger'}`}>
                  {product.stock}
                </p>
                <p className="text-muted mb-4">{(product.description || "This high-quality automotive part is designed for optimal performance and reliability. Perfect for your vehicle maintenance needs.").substring(0, 150)}...</p>

                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={handleOrderOnWhatsApp}
                    disabled={product.stock !== 'In Stock'}
                  >
                    <i className="fab fa-whatsapp me-2"></i>Order on WhatsApp
                  </button>
                  <button
                    className="btn btn-outline-primary btn-lg"
                    onClick={handleAskOnWhatsApp}
                  >
                    <i className="fab fa-whatsapp me-2"></i>Ask on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Features</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Genuine Quality</li>
                <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Long Lasting</li>
                <li className="mb-2"><i className="fa fa-check text-success me-2"></i>Trusted Brand</li>
                <li><i className="fa fa-check text-success me-2"></i>Best Price</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Description */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Detailed Description</h5>
            </div>
            <div className="card-body">
              <p>{product.description || "This high-quality automotive part is designed for optimal performance and reliability. Perfect for your vehicle maintenance needs."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="row mt-5">
        <div className="col-12">
          <h3 className="mb-4">Related Products</h3>
          <div className="row g-4">
            {relatedProducts.map((related) => (
              <div key={related._id} className="col-md-3">
                <Link to={`/product/${related._id}`} className="text-decoration-none">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={getImageUrl(related.image)}
                      className="card-img-top"
                      alt={related.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body">
                      <p className="text-muted small">{related.brand}</p>
                      <h6 className="card-title">{related.name}</h6>
                      <p className="text-primary fw-bold">₹{related.price}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;