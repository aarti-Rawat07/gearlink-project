import React from "react";

// import images
import bosch from "../assets/img/bosch.jpg";
import denso from "../assets/img/denso.jpg";
import valeo from "../assets/img/valeo.jpg";
import skf from "../assets/img/skf.jpg";

const brands = [
  {
    id: 1,
    name: "Bosch",
    image: bosch,
    description: "Brake Systems & Electrical Components",
  },
  {
    id: 2,
    name: "Denso",
    image: denso,
    description: "Automotive Electronics & Sensors",
  },
  {
    id: 3,
    name: "Valeo",
    image: valeo,
    description: "Lighting Systems & Electrical Parts",
  },
  {
    id: 4,
    name: "SKF",
    image: skf,
    description: "Bearings & Engine Components",
  },
];

const Brands = () => {
  return (
    <section className="brands">
      <div className="brand-container">

        {brands.map((brand) => (
          <div className="brand-card" key={brand.id}>
            <img src={brand.image} alt={brand.name} />
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Brands;