import React from "react";
import { Link } from "react-router-dom";

import aboutImg from "../assets/img/auto-about.jpg";
import bosch from "../assets/img/bosch.jpg";
import denso from "../assets/img/denso.jpg";
import valeo from "../assets/img/valeo.jpg";
import skf from "../assets/img/skf.jpg";

const About = () => {
    return (
        <div>

            {/* Page Header */}
            <div className="container-fluid page-header pt-5 mb-6 wow fadeIn">
                <div className="container text-center pt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="bg-white p-5">

                                <h1 className="display-6 text-uppercase mb-3">
                                    About
                                </h1>

                                <nav>
                                    <ol className="breadcrumb justify-content-center mb-0">

                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>

                                        <li className="breadcrumb-item active">
                                            About
                                        </li>

                                    </ol>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="container-fluid pt-6 pb-6">
                <div className="container">
                    <div className="row g-5">

                        <div className="col-lg-6 wow fadeIn">
                            <div className="about-img">
                                <img className="img-fluid w-100" src={aboutImg} alt="about" />
                            </div>
                        </div>

                        <div className="col-lg-6 wow fadeIn">

                            <h1 className="display-6 text-uppercase mb-4">
                                Reliable Automotive Parts Supplier
                            </h1>

                            <p className="mb-4">
                                GearLink Solution Pvt Ltd is a trusted supplier of high-quality automotive parts and vehicle components.
                                We provide engine parts, braking systems, suspension components, electrical assemblies, filters,
                                and other essential automobile accessories sourced from reliable manufacturers.

                                Our goal is to simplify the automotive supply chain by connecting dealers, workshops, service centers,
                                and vehicle owners with genuine parts through a modern digital platform.
                            </p>

                            <div className="row g-5 mb-4">

                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="fa fa-users-cog fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">
                                            Trusted Supplier Network
                                        </h5>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 btn-xl-square bg-light me-3">
                                            <i className="fa fa-tachometer-alt fa-2x text-primary"></i>
                                        </div>
                                        <h5 className="lh-base text-uppercase mb-0">
                                            Fast Nationwide Delivery
                                        </h5>
                                    </div>
                                </div>

                            </div>

                            <p><i className="fa fa-check-square text-primary me-3"></i>Wide range of genuine automotive spare parts</p>
                            <p><i className="fa fa-check-square text-primary me-3"></i>Reliable sourcing from trusted manufacturers</p>
                            <p><i className="fa fa-check-square text-primary me-3"></i>Easy online ordering for dealers and workshops</p>

                            <div className="border border-5 border-primary p-4 text-center mt-4">

                                <h4 className="lh-base text-uppercase mb-0">
                                    Providing Reliable Automotive Parts for Workshops, Dealers & Vehicle Owners
                                </h4>

                            </div>

                        </div>

                    </div>
                </div>
            </div>


            {/* Features Section */}
            <div className="container-fluid pt-6 pb-6">
                <div className="container pt-4">

                    <div className="row g-0 feature-row wow fadeIn">

                        <div className="col-md-6 col-lg-3">
                            <div className="feature-item border h-100">

                                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                                    <i className="fa fa-hammer fa-2x text-white"></i>
                                </div>

                                <div className="p-5 pt-0">

                                    <h5 className="text-uppercase mb-3">
                                        Genuine Spare Parts
                                    </h5>

                                    <p>
                                        High-quality automobile parts sourced from trusted manufacturers.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="feature-item border h-100">

                                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                                    <i className="fa fa-dollar-sign fa-2x text-white"></i>
                                </div>

                                <div className="p-5 pt-0">

                                    <h5 className="text-uppercase">
                                        Competitive Pricing
                                    </h5>

                                    <p>
                                        Best market pricing for dealers, workshops, and vehicle owners.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="feature-item border h-100">

                                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                                    <i className="fa fa-check-double fa-2x text-white"></i>
                                </div>

                                <div className="p-5 pt-0">

                                    <h5 className="text-uppercase">
                                        Reliable Suppliers
                                    </h5>

                                    <p>
                                        Strong supplier network ensuring consistent product availability.
                                    </p>

                                </div>

                            </div>
                        </div>

                        <div className="col-md-6 col-lg-3">
                            <div className="feature-item border h-100">

                                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                                    <i className="fa fa-tools fa-2x text-white"></i>
                                </div>

                                <div className="p-5 pt-0">

                                    <h5 className="text-uppercase">
                                        Fast Delivery
                                    </h5>

                                    <p>
                                        Efficient logistics ensuring quick and safe delivery of parts.
                                    </p>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>


            {/* Brands Section */}
            <section className="brands">
                <div className="brand-container">

                    <div className="brand-card">
                        <img src={bosch} alt="Bosch" />
                        <h3>Bosch</h3>
                        <p>Brake Systems & Electrical Components</p>
                    </div>

                    <div className="brand-card">
                        <img src={denso} alt="Denso" />
                        <h3>Denso</h3>
                        <p>Automotive Electronics & Sensors</p>
                    </div>

                    <div className="brand-card">
                        <img src={valeo} alt="Valeo" />
                        <h3>Valeo</h3>
                        <p>Lighting Systems & Electrical Parts</p>
                    </div>

                    <div className="brand-card">
                        <img src={skf} alt="SKF" />
                        <h3>SKF</h3>
                        <p>Bearings & Engine Components</p>
                    </div>

                </div>
            </section>


            {/* Quick Enquiry */}
            <div className="container-fluid newsletter mt-6 wow fadeIn">
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
                                        Looking for genuine automotive spare parts?
                                        Send us your enquiry and our team will contact you with the best product options and pricing.
                                    </p>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="form-floating mb-3">

                                    <input
                                        type="email"
                                        className="form-control border-0 bg-light"
                                        id="mail"
                                        placeholder="Your Email"
                                    />

                                    <label htmlFor="mail">
                                        Your Email
                                    </label>

                                </div>

                                <button className="btn btn-primary w-100 py-3">
                                    Submit Enquiry
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default About;