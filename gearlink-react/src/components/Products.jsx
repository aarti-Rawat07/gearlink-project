import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import brakePad from "../assets/img/brake-pad.jpg";
import oilFilter from "../assets/img/oil-filter.jpg";
import battery from "../assets/img/car-battery.jpg";
import shock from "../assets/img/shock-absorber.jpg";
import headlight from "../assets/img/headlight.jpg";
import clutch from "../assets/img/clutch-plate.jpg";
import radiator from "../assets/img/radiator.jpg";
import spark from "../assets/img/spark-plug.jpg";

const imageMap = {
    "brake-pad.jpg": brakePad,
    "oil-filter.jpg": oilFilter,
    "car-battery.jpg": battery,
    "shock-absorber.jpg": shock,
    "headlight.jpg": headlight,
    "clutch-plate.jpg": clutch,
    "radiator.jpg": radiator,
    "spark-plug.jpg": spark,
};

const getImageUrl = (image) => {
    if (!image) return brakePad;
    if (typeof image !== "string") return image;
    const filename = image.split("/").pop();
    return imageMap[filename] || image;
};

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                // Fallback to hardcoded if API fails
                setProducts([
                    { _id: 1, name: "Bosch Brake Pads", price: 2500, image: brakePad },
                    { _id: 2, name: "Engine Oil Filter", price: 850, image: oilFilter },
                    { _id: 3, name: "Car Battery 12V", price: 4500, image: battery },
                    { _id: 4, name: "Shock Absorber", price: 3200, image: shock },
                    { _id: 5, name: "Car Headlight Assembly", price: 2800, image: headlight },
                    { _id: 6, name: "Clutch Plate Kit", price: 3900, image: clutch },
                    { _id: 7, name: "Car Radiator", price: 5200, image: radiator },
                    { _id: 8, name: "Spark Plug Set", price: 1200, image: spark },
                ]);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first to add items to cart.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/cart", { productId, quantity: 1 }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Added to cart");
        } catch (err) {
            const serverMessage = err.response?.data?.error;
            if (serverMessage) {
                alert(serverMessage);
            } else {
                alert("Unable to add item to cart. Please make sure the backend server is running.");
            }
        }
    };

    return (
        <div>
            {/* Page Header */}
            <div className="container-fluid page-header pt-5 mb-6 wow fadeIn">
                <div className="container text-center pt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="bg-white p-5">
                                <h1 className="display-6 text-uppercase mb-3">Products</h1>
                                <nav>
                                    <ol className="breadcrumb justify-content-center mb-0">
                                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                        <li className="breadcrumb-item active">Product</li>
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
                    <div className="text-center mx-auto wow fadeInUp" style={{ maxWidth: "600px" }}>
                        <h1 className="display-6 text-uppercase mb-5">Automotive Spare Parts & Accessories</h1>
                        <p>GearLink supplies high-quality automotive components for reliable vehicle performance.</p>
                    </div>

                    <div className="row g-4">
                        {products.map((product) => (
                            <div className="col-lg-3 col-md-6" key={product._id}>
                                <div className="card shadow">
                                    <img src={getImageUrl(product.image)} className="card-img-top" alt={product.name} />
                                    <div className="card-body text-center">
                                        <h5>{product.name}</h5>
                                        <p>₹{product.price}</p>
                                        <button className="btn btn-primary w-100" onClick={() => addToCart(product._id)}>Add to Cart</button>
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