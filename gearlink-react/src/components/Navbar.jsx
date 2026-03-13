import { Link } from "react-router-dom";

export default function Navbar() {
    return <>
        <div className="container-fluid bg-white sticky-top wow fadeIn" data-wow-delay="0.1s">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light p-lg-0">
                    <Link to="/" className="navbar-brand d-lg-none">
                        <h1 className="fw-bold m-0">GearLink Pvt Ltd</h1>
                    </Link>
                    <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-item nav-link active">Home</Link>
                            <Link to="/about" className="nav-item nav-link">About</Link>
                            <Link to="/product" className="nav-item nav-link">Products</Link>
                            <Link to="/services" className="nav-item nav-link">Categories</Link>
                            <Link to="/contact" className="nav-item nav-link">Contact</Link>
                            <Link to="/login" className="nav-item nav-link">Login</Link>
                            <Link to="/register" className="nav-item nav-link">Register</Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </>
}