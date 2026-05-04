import React, { useState } from "react";

function Newsletter() {
  const [quickName, setQuickName] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickStatus, setQuickStatus] = useState('');
  const API_URL = '/api';

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleQuickNameChange = (e) => {
    setQuickName(e.target.value);
    setQuickStatus('');
  };

  const handleQuickEmailChange = (e) => {
    setQuickEmail(e.target.value);
    setQuickStatus('');
  };

  const handleQuickMessageChange = (e) => {
    setQuickMessage(e.target.value);
    setQuickStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quickEmail.trim() || !quickMessage.trim()) {
      setQuickStatus('Please enter your email address and a short message.');
      return;
    }

    if (!validateEmail(quickEmail)) {
      setQuickStatus('Please enter a valid email address.');
      return;
    }

    if (quickMessage.trim().length < 10) {
      setQuickStatus('Please enter a longer message so we can better assist you.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: quickName, email: quickEmail, message: quickMessage, form: 'newsletter-quick-enquiry' }),
      });
      const result = await response.json();
      if (response.ok) {
        setQuickStatus(result.message || 'Thank you! We will contact you soon.');
        setQuickName('');
        setQuickEmail('');
        setQuickMessage('');
      } else {
        setQuickStatus(result.error || 'Unable to send your enquiry. Please try again later.');
      }
    } catch (error) {
      console.error(error);
      setQuickStatus('Unable to send your enquiry. Please try again later.');
    }
  };

  return (
    <div className="container-fluid newsletter mt-6 wow fadeIn" data-wow-delay="0.1s">
      <div className="container pb-5">
        <div className="bg-white p-5 mb-5">
          <div className="row g-5">

            <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <h1 className="display-6 text-uppercase mb-4">Request a Custom Quote</h1>

              <div className="d-flex">
                <i className="far fa-envelope-open fa-3x text-primary me-4"></i>

                <p className="fs-5 fst-italic mb-0">
                  Share your part requirements and our team will provide a tailored quote,
                  stock availability and supplier guidance.
                </p>
              </div>
            </div>

            <form className="col-md-6 wow fadeIn" data-wow-delay="0.5s" onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={quickName}
                  onChange={handleQuickNameChange}
                  className="form-control border-0 bg-light"
                  id="name"
                  placeholder="Your Name"
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  value={quickEmail}
                  onChange={handleQuickEmailChange}
                  className="form-control border-0 bg-light"
                  id="mail"
                  placeholder="Your Email"
                />
                <label htmlFor="mail">Your Email</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  value={quickMessage}
                  onChange={handleQuickMessageChange}
                  className="form-control border-0 bg-light"
                  id="message"
                  placeholder="Your Message"
                  style={{ height: '120px' }}
                />
                <label htmlFor="message">Your Message</label>
              </div>

              {quickStatus && (
                <div className="alert alert-info mb-3">{quickStatus}</div>
              )}

              <button className="btn btn-primary w-100 py-3" type="submit">
                Request Quote
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;