import React, { useEffect, useState } from "react";
// import headerImg from "../assets/images/page-header.jpg";
import '../assets/css/style.css'
const Contact = () => {
    const [contactData, setContactData] = useState({ name: '', email: '', mobile: '', city: '', message: '' });
    const [contactStatus, setContactStatus] = useState('');
    const [quickName, setQuickName] = useState('');
    const [quickEmail, setQuickEmail] = useState('');
    const [quickMessage, setQuickMessage] = useState('');
    const [quickStatus, setQuickStatus] = useState('');
    const [inquiries, setInquiries] = useState([]);
    const [inquiryStatus, setInquiryStatus] = useState('');

    const API_URL = '/api';

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const fetchInquiries = async (email) => {
        if (!email || !validateEmail(email)) {
            setInquiries([]);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/contact?email=${encodeURIComponent(email.toLowerCase().trim())}`);
            const data = await response.json();
            if (response.ok) {
                setInquiries(data);
                setInquiryStatus('');
            } else {
                setInquiryStatus(data.error || 'Unable to load your enquiries.');
            }
        } catch (error) {
            console.error(error);
            setInquiryStatus('Unable to load your enquiries.');
            setInquiries([]);
        }
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('userEmail');
        if (validateEmail(userEmail)) {
            fetchInquiries(userEmail);
        }
    }, []);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactData((prev) => ({ ...prev, [name]: value }));
        setContactStatus('');
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message } = contactData;

        if (!name.trim() || !email.trim() || !message.trim()) {
            setContactStatus('Please fill in your name, email, and message.');
            return;
        }

        if (!validateEmail(email)) {
            setContactStatus('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...contactData, form: 'contact' }),
            });

            const result = await response.json();

            if (response.ok) {
                setContactStatus(result.message || 'Thank you! Your message has been sent.');
                setContactData({ name: '', email: '', mobile: '', city: '', message: '' });
                fetchInquiries(email);
            } else {
                setContactStatus(result.error || 'Unable to send your message. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            setContactStatus('Unable to send your message. Please try again later.');
        }
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

    const handleQuickSubmit = async (e) => {
        e.preventDefault();

        if (!quickEmail.trim() || !quickMessage.trim()) {
            setQuickStatus('Please enter your email address and a message.');
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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: quickName, email: quickEmail, message: quickMessage, form: 'contact-quick-enquiry' }),
            });

            const result = await response.json();

            if (response.ok) {
                setQuickStatus(result.message || 'Thank you! We will contact you soon.');
                setQuickName('');
                setQuickEmail('');
                setQuickMessage('');
                fetchInquiries(quickEmail);
            } else {
                setQuickStatus(result.error || 'Unable to send your enquiry. Please try again later.');
            }
        } catch (error) {
            console.error(error);
            setQuickStatus('Unable to send your enquiry. Please try again later.');
        }
    };

    return (
        <div>

            {/* Page Header Start */}
            <div
                className="container-fluid page-header pt-5 mb-6 wow fadeIn"
                // style={{ backgroundImage: `url(${headerImg})` }}
                data-wow-delay="0.1s"
            >
                <div className="container text-center pt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="bg-white p-5">
                                <h1 className="display-6 text-uppercase mb-3 animated slideInDown">
                                    Contact
                                </h1>

                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center mb-0">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>

                                        <li className="breadcrumb-item" aria-current="page">
                                            Contact
                                        </li>

                                        <li className="breadcrumb-item">
                                            <a href="/products">Products</a>
                                        </li>
                                    </ol>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Page Header End */}



            {/* Contact Section */}
            <div className="pt-6 pb-6">
                <div className="container-fluid appoinment py-5 wow fadeIn">
                    <div className="container pt-5">

                        <div className="row gy-5 gx-0">

                            {/* Left Info */}
                            <div className="col-lg-6 pe-lg-5">

                                <h1 className="display-6 text-uppercase text-white mb-4">
                                    Have Any Query? Feel Free To Contact Us
                                </h1>

                                <p className="text-white mb-5">
                                    GearLink Solution Pvt Ltd supplies high-quality automotive spare parts to
                                    dealers, workshops, and vehicle owners across India.
                                    If you have any enquiry regarding products, orders, or partnerships,
                                    please contact our team and we will assist you quickly.
                                </p>


                                <div className="d-flex align-items-start">

                                    <div className="btn-lg-square bg-white">
                                        <i className="bi bi-envelope-at text-dark fs-3"></i>
                                    </div>

                                    <div className="ms-3">
                                        <h6 className="text-white text-uppercase">Mail Us</h6>
                                        <span className="text-white">gearlinks19@gmail.com</span>
                                    </div>

                                </div>


                                <hr className="bg-body" />


                                <div className="d-flex align-items-start">

                                    <div className="btn-lg-square bg-white">
                                        <i className="bi bi-telephone text-dark fs-3"></i>
                                    </div>

                                    <div className="ms-3">
                                        <h6 className="text-white text-uppercase">Call Us</h6>
                                        <span className="text-white">+91 98765 43210</span>
                                    </div>

                                </div>

                            </div>


                            {/* Contact Form */}
                            <div className="col-lg-6 mb-n5">

                                <div className="bg-white p-5">

                                    <h2 className="text-uppercase mb-4">Contact Us</h2>

                                    <form className="row g-3" onSubmit={handleContactSubmit}>

                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={contactData.name}
                                                    onChange={handleContactChange}
                                                    className="form-control border-0 bg-light"
                                                    id="name"
                                                    placeholder="Your Name"
                                                />
                                                <label htmlFor="name">Your Name</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={contactData.email}
                                                    onChange={handleContactChange}
                                                    className="form-control border-0 bg-light"
                                                    id="mail"
                                                    placeholder="Your Email"
                                                />
                                                <label htmlFor="mail">Your Email</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={contactData.mobile}
                                                    onChange={handleContactChange}
                                                    className="form-control border-0 bg-light"
                                                    id="mobile"
                                                    placeholder="Mobile"
                                                />
                                                <label htmlFor="mobile">Your Mobile</label>
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={contactData.city}
                                                    onChange={handleContactChange}
                                                    className="form-control border-0 bg-light"
                                                    id="city"
                                                    placeholder="City"
                                                />
                                                <label htmlFor="city">City</label>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="form-floating">
                                                <textarea
                                                    name="message"
                                                    value={contactData.message}
                                                    onChange={handleContactChange}
                                                    className="form-control border-0 bg-light"
                                                    placeholder="Message"
                                                    id="message"
                                                    style={{ height: "130px" }}
                                                ></textarea>

                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>

                                        {contactStatus && (
                                            <div className="col-12">
                                                <div className="alert alert-info mb-0">{contactStatus}</div>
                                            </div>
                                        )}

                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-primary w-100 py-3">
                                                Submit Now
                                            </button>
                                        </div>

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>

                {inquiries.length > 0 && (
                    <div className="container-fluid mt-5">
                        <div className="container pb-5">
                            <div className="bg-white p-5 mb-5">
                                <h2 className="text-uppercase mb-4">Your Previous Enquiries</h2>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Message</th>
                                                <th>Status</th>
                                                <th>Reply</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inquiries.map((inq) => (
                                                <tr key={inq._id || inq.id}>
                                                    <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                                                    <td style={{ maxWidth: '260px' }}>{inq.message}</td>
                                                    <td>{inq.status || 'Pending'}</td>
                                                    <td style={{ maxWidth: '260px' }}>{inq.reply || '-'} </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {inquiryStatus && (
                    <div className="container-fluid mt-3">
                        <div className="container pb-5">
                            <div className="alert alert-info">{inquiryStatus}</div>
                        </div>
                    </div>
                )}

                {/* Google Map */}
                <div className="container-fluid px-0">

                    <iframe
                        className="w-100 h-100"
                        src="https://www.google.com/maps?q=Mumbai%20India&output=embed"
                        style={{ minHeight: "500px", border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        title="map"
                    ></iframe>

                </div>

            </div>



            {/* Quick Enquiry */}
            <div className="container-fluid newsletter mt-6">

                <div className="container pb-5">

                    <div className="bg-white p-5 mb-5">

                        <div className="row g-5">

                            <div className="col-md-6">

                                <h1 className="display-6 text-uppercase mb-4">
                                    Quick Enquiry
                                </h1>

                                <div className="d-flex">

                                    <i className="far fa-envelope-open fa-3x text-primary me-4"></i>

                                    <p className="fs-5 fst-italic mb-0">
                                        Have questions about automotive parts or bulk orders?
                                        Contact GearLink and our team will assist you with
                                        product availability, pricing and availability information.
                                    </p>

                                </div>

                            </div>


                            <form className="col-md-6" onSubmit={handleQuickSubmit}>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        name="quickName"
                                        value={quickName}
                                        onChange={handleQuickNameChange}
                                        className="form-control border-0 bg-light"
                                        placeholder="Your Name"
                                    />
                                    <label>Your Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        name="quickEmail"
                                        value={quickEmail}
                                        onChange={handleQuickEmailChange}
                                        className="form-control border-0 bg-light"
                                        placeholder="Your Email"
                                    />
                                    <label>Enter Your Email</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea
                                        name="quickMessage"
                                        value={quickMessage}
                                        onChange={handleQuickMessageChange}
                                        className="form-control border-0 bg-light"
                                        placeholder="Your Message"
                                        style={{ height: '120px' }}
                                    />
                                    <label>Your Message</label>
                                </div>

                                {quickStatus && (
                                    <div className="alert alert-info mb-3">{quickStatus}</div>
                                )}

                                <button type="submit" className="btn btn-primary w-100 py-3">
                                    Send Enquiry
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Contact;