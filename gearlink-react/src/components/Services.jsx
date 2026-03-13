import brakePad from "../assets/img/brake-pad.jpg";
import oilFilter from "../assets/img/oil-filter.jpg";
import battery from "../assets/img/car-battery.jpg";
import shock from "../assets/img/shock-absorber.jpg";
import headlight from "../assets/img/headlight.jpg";
import clutch from "../assets/img/clutch-plate.jpg";
import radiator from "../assets/img/radiator.jpg";
import spark from "../assets/img/spark-plug.jpg";

const products = [
  { id: 1, name: "Bosch Brake Pads", price: "₹2500", image: brakePad },
  { id: 2, name: "Engine Oil Filter", price: "₹850", image: oilFilter },
  { id: 3, name: "Car Battery 12V", price: "₹4500", image: battery },
  { id: 4, name: "Shock Absorber", price: "₹3200", image: shock },
  { id: 5, name: "Car Headlight Assembly", price: "₹2800", image: headlight },
  { id: 6, name: "Clutch Plate Kit", price: "₹3900", image: clutch },
  { id: 7, name: "Car Radiator", price: "₹5200", image: radiator },
  { id: 8, name: "Spark Plug Set", price: "₹1200", image: spark }
];

function Services() {
  return (
    <div className="container-fluid service pt-6 pb-6">
      <div className="container">

        {/* Section Title */}
        <div
          className="text-center mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="display-6 text-uppercase mb-5">
            Automotive Spare Parts & Accessories
          </h1>
          <p>
            GearLink supplies high-quality automotive components for reliable vehicle performance.
          </p>
        </div>

        {/* Product Grid */}
        <div className="row g-4">

          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-6">
              <div className="card shadow h-100">

                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />

                <div className="card-body text-center">
                  <h5>{product.name}</h5>
                  <p>{product.price}</p>

                  <button className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Services;