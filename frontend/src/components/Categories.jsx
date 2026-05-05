import React from "react";

const categories = [
  {
    id: 1,
    icon: "fa-cogs",
    title: "Engine Parts",
    description: "Pistons, oil filters, timing belts, gaskets and more."
  },
  {
    id: 2,
    icon: "fa-car",
    title: "Brake System",
    description: "Brake pads, discs, brake fluid and braking components."
  },
  {
    id: 3,
    icon: "fa-bolt",
    title: "Electrical Parts",
    description: "Batteries, spark plugs, sensors and wiring components."
  },
  {
    id: 4,
    icon: "fa-wrench",
    title: "Suspension",
    description: "Shock absorbers, struts, control arms and springs."
  }
];

const Categories = () => {
  return (
    <div className="container py-5">
      
      <div className="text-center mb-5">
        <h1 className="text-uppercase">Automotive Parts Categories</h1>
        <p>Browse a wide range of automobile spare parts supplied by GearLink.</p>
      </div>

      <div className="row g-4">
        {categories.map((category) => (
          <div className="col-lg-3 col-md-6" key={category.id}>
            <div className="card text-center p-4 shadow">
              <i className={`fa ${category.icon} fa-3x text-primary mb-3`}></i>
              <h5>{category.title}</h5>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;
