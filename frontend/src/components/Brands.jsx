import React from "react";

const brands = [
  {
    id: 1,
    name: "Bosch",
    image: "/images/bosch.jpg",
    description: "Brake Systems & Electrical Components",
  },
  {
    id: 2,
    name: "Denso",
    image: "/images/denso.jpg",
    description: "Automotive Electronics & Sensors",
  },
  {
    id: 3,
    name: "Valeo",
    image: "/images/valeo.jpg",
    description: "Lighting Systems & Electrical Parts",
  },
  {
    id: 4,
    name: "SKF",
    image: "/images/skf.jpg",
    description: "Bearings & Engine Components",
  },
];

const Brands = () => {
  return (
    <section className="brands">
      <div className="container pt-6 pb-6">
        <div className="section-header text-center mb-5">
          <span className="section-label">Our Partners</span>
          <h2>Trusted Automotive Brands</h2>
          <p>We partner with top global manufacturers to provide genuine parts and consistent stock availability.</p>
        </div>

        <div className="brand-container">

          {brands.map((brand) => (
            <div className="brand-card" key={brand.id}>
              <img src={brand.image} alt={brand.name} />
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Brands;
