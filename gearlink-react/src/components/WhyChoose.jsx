const reasons = [
  {
    icon: "fa-cogs",
    title: "Wide Product Range",
    description:
      "We supply engine components, brake systems, suspension parts, batteries, filters and many other automotive spare parts.",
  },
  {
    icon: "fa-truck",
    title: "Fast Delivery",
    description:
      "Our logistics network ensures quick and reliable delivery of automotive parts to workshops, dealers and customers.",
  },
  {
    icon: "fa-check-circle",
    title: "Genuine Products",
    description:
      "All automotive parts are sourced from trusted manufacturers ensuring durability, performance and reliability.",
  },
  {
    icon: "fa-users",
    title: "Trusted Supplier Network",
    description:
      "We work with reliable automotive brands and suppliers to ensure consistent product availability and quality.",
  },
];

const WhyChoose = () => {
  return (
    <div className="container-fluid bg-dark text-light pt-6 pb-6">
      <div className="container">

        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <h1 className="display-6 text-uppercase text-white">
            Why Choose GearLink
          </h1>

          <p>
            GearLink Solution Pvt Ltd is committed to delivering reliable
            automotive parts with quality assurance, competitive pricing and
            fast delivery across India.
          </p>
        </div>

        <div className="row g-4">

          {reasons.map((item, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="text-center border border-primary p-4 h-100 reason-card">

                <i className={`fa ${item.icon} fa-3x text-primary mb-3`}></i>

                <h5 className="text-uppercase text-white">
                  {item.title}
                </h5>

                <p>{item.description}</p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default WhyChoose;