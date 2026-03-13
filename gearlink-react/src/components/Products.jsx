import React from "react";
import { Link } from "react-router-dom";

import brakePad from "../assets/img/brake-pad.jpg";
import oilFilter from "../assets/img/oil-filter.jpg";
import battery from "../assets/img/car-battery.jpg";
import shock from "../assets/img/shock-absorber.jpg";
import headlight from "../assets/img/headlight.jpg";
import clutch from "../assets/img/clutch-plate.jpg";
import radiator from "../assets/img/radiator.jpg";
import spark from "../assets/img/spark-plug.jpg";

const Products = () => {

    const products = [
        { id: 1, name: "Bosch Brake Pads", price: "₹2500", img: brakePad },
        { id: 2, name: "Engine Oil Filter", price: "₹850", img: oilFilter },
        { id: 3, name: "Car Battery 12V", price: "₹4500", img: battery },
        { id: 4, name: "Shock Absorber", price: "₹3200", img: shock },
        { id: 5, name: "Car Headlight Assembly", price: "₹2800", img: headlight },
        { id: 6, name: "Clutch Plate Kit", price: "₹3900", img: clutch },
        { id: 7, name: "Car Radiator", price: "₹5200", img: radiator },
        { id: 8, name: "Spark Plug Set", price: "₹1200", img: spark }
    ];

    return (
        <div>

            {/* Page Header */}
            <div className="container-fluid page-header pt-5 mb-6 wow fadeIn">
                <div className="container text-center pt-5">

                    <div className="row justify-content-center">
                        <div className="col-lg-7">

                            <div className="bg-white p-5">

                                <h1 className="display-6 text-uppercase mb-3">
                                    Products
                                </h1>

                                <nav>
                                    <ol className="breadcrumb justify-content-center mb-0">

                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>

                                        <li className="breadcrumb-item active">
                                            Product
                                        </li>

                                    </ol>
                                </nav>

                            </div>

                        </div>
                    </div>

                </div>
            </div>


            {/* Product Section */}
            <div className="container-fluid service pt-6 pb-6">
                <div className="container">

                    <div
                        className="text-center mx-auto wow fadeInUp"
                        style={{ maxWidth: "600px" }}
                    >
                        <h1 className="display-6 text-uppercase mb-5">
                            Automotive Spare Parts & Accessories
                        </h1>

                        <p>
                            GearLink supplies high-quality automotive components for reliable vehicle performance.
                        </p>
                    </div>


                    <div className="row g-4">

                        {products.map((product) => (

                            <div className="col-lg-3 col-md-6" key={product.id}>

                                <div className="card shadow">

                                    <img
                                        src={product.img}
                                        className="card-img-top"
                                        alt={product.name}
                                    />

                                    <div className="card-body text-center">

                                        <h5>{product.name}</h5>

                                        <p>{product.price}</p>

                                        <button className="btn btn-primary w-100">
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Products;