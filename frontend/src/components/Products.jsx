import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const imageMap = {
    "brake-pad.jpg": "/images/brake-pad.jpg",
    "oil-filter.jpg": "/images/oil-filter.jpg",
    "car-battery.jpg": "/images/car-battery.jpg",
    "shock-absorber.jpg": "/images/shock-absorber.jpg",
    "headlight.jpg": "/images/headlight.jpg",
    "clutch-plate.jpg": "/images/clutch-plate.jpg",
    "radiator.jpg": "/images/radiator.jpg",
    "spark-plug.jpg": "/images/spark-plug.jpg",
};

const getImageUrl = (image) => {
    if (!image) return "/images/brake-pad.jpg";
    if (typeof image !== "string") return image;
    const filename = image.split("/").pop();
    return imageMap[filename] || `/images/${filename}` || "/images/brake-pad.jpg";
};

const sampleProducts = [
    { id: 1, name: "Premium Brake Pads", brand: "Brembo", category: "Brakes", price: 2500, oldPrice: 3000, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 2, name: "High Performance Oil Filter", brand: "K&N", category: "Engine", price: 850, rating: 4.5, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 3, name: "Heavy Duty Car Battery", brand: "Bosch", category: "Electrical", price: 4500, oldPrice: 5000, rating: 4.9, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 4, name: "Gas Shock Absorber", brand: "Monroe", category: "Suspension", price: 3200, rating: 4.2, stock: "Out of Stock", image: "/images/shock-absorber.jpg" },
    { id: 5, name: "LED Headlight Bulbs", brand: "Philips", category: "Electrical", price: 2800, oldPrice: 3500, rating: 4.7, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 6, name: "Performance Clutch Kit", brand: "Exedy", category: "Transmission", price: 8900, rating: 4.6, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 7, name: "Aluminum Radiator", brand: "Mishimoto", category: "Engine", price: 5200, oldPrice: 6000, rating: 4.4, stock: "In Stock", image: "/images/radiator.jpg" },
    { id: 8, name: "Iridium Spark Plugs", brand: "NGK", category: "Engine", price: 1200, rating: 4.8, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 9, name: "Synthetic Motor Oil 5W-40", brand: "Castrol", category: "Engine", price: 2100, rating: 4.9, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 10, name: "Wiper Blades Set", brand: "Bosch", category: "Accessories", price: 600, rating: 4.3, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 11, name: "Alternator Assembly", brand: "Denso", category: "Electrical", price: 6500, oldPrice: 7200, rating: 4.5, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 12, name: "Timing Belt Kit", brand: "Gates", category: "Engine", price: 2500, rating: 4.6, stock: "Out of Stock", image: "/images/radiator.jpg" },
    { id: 13, name: "Fuel Pump Module", brand: "Bosch", category: "Engine", price: 3500, rating: 4.4, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 14, name: "Cabin Air Filter", brand: "K&N", category: "Accessories", price: 900, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 15, name: "Ignition Coil", brand: "NGK", category: "Electrical", price: 1800, rating: 4.6, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 16, name: "Brake Rotors Pair", brand: "Brembo", category: "Brakes", price: 5500, oldPrice: 6200, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 17, name: "Suspension Control Arm", brand: "Moog", category: "Suspension", price: 2800, rating: 4.3, stock: "In Stock", image: "/images/shock-absorber.jpg" },
    { id: 18, name: "Tail Light Assembly", brand: "Hella", category: "Electrical", price: 3100, rating: 4.5, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 19, name: "Manual Transmission Fluid", brand: "Castrol", category: "Transmission", price: 1100, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 20, name: "Racing Steering Wheel", brand: "Momo", category: "Accessories", price: 8500, oldPrice: 9500, rating: 4.9, stock: "Out of Stock", image: "/images/clutch-plate.jpg" },
];

