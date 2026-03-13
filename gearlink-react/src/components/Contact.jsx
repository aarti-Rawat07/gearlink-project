import React from "react";
// import headerImg from "../assets/images/page-header.jpg";
import '../assets/css/style.css'
const Contact = () => {
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

                                    <div className="row g-3">

                                        <div className="col-sm-6">
                                            <div className="form-floating">
                                                <input
                                                    type="text"
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
                                                    className="form-control border-0 bg-light"
                                                    placeholder="Message"
                                                    id="message"
                                                    style={{ height: "130px" }}
                                                ></textarea>

                                                <label htmlFor="message">Message</label>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center">
                                            <button className="btn btn-primary w-100 py-3">
                                                Submit Now
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>



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
                                        product availability, pricing and delivery information.
                                    </p>

                                </div>

                            </div>


                            <div className="col-md-6">

                                <div className="form-floating mb-3">

                                    <input
                                        type="email"
                                        className="form-control border-0 bg-light"
                                        placeholder="Your Email"
                                    />

                                    <label>Enter Your Email</label>

                                </div>

                                <button className="btn btn-primary w-100 py-3">
                                    Send Enquiry
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Contact;