import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userRole, setUserRole] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("userName");
        const email = localStorage.getItem("userEmail");
        const role = localStorage.getItem("role");
        if (token && name) {
            setIsLoggedIn(true);
            setUserName(name);
            setUserEmail(email || "");
            setUserRole(role ? role.charAt(0).toUpperCase() + role.slice(1) : "User");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserName("");
        setUserEmail("");
        setUserRole("");
        navigate("/");
    };

    return <>
        <div className="container-fluid navbar-shell sticky-top wow fadeIn" data-wow-delay="0.1s">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-custom p-lg-0">
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
                            <Link to="/products" className="nav-item nav-link">Products</Link>
                            <Link to="/category" className="nav-item nav-link">Categories</Link>
                            <Link to="/contact" className="nav-item nav-link">Contact</Link>
                        </div>
                        <div className="navbar-nav ms-auto">
                            {isLoggedIn ? (
                                <>
                                    <div className="profile-nav">
                                        <button
                                            type="button"
                                            className={`profile-badge ${menuOpen ? 'open' : ''}`}
                                            onClick={() => setMenuOpen((prev) => !prev)}
                                        >
                                            <span className="profile-avatar">{userName.charAt(0).toUpperCase()}</span>
                                            <span className="profile-text">
                                                <small>Welcome</small>
                                                <strong>{userName}</strong>
                                            </span>
                                            <i className="fas fa-chevron-down"></i>
                                        </button>
                                        {menuOpen && (
                                            <div className="profile-menu">
                                                <div className="profile-user-info">
                                                    <strong>{userName}</strong>
                                                    {userEmail && <span>{userEmail}</span>}
                                                    {userRole && <span className="user-role">{userRole}</span>}
                                                </div>
                                                {localStorage.getItem("role") === "admin" ? (
                                                    <>
                                                        <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                                                        <Link to="/admin-dashboard/inquiries" onClick={() => setMenuOpen(false)}>Customer Inquiries</Link>
                                                        <Link to="/admin-dashboard/products" onClick={() => setMenuOpen(false)}>Manage Products</Link>
                                                        <Link to="/admin-dashboard/categories" onClick={() => setMenuOpen(false)}>Manage Categories</Link>
                                                        <button type="button" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                                                        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
                                                        <Link to="/orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                                                        <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
                                                        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
                                                        <button type="button" onClick={() => { setMenuOpen(false); handleLogout(); }}>Logout</button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="nav-item nav-link">Login</Link>
                                    <Link to="/register" className="nav-item nav-link">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </>
}
