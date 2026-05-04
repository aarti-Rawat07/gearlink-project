const features = [
  {
    icon: "fa-hammer",
    title: "Quality Auto Parts for Every Vehicle",
    description:
      "GearLink supplies reliable automotive components to dealers, workshops and individual buyers.",
  },
  {
    icon: "fa-dollar-sign",
    title: "Affordable Pricing",
    description:
      "Competitive pricing with reliable quality automotive components for every vehicle type.",
  },
  {
    icon: "fa-check-double",
    title: "Trusted Manufacturers",
    description:
      "All parts are sourced from certified and trusted automotive manufacturers.",
  },
  {
    icon: "fa-tools",
    title: "Efficient Order Processing",
    description:
      "Advanced stock visibility and quick approval workflows keep parts moving smoothly through your supply chain.",
  },
];

const Feature = () => {
  return (
    <div className="container-fluid pt-6 pb-6">
      <div className="container pt-4">
        <div className="row g-0 feature-row">

          {features.map((item, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-3 wow fadeIn"
              data-wow-delay={`0.${index + 3}s`}
            >
              <div className="feature-item border h-100">

                <div className="feature-icon btn-xxl-square bg-primary mb-4 mt-n4">
                  <i className={`fa ${item.icon} fa-2x text-white`}></i>
                </div>

                <div className="p-5 pt-0">
                  <h5 className="text-uppercase mb-3">{item.title}</h5>

                  <p>{item.description}</p>

                  <a
                    className="position-relative text-body text-uppercase small d-flex justify-content-between"
                    href="#"
                  >
                    <b className="bg-white pe-3">View Catalog</b>
                    <i className="bi bi-arrow-right bg-white ps-3"></i>
                  </a>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Feature;