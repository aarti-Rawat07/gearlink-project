import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    { id: 1, _id: "1", name: "Premium Brake Pads", brand: "Brembo", category: "Brakes", price: 2500, oldPrice: 3000, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 2, _id: "2", name: "High Performance Oil Filter", brand: "K&N", category: "Engine", price: 850, rating: 4.5, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 3, _id: "3", name: "Heavy Duty Car Battery", brand: "Bosch", category: "Electrical", price: 4500, oldPrice: 5000, rating: 4.9, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 4, _id: "4", name: "Gas Shock Absorber", brand: "Monroe", category: "Suspension", price: 3200, rating: 4.2, stock: "Out of Stock", image: "/images/shock-absorber.jpg" },
    { id: 5, _id: "5", name: "LED Headlight Bulbs", brand: "Philips", category: "Electrical", price: 2800, oldPrice: 3500, rating: 4.7, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 6, _id: "6", name: "Performance Clutch Kit", brand: "Exedy", category: "Transmission", price: 8900, rating: 4.6, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 7, _id: "7", name: "Aluminum Radiator", brand: "Mishimoto", category: "Engine", price: 5200, oldPrice: 6000, rating: 4.4, stock: "In Stock", image: "/images/radiator.jpg" },
    { id: 8, _id: "8", name: "Iridium Spark Plugs", brand: "NGK", category: "Engine", price: 1200, rating: 4.8, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 9, _id: "9", name: "Synthetic Motor Oil 5W-40", brand: "Castrol", category: "Engine", price: 2100, rating: 4.9, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 10, _id: "10", name: "Wiper Blades Set", brand: "Bosch", category: "Accessories", price: 600, rating: 4.3, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 11, _id: "11", name: "Alternator Assembly", brand: "Denso", category: "Electrical", price: 6500, oldPrice: 7200, rating: 4.5, stock: "In Stock", image: "/images/car-battery.jpg" },
    { id: 12, _id: "12", name: "Timing Belt Kit", brand: "Gates", category: "Engine", price: 2500, rating: 4.6, stock: "Out of Stock", image: "/images/radiator.jpg" },
    { id: 13, _id: "13", name: "Fuel Pump Module", brand: "Bosch", category: "Engine", price: 3500, rating: 4.4, stock: "In Stock", image: "/images/clutch-plate.jpg" },
    { id: 14, _id: "14", name: "Cabin Air Filter", brand: "K&N", category: "Accessories", price: 900, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 15, _id: "15", name: "Ignition Coil", brand: "NGK", category: "Electrical", price: 1800, rating: 4.6, stock: "In Stock", image: "/images/spark-plug.jpg" },
    { id: 16, _id: "16", name: "Brake Rotors Pair", brand: "Brembo", category: "Brakes", price: 5500, oldPrice: 6200, rating: 4.8, stock: "In Stock", image: "/images/brake-pad.jpg" },
    { id: 17, _id: "17", name: "Suspension Control Arm", brand: "Moog", category: "Suspension", price: 2800, rating: 4.3, stock: "In Stock", image: "/images/shock-absorber.jpg" },
    { id: 18, _id: "18", name: "Tail Light Assembly", brand: "Hella", category: "Electrical", price: 3100, rating: 4.5, stock: "In Stock", image: "/images/headlight.jpg" },
    { id: 19, _id: "19", name: "Manual Transmission Fluid", brand: "Castrol", category: "Transmission", price: 1100, rating: 4.7, stock: "In Stock", image: "/images/oil-filter.jpg" },
    { id: 20, _id: "20", name: "Racing Steering Wheel", brand: "Momo", category: "Accessories", price: 8500, oldPrice: 9500, rating: 4.9, stock: "Out of Stock", image: "/images/clutch-plate.jpg" },
];

const CategoryPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryOptions = [
        { name: "Brake System", image: "/images/brake-pad.jpg", link: "Brake", subtitle: "1,800+ parts" },
        { name: "Batteries", image: "/images/car-battery.jpg", link: "Battery", subtitle: "1,200+ parts" },
        { name: "Oil Filters", image: "/images/oil-filter.jpg", link: "Engine", subtitle: "2,300+ parts" },
        { name: "Lights", image: "/images/headlight.jpg", link: "Electrical", subtitle: "1,100+ parts" },
        { name: "Suspension", image: "/images/shock-absorber.jpg", link: "Suspension", subtitle: "1,500+ parts" },
        { name: "Transmission", image: "/images/clutch-plate.jpg", link: "Transmission", subtitle: "900+ parts" },
        { name: "Cooling", image: "/images/radiator.jpg", link: "Engine", subtitle: "1,100+ parts" },
        { name: "Ignition", image: "/images/spark-plug.jpg", link: "Engine", subtitle: "800+ parts" },
    ];

    const selectedCategory = categoryOptions.find(
        (category) => category.link.toLowerCase() === (categoryParam || '').toLowerCase()
    );

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products', { timeout: 3000 });
                if (response.data && response.data.length > 0) {
                    setProducts(response.data);
                } else {
                    console.log("No products from backend, using sample data");
                    setProducts(sampleProducts);
                }
                setLoading(false);
            } catch (err) {
                console.error('Failed to load products, using sample data', err);
                setProducts(sampleProducts);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // If there's a category parameter, show filtered products
    if (categoryParam) {
        const filteredProducts = products.filter(product =>
            product.category && product.category.toLowerCase().includes(categoryParam.toLowerCase())
        );

        if (loading) {
            return (
                <div className="container py-5">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading products...</p>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="container py-5">
                    <div className="alert alert-danger text-center">{error}</div>
                </div>
            );
        }

        return (
            <div className="container py-5">
                <div className="text-center mb-4">
                    <span className="section-label text-primary fw-semibold">Category</span>
                    <h2 className="mt-3">{selectedCategory?.name || categoryParam}</h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '680px' }}>
                        Browse all products matching this category and filter by the most relevant items.
                    </p>
                </div>

                <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
                    {categoryOptions.map((category) => (
                        <Link
                            key={category.link}
                            to={`/category?category=${category.link}`}
                            className={`btn btn-sm ${category.link.toLowerCase() === categoryParam.toLowerCase() ? 'btn-primary' : 'btn-outline-secondary'}`}>
                            {category.name}
                        </Link>
                    ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <div>
                        <p className="mb-1 text-muted">Showing {filteredProducts.length} products</p>
                        <p className="h5 mb-0">{selectedCategory?.subtitle || 'Related parts for your selected category'}</p>
                    </div>
                    <Link to="/category" className="btn btn-outline-primary">Back to Categories</Link>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-5">
                        <h4>No products found in this category</h4>
                        <p>Try selecting a different category.</p>
                        <Link to="/category" className="btn btn-primary">Browse All Categories</Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {filteredProducts.map((product) => (
                            <div key={product._id || product.id} className="col-xl-3 col-lg-4 col-md-6">
                                <div className="card h-100 shadow-sm product-card overflow-hidden">
                                    <div className="position-relative">
                                        <img
                                            src={getImageUrl(product.image)}
                                            className="card-img-top"
                                            alt={product.name}
                                            style={{ height: '220px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <p className="text-muted small mb-1">{product.brand}</p>
                                        <h6 className="card-title mb-2">{product.name}</h6>
                                        <div className="rating mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fa fa-star ${i < Math.floor(product.rating) ? 'text-warning' : 'text-muted'}`}></i>
                                            ))}
                                            <span className="ms-2 small">{product.rating?.toFixed(1) || '0.0'}</span>
                                        </div>
                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div>
                                                    <span className="text-primary fw-bold">₹{product.price}</span>
                                                    {product.oldPrice && (
                                                        <span className="text-muted text-decoration-line-through ms-2 small">₹{product.oldPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className={`stock-status small mb-3 ${product.stock === 'In Stock' ? 'text-success' : 'text-danger'}`}>
                                                {product.stock}
                                            </p>
                                            <Link to={`/product/${product._id || product.id}`} className="btn btn-primary btn-sm w-100">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Default view: Show categories
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <span className="section-label text-primary fw-semibold">Shop by Category</span>
                <h2 className="mt-3 mb-3">Browse our product categories</h2>
                <p className="text-muted mx-auto" style={{ maxWidth: '720px' }}>
                    Explore category-based automotive parts and jump directly to the selection you need.
                </p>
            </div>

            <div className="row g-4">
                {categoryOptions.map((category) => (
                    <div key={category.link} className="col-xl-3 col-lg-4 col-md-6">
                        <Link to={`/category?category=${category.link}`} className="text-decoration-none">
                            <div className="card category-card h-100 shadow-sm border-0 overflow-hidden">
                                <div className="position-relative">
                                    <img
                                        src={category.image}
                                        className="card-img-top"
                                        alt={category.name}
                                        style={{ height: '220px', objectFit: 'cover' }}
                                    />
                                    <div className="category-badge position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill bg-dark bg-opacity-75 text-white small">
                                        {category.subtitle}
                                    </div>
                                </div>
                                <div className="card-body text-center px-3 py-4">
                                    <h5 className="mb-2">{category.name}</h5>
                                    <p className="text-muted small mb-3">Shop the most relevant parts</p>
                                    <span className="btn btn-sm btn-outline-primary">View Items</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="text-center mt-5">
                <Link to="/products" className="btn btn-primary btn-lg px-5">Browse All Products</Link>
            </div>

            <style>{`
                .category-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    border-radius: 24px;
                }
                .category-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 22px 55px rgba(0,0,0,0.15);
                }
                .category-card .card-img-top {
                    border-top-left-radius: 24px;
                    border-top-right-radius: 24px;
                }
                .category-badge {
                    font-weight: 600;
                }
                .product-card {
                    border-radius: 24px;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .product-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                }
            `}</style>
        </div>
    );
};


export default CategoryPage;
