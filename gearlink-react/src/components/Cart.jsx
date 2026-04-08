import React, { useState, useEffect } from "react";
import axios from "axios";
import brakePad from "../assets/img/brake-pad.jpg";
import oilFilter from "../assets/img/oil-filter.jpg";
import battery from "../assets/img/car-battery.jpg";
import shock from "../assets/img/shock-absorber.jpg";
import headlight from "../assets/img/headlight.jpg";
import clutch from "../assets/img/clutch-plate.jpg";
import radiator from "../assets/img/radiator.jpg";
import spark from "../assets/img/spark-plug.jpg";

const imageMap = {
    "brake-pad.jpg": brakePad,
    "oil-filter.jpg": oilFilter,
    "car-battery.jpg": battery,
    "shock-absorber.jpg": shock,
    "headlight.jpg": headlight,
    "clutch-plate.jpg": clutch,
    "radiator.jpg": radiator,
    "spark-plug.jpg": spark,
};

const getImageUrl = (image) => {
    if (!image) return brakePad;
    if (typeof image !== "string") return image;
    const filename = image.split("/").pop();
    return imageMap[filename] || image;
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
    <div className="container py-5">
      <h1>My Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cart.products.map((item) => (
            <div key={item.product._id} className="card mb-3 p-3">
              <div className="d-flex align-items-center">
                <img src={getImageUrl(item.product.image)} alt={item.product.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} className="me-3" />
                <div>
                  <h5>{item.product.name}</h5>
                  <p>Price: ₹{item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Total: ₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h4>Total: ₹{total}</h4>
            <button className="btn btn-success w-100" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;