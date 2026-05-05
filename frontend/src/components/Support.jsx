import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Support.css";

const Support = () => {
  const chatInputRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [chatMessages, setChatMessages] = useState([
    { sender: "AI", text: "Hi! I can help with products, carts, and support requests. Ask me anything." },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleOpenChat = () => {
    setShowChat(true);
    setTimeout(() => chatInputRef.current?.focus(), 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your request. Our support team will contact you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleChatSend = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { sender: "User", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    const input = chatInput.toLowerCase();
    let aiResponse = "I'm sorry, I didn't understand that. Please ask about products, carts, or support.";

    if (input.includes("order") || input.includes("status")) {
      aiResponse = "You can view your past orders on the Order History page. We do not offer real-time delivery tracking, but you can review your order status here.";
    } else if (input.includes("product") || input.includes("buy")) {
      aiResponse = "Browse products on the Products page, then add items to your cart to purchase.";
    } else if (input.includes("cart")) {
      aiResponse = "Your cart is available at the Cart page, where you can review items and checkout.";
    } else if (input.includes("support") || input.includes("help")) {
      aiResponse = "Our support team is ready. Submit the form or ask me specific questions about your order.";
    } else if (input.includes("contact")) {
      aiResponse = "You can email us at gearlinks19@gmail.com or call +91 98765 43210.";
    }

    setTimeout(() => {
      setChatMessages((prev) => [...prev, { sender: "AI", text: aiResponse }]);
    }, 600);

    setChatInput("");
  };

  return (
    <div className="support-page">
      <div className="container-fluid page-header pt-5 pb-5 support-header">
        <div className="container">
          <div className="support-hero">
            <div className="hero-text">
              <span className="hero-label">Support Center</span>
              <h1 className="hero-title">Fast help for products and support</h1>
              <p className="hero-copy">Need support? Use our quick actions or chat with our assistant to get fast answers and submit requests with confidence.</p>
              <div className="hero-tags">
                <span>Product guidance</span>
                <span>History lookup</span>
                <span>Live support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container support-content">
        <div className="support-quick-actions">
          <div className="support-action-card support-action-history">
            <div className="action-icon">🕒</div>
            <h4>Order History</h4>
            <p>Review your past purchases and reorder items quickly.</p>
            <Link to="/history" className="support-action-button">View History</Link>
          </div>
          <div className="support-action-card support-action-product">
            <div className="action-icon">🔎</div>
            <h4>Product Help</h4>
            <p>Find the right spare parts, compare products, and get buying guidance.</p>
            <Link to="/products" className="support-action-button">Browse Products</Link>
          </div>
          <div className="support-action-card support-action-chat">
            <div className="action-icon">💬</div>
            <h4>AI Support</h4>
            <p>Ask the AI assistant for instant answers about orders, carts, and support.</p>
            <button type="button" className="support-action-button" onClick={handleOpenChat}>
              Open Chat
            </button>
          </div>
        </div>

        <div className="row g-4 align-items-start">
          <div className={showChat ? "col-lg-7" : "col-lg-12"}>
            <div className="support-card support-form-card">
              <div className="support-card-header">
                <div>
                  <span className="card-pill">Need help?</span>
                  <h2>Contact Support</h2>
                </div>
              </div>
              <p className="card-subtitle">Submit a request and our team will get back to you as soon as possible.</p>
              <form onSubmit={handleSubmit} className="support-form">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="col-sm-6">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message">How can we help?</label>
                    <textarea id="message" name="message" value={form.message} onChange={handleChange} rows="6" required></textarea>
                  </div>
                  <div className="col-12 text-end">
                    <button type="submit" className="submit-btn">Submit Request</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {showChat && (
            <div className="col-lg-5">
              <div className="support-card support-chat-card">
                <div className="support-card-header support-chat-header">
                  <div>
                    <span className="card-pill card-pill-chat">AI Assistant</span>
                    <h2>Chat with Support</h2>
                  </div>
                  <button className="chat-close-btn" onClick={() => setShowChat(false)} title="Close Chat">×</button>
                </div>
                <p className="card-subtitle">Start a quick conversation and get help for products, carts, and support questions.</p>
                <div className="chat-window">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={"chat-message " + (msg.sender === "AI" ? "ai" : "user")}>
                      <strong>{msg.sender}:</strong>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
                <form className="chat-form" onSubmit={handleChatSend}>
                  <input
                    ref={chatInputRef}
                    className="chat-input"
                    type="text"
                    placeholder="Ask a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Support;
