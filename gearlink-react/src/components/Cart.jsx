import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartAndUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your cart.");
          setLoading(false);
          return;
        }

        const [cartRes, userRes] = await Promise.all([
          axios.get("http://localhost:5000/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCart(cartRes.data);
        setUser(userRes.data);
      } catch (err) {
        setError(err.response?.data?.error || "Unable to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndUser();
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/cart/item/${productId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
    } catch (err) {
      alert("Failed to update quantity: " + (err.response?.data?.error || err.message));
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(
        `http://localhost:5000/api/cart/item/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data);
      alert("Item removed from cart");
    } catch (err) {
      alert("Failed to remove item: " + (err.response?.data?.error || err.message));
    }
  };

  const handleBuyNow = async () => {
    if (!cart || !user) return;

    try {
      await axios.post("http://localhost:5000/api/cart/checkout", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      // Calculate total
      const total = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      // Construct message
      let message = `Hello, I want to buy the following items:\n\nUser: ${user.name}\nEmail: ${user.email}\n\nProducts:\n`;
      cart.products.forEach(item => {
        message += `${item.product.name} - Quantity: ${item.quantity} - Price: ₹${item.product.price * item.quantity}\n`;
      });
      message += `\nTotal Amount: ₹${total}`;

      // Encode message
      const encodedMessage = encodeURIComponent(message);

      // Open WhatsApp (assuming a business number, replace with actual)
      // For demo, open without phone, user can choose
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');

      alert("Order placed! Message sent to WhatsApp.");
    } catch (err) {
      alert("Failed to checkout: " + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;
  if (!cart || !cart.products.length) return (
    <div className="container py-5 text-center">
      <h2>Your cart is empty</h2>
      <p>Browse products and add items to your cart to see them here.</p>
      <a href="/products" className="btn btn-primary">Browse Products</a>
    </div>
  );

  const total = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '80vh' }}>
      <div className="mb-5">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a1a1a' }}>My Cart</h1>
        <p style={{ color: '#666', fontSize: '1rem' }}>You have {cart.products.length} item(s) in your cart</p>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.products.map((item) => (
            <div 
              key={item.product._id} 
              className="card mb-3 border-0 shadow-sm"
              style={{ 
                transition: 'all 0.3s ease',
                borderLeft: '4px solid #ff9500'
              }}
            >
              <div className="card-body p-4">
                <div className="row align-items-center">
                  {/* Product Image */}
                  <div className="col-md-3">
                    <img 
                      src={getImageUrl(item.product.image)} 
                      alt={item.product.name} 
                      style={{ 
                        width: '100%', 
                        height: '150px', 
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }} 
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="col-md-5">
                    <h5 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                      {item.product.name}
                    </h5>
                    <p style={{ color: '#ff9500', fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                      ₹{item.product.price.toLocaleString()}
                    </p>
                    
                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center gap-2">
                      <label style={{ fontWeight: '600', marginBottom: 0 }}>Qty:</label>
                      <div className="d-flex align-items-center" style={{ 
                        border: '1px solid #ddd', 
                        borderRadius: '5px',
                        padding: '0.25rem'
                      }}>
                        <button 
                          className="btn btn-sm"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                            opacity: item.quantity <= 1 ? 0.5 : 1,
                            fontSize: '1.2rem'
                          }}
                        >
                          −
                        </button>
                        <span style={{ 
                          padding: '0.25rem 1rem', 
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button 
                          className="btn btn-sm"
                          onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.75rem',
                            cursor: 'pointer',
                            fontSize: '1.2rem'
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price and Action */}
                  <div className="col-md-4 text-end">
                    <div className="mb-3">
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>Subtotal</p>
                      <h4 style={{ color: '#ff9500', fontWeight: '700', marginBottom: 0 }}>
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </h4>
                    </div>
                    <button 
                      className="btn w-100"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      style={{
                        backgroundColor: '#f8f9fa',
                        color: '#dc3545',
                        border: '1px solid #dee2e6',
                        padding: '0.5rem 1rem',
                        borderRadius: '5px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#fee';
                        e.target.style.borderColor = '#dc3545';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#f8f9fa';
                        e.target.style.borderColor = '#dee2e6';
                      }}
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-lg" style={{ position: 'sticky', top: '20px' }}>
            <div className="card-body p-4">
              <h4 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Order Summary
              </h4>
              
              <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span style={{ fontWeight: '600' }}>₹{total.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ color: '#28a745', fontWeight: '600' }}>FREE</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span style={{ color: '#666' }}>Tax</span>
                  <span style={{ fontWeight: '600' }}>₹0</span>
                </div>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1a1a1a' }}>Total</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#ff9500' }}>
                  ₹{total.toLocaleString()}
                </span>
              </div>
              
              <button 
                className="btn w-100"
                onClick={handleBuyNow}
                style={{
                  backgroundColor: '#ff9500',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  border: 'none',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e68a00';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(255, 149, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff9500';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                PROCEED TO CHECKOUT
              </button>
              
              <button 
                className="btn w-100 mt-2"
                onClick={() => window.location.href = '/products'}
                style={{
                  backgroundColor: 'transparent',
                  color: '#ff9500',
                  border: '2px solid #ff9500',
                  padding: '0.75rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#fff5e6';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;