import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="container-fluid bg-dark footer py-5 wow fadeIn">
      <div className="container py-5">

        <div className="row g-5">

          {/* Office Info */}
          <div className="col-lg-4 col-md-6">

            <h5 className="text-uppercase text-light mb-4">Our Office</h5>

            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary me-3"></i>
              Mumbai, India
            </p>

            <p className="mb-2">
              <i className="fa fa-phone-alt text-primary me-3"></i>
              +91 98765 43210
            </p>

            <p className="mb-2">
              <i className="fa fa-envelope text-primary me-3"></i>
              info@gearlink.in
            </p>

            <div className="d-flex pt-3">

              <a className="btn btn-square btn-light me-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a className="btn btn-square btn-light me-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>

              <a className="btn btn-square btn-light me-2" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a className="btn btn-square btn-light me-2" href="#">
                <i className="fab fa-youtube"></i>
              </a>

            </div>

          </div>


          {/* Quick Links */}
          <div className="col-lg-4 col-md-6">

            <h5 className="text-uppercase text-light mb-4">
              Quick Links
            </h5>

            <Link className="btn btn-link" to="/">Home</Link>

            <Link className="btn btn-link" to="/about">About Us</Link>

            <Link className="btn btn-link" to="/products">Products</Link>

            <Link className="btn btn-link" to="/contact">Contact</Link>

            <Link className="btn btn-link" to="/support">Support</Link>

          </div>


          {/* Customer Support */}
          <div className="col-lg-4 col-md-6">

            <h5 className="text-uppercase text-light mb-4">
              Customer Support
            </h5>

            <p className="text-uppercase mb-2">Returns Policy</p>
            <p className="text-uppercase mb-2">Product Warranty</p>
            <p className="text-uppercase mb-2">Order Tracking</p>
            <p className="text-uppercase mb-2">Technical Support</p>

            <p className="mt-3">
              GearLink provides reliable automotive spare parts
              with fast delivery and trusted supplier partnerships.
            </p>

          </div>
    {/* copyrights */} 
 <div class="container-fluid text-body copyright py-4">
    <div class="container">
        <div class="row">

            <div class="col-md-6 text-center text-md-start">
                &copy; <a class="fw-semi-bold" href="#">GearLink Solution Pvt Ltd</a>,
                All Rights Reserved.
            </div>

            <div class="col-md-6 text-center text-md-end">
                Designed for Automotive Parts Supply Platform
            </div>

        </div>
    </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default Footer;