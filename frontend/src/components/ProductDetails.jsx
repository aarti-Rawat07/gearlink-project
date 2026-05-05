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

const sampleProducts = [
    { id: 1, _id: "1", name: "Premium Brake Pads", brand: "Brembo", category: "Brakes", price: 2500, oldPrice: 3000, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 2, _id: "2", name: "High Performance Oil Filter", brand: "K&N", category: "Engine", price: 850, rating: 4.5, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 3, _id: "3", name: "Heavy Duty Car Battery", brand: "Bosch", category: "Electrical", price: 4500, oldPrice: 5000, rating: 4.9, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 4, _id: "4", name: "Gas Shock Absorber", brand: "Monroe", category: "Suspension", price: 3200, rating: 4.2, stock: "Out of Stock", image: "/images/shock-absorber.jpg" },
    { id: 5, _id: "5", name: "LED Headlight Bulbs", brand: "Philips", category: "Electrical", price: 2800, oldPrice: 3500, rating: 4.7, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 6, _id: "6", name: "Performance Clutch Kit", brand: "Exedy", category: "Transmission", price: 8900, rating: 4.6, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 7, _id: "7", name: "Aluminum Radiator", brand: "Mishimoto", category: "Engine", price: 5200, oldPrice: 6000, rating: 4.4, stock: "In Stock", image: "/images/radiator.jpg" },
    { id: 8, _id: "8", name: "Iridium Spark Plugs", brand: "NGK", category: "Engine", price: 1200, rating: 4.8, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 9, _id: "9", name: "Synthetic Motor Oil 5W-40", brand: "Castrol", category: "Engine", price: 2100, rating: 4.9, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 10, _id: "10", name: "Wiper Blades Set", brand: "Bosch", category: "Accessories", price: 600, rating: 4.3, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 11, _id: "11", name: "Alternator Assembly", brand: "Denso", category: "Electrical", price: 6500, oldPrice: 7200, rating: 4.5, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 12, _id: "12", name: "Timing Belt Kit", brand: "Gates", category: "Engine", price: 2500, rating: 4.6, stock: "Out of Stock", image: "/images/radiator.jpg" },
    { id: 13, _id: "13", name: "Fuel Pump Module", brand: "Bosch", category: "Engine", price: 3500, rating: 4.4, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 14, _id: "14", name: "Cabin Air Filter", brand: "K&N", category: "Accessories", price: 900, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 15, _id: "15", name: "Ignition Coil", brand: "NGK", category: "Electrical", price: 1800, rating: 4.6, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 16, _id: "16", name: "Brake Rotors Pair", brand: "Brembo", category: "Brakes", price: 5500, oldPrice: 6200, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 17, _id: "17", name: "Suspension Control Arm", brand: "Moog", category: "Suspension", price: 2800, rating: 4.3, stock: "In Stock", image: "/images/shock-absorber.jpg" },
    { id: 18, _id: "18", name: "Tail Light Assembly", brand: "Hella", category: "Electrical", price: 3100, rating: 4.5, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 19, _id: "19", name: "Manual Transmission Fluid", brand: "Castrol", category: "Transmission", price: 1100, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 20, _id: "20", name: "Racing Steering Wheel", brand: "Momo", category: "Accessories", price: 8500, oldPrice: 9500, rating: 4.9, stock: "Out of Stock", image: "/images/clutch-plate.jpg" },
];

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
        const response = await axios.get(`/api/products/${id}`, { timeout: 3000 });
        if (response.data) {
          setProduct(response.data);
          setLoading(false);
        } else {
          throw new Error("No data");
        }
      } catch (err) {
        console.error('Failed to load product details, using sample data', err);
        const sample = sampleProducts.find(p => p._id === id || String(p.id) === id);
        if (sample) {
          setProduct(sample);
          setLoading(false);
        } else {
          setError('Failed to load product details');
          setLoading(false);
        }
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('/api/products', { timeout: 3000 });
        let allProducts = [];
        if (response.data && response.data.length > 0) {
          allProducts = response.data;
        } else {
          allProducts = sampleProducts;
        }
        
        const filtered = allProducts.filter(p => (p._id || String(p.id)) !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
      } catch (err) {
        console.error('Failed to load related products, using sample data', err);
        const filtered = sampleProducts.filter(p => (p._id || String(p.id)) !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 4));
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
