import React from "react";

function Newsletter() {
  return (
    <div className="container-fluid newsletter mt-6 wow fadeIn" data-wow-delay="0.1s">
      <div className="container pb-5">
        <div className="bg-white p-5 mb-5">
          <div className="row g-5">

            <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
              <h1 className="display-6 text-uppercase mb-4">Quick Enquiry</h1>

              <div className="d-flex">
                <i className="far fa-envelope-open fa-3x text-primary me-4"></i>

                <p className="fs-5 fst-italic mb-0">
                  Have questions about automotive parts or bulk orders?
                  Contact GearLink and our team will assist you with
                  product availability, pricing and delivery information.
                </p>
              </div>
            </div>

            <div className="col-md-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control border-0 bg-light"
                  id="mail"
                  placeholder="Your Email"
                />
                <label htmlFor="mail">Enter Your Email</label>
              </div>

              <button className="btn btn-primary w-100 py-3" type="submit">
                Send Enquiry
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;