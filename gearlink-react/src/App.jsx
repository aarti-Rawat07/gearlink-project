import './App.css'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import Topbar from './components/Topbar'

import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import About from './components/About'
import Contact from './components/Contact'
import Support from './components/Support'
import Home from './components/Home'
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import ProductDetails from './components/ProductDetails';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Orders from './components/Orders';
import History from './components/History';
import Cart from './components/Cart';
import CategoryPage from "./components/CategoryPage";
// import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function UserRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}

function AppContent() {
  const location = useLocation();
  const showNavFooter = !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/admin-dashboard');

  return (
    <>
      {/* <Spinner/> */}

      {showNavFooter && <Topbar />}
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='products' element={<Products />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path='contact' element={<Contact />} />
        <Route path='support' element={<Support />} />
        <Route path='services' element={<Services />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dashboard' element={<UserRoute><Dashboard /></UserRoute>} />
        <Route path='admin-dashboard/*' element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path='orders' element={<UserRoute><Orders /></UserRoute>} />
        <Route path='history' element={<UserRoute><History /></UserRoute>} />
        <Route path='cart' element={<UserRoute><Cart /></UserRoute>} />
      </Routes>
      {showNavFooter && <Footer />}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
