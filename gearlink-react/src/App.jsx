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
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Orders from './components/Orders';
import History from './components/History';
import Cart from './components/Cart';
// import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const location = useLocation();
  const showNavFooter = location.pathname !== '/dashboard';

  return (
    <>
      {/* <Spinner/> */}

      <Topbar />
      {showNavFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='products' element={<Products />} />
        <Route path='contact' element={<Contact />} />
        <Route path='support' element={<Support />} />
        <Route path='services' element={<Services />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='admin-dashboard' element={<AdminDashboard />} />
        <Route path='orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path='history' element={<PrivateRoute><History /></PrivateRoute>} />
        <Route path='cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
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