const Products = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prev => {
            const currentQty = prev[productId] || 1;
            const newQty = currentQty + delta;
            return {
                ...prev,
                [productId]: newQty > 0 ? newQty : 1
            };
        });
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/products", { timeout: 3000 });
                if (res.data && res.data.length > 0) {
                    setProducts(res.data);
                } else {
                    console.log("No products returned from backend, using sample data");
                    setProducts(sampleProducts);
                }
            } catch (err) {
                console.error("Failed to fetch products, using sample data", err);
                setProducts(sampleProducts);
            }
        };
        fetchProducts();
    }, []);

    const brands = ["All", ...Array.from(new Set(products.map(p => p.brand || 'Other')))];
    const categories = ["All", ...Array.from(new Set(products.map(p => p.category || 'Other')))];

    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            const productBrand = p.brand || 'Other';
            const productCategory = p.category || 'Other';
            const productName = p.name || '';
            const matchBrand = selectedBrand === "All" || productBrand === selectedBrand;
            const matchCategory = selectedCategory === "All" || productCategory === selectedCategory;
            const matchSearch = productName.toLowerCase().includes(searchQuery.toLowerCase());
            return matchBrand && matchCategory && matchSearch;
        });

        if (sortBy === "priceAsc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceDesc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }, [searchQuery, selectedBrand, selectedCategory, sortBy, products]);

    const addToCart = async (e, productId) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login first to add items to cart.");
            return;
        }

        const quantity = quantities[productId] || 1;

        try {
            await axios.post("/api/cart", { productId, quantity }, {
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
        <div className="container-fluid bg-light py-5">
            <style>
                {`
                    .product-card {
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        border-radius: 16px;
                        border: 1px solid #eee;
                        overflow: hidden;
                        height: 100%;
                        background: #fff;
                    }
                    .product-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
                    }
                    .product-img-wrapper {
                        position: relative;
                        padding-top: 100%;
                        overflow: hidden;
                        background: #f8f9fa;
                    }
                    .product-img {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        padding: 10px;
                    }
                    .badge-best-seller {
                        position: absolute;
                        top: 12px;
                        left: 12px;
                        background-color: #ffc107;
                        color: #000;
                        font-weight: 600;
                        padding: 6px 12px;
                        border-radius: 30px;
                        z-index: 2;
                        font-size: 0.75rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .badge-stock {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        padding: 6px 12px;
                        border-radius: 30px;
                        z-index: 2;
                        font-size: 0.75rem;
                        font-weight: 600;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    .stock-in { background-color: #d1e7dd; color: #0f5132; }
                    .stock-out { background-color: #f8d7da; color: #842029; }
                    .text-strike {
                        text-decoration: line-through;
                        color: #adb5bd;
                        font-size: 0.9em;
                        margin-left: 8px;
                        font-weight: normal;
                    }
                    .rating-stars { color: #ffc107; font-size: 0.9rem; }
                    .add-cart-btn {
                        background-color: #0d6efd;
                        color: white;
                        border: none;
                        font-weight: 600;
                        border-radius: 8px;
                        padding: 10px;
                        transition: all 0.2s ease;
                    }
                    .add-cart-btn:hover {
                        background-color: #0b5ed7;
                        color: white;
                        transform: scale(1.02);
                    }
                    .filter-card {
                        border-radius: 16px;
                        border: none;
                        background: #fff;
                    }
                    .page-title {
                        font-weight: 800;
                        letter-spacing: -0.5px;
                        color: #2b2b2b;
                `}
            </style>

            <div className="container mt-4">
                <div className="row mb-5 align-items-center">
                    <div className="col-md-6">
                        <h1 className="page-title mb-0">Our Products</h1>
                        <p className="text-muted mt-2 mb-0">Find the best parts for your vehicle</p>
                    </div>
                    <div className="col-md-6 mt-3 mt-md-0">
                        <div className="position-relative">
                            <input
                                type="text"
                                className="form-control form-control-lg rounded-pill ps-4"
                                placeholder="Search for products by name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ border: '1px solid #e0e0e0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Sidebar Filters */}
                    <div className="col-lg-3 mb-4">
                        <div className="card filter-card shadow-sm p-4 sticky-top" style={{ top: '20px', zIndex: 1 }}>
                            <h5 className="mb-4 fw-bold">Filters</h5>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Category</label>
                                <select
                                    className="form-select form-select-lg rounded-3"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold text-secondary">Brand</label>
                                <select
                                    className="form-select form-select-lg rounded-3"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                >
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-lg-9">
                        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 bg-white p-3 rounded-4 shadow-sm">
                            <h6 className="mb-0 text-secondary fw-semibold">
                                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                            </h6>
                            <div className="d-flex align-items-center mt-3 mt-sm-0">
                                <label className="me-2 text-nowrap fw-semibold text-secondary">Sort By:</label>
                                <select
                                    className="form-select rounded-3"
                                    style={{ width: 'auto', minWidth: '160px' }}
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="default">Default</option>
                                    <option value="priceAsc">Price: Low to High</option>
                                    <option value="priceDesc">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                                <h4 className="text-muted mb-3">No products found</h4>
                                <p className="text-secondary">Try adjusting your filters or search query.</p>
                                <button className="btn btn-outline-primary rounded-pill px-4 mt-3 fw-bold" onClick={() => {
                                    setSearchQuery('');
                                    setSelectedBrand('All');
                                    setSelectedCategory('All');
                                }}>Clear All Filters</button>
                            </div>
                        ) : (
                            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4">
                                {filteredProducts.map((product) => (
                                    <div className="col" key={product._id || product.id}>
                                        <div className="card product-card shadow-sm text-decoration-none h-100">
                                            <Link to={`/product/${product._id || product.id}`} className="text-decoration-none text-dark d-block">
                                                <div className="product-img-wrapper">
                                                    {(product.rating || 5) >= 4.8 && (
                                                        <span className="badge-best-seller">★ Best Seller</span>
                                                    )}
                                                    <span className={`badge-stock ${(product.stock || 'In Stock') === 'In Stock' ? 'stock-in' : 'stock-out'}`}>
                                                        {product.stock || 'In Stock'}
                                                    </span>
                                                    <img src={getImageUrl(product.image)} alt={product.name} className="product-img" />
                                                </div>
                                            </Link>
                                            <div className="card-body d-flex flex-column p-3 p-lg-4">
                                                <Link to={`/product/${product._id || product.id}`} className="text-decoration-none text-dark">
                                                    <div className="text-muted small fw-semibold text-uppercase mb-1">{product.brand || 'Other'}</div>
                                                    <h6 className="card-title fw-bold mb-2 text-truncate" title={product.name}>{product.name}</h6>
                                                    <div className="mb-2">
                                                        <span className="rating-stars">{"★".repeat(Math.round(product.rating || 5))}</span>
                                                        <span className="text-muted small ms-1">({product.rating || 5.0})</span>
                                                    </div>
                                                    <div className="mb-3 mt-auto">
                                                        <span className="fw-bold fs-5 text-dark">₹{product.price}</span>
                                                        {product.oldPrice && (
                                                            <span className="text-strike">₹{product.oldPrice}</span>
                                                        )}
                                                    </div>
                                                </Link>
                                                <div className="d-flex justify-content-center align-items-center mb-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm px-3"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuantityChange(product._id || product.id, -1); }}
                                                    >-</button>
                                                    <span className="mx-3 fw-bold">{quantities[product._id || product.id] || 1}</span>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-sm px-3"
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleQuantityChange(product._id || product.id, 1); }}
                                                    >+</button>
                                                </div>
                                                <button
                                                    className="btn add-cart-btn w-100 mt-auto d-flex justify-content-center align-items-center gap-2"
                                                    onClick={(e) => addToCart(e, product._id || product.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                    </svg>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
