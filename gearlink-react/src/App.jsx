import './App.css'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import Topbar from './components/Topbar'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About'
import Contact from './components/Contact'
import Home from './components/Home'
import Services from './components/Services';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import Dashboard from './components/Dashboard';
// import MainLayout from "./layouts/MainLayout";
// import DashboardLayout from "./layouts/DashboardLayout";

function App() {
  return (
    <>
      {/* <Spinner/> */}

      <BrowserRouter>
        <Topbar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
        </Routes>
        <Routes>
          <Route path='about' element={<About />} ></Route>
        </Routes>
        <Routes>
          <Route path='product' element={<Products />} ></Route>
        </Routes>
        <Routes>
          <Route path='contact' element={<Contact />} ></Route>
        </Routes>
        <Routes>
          <Route path='services' element={<Services />} ></Route>
        </Routes>
        <Routes>
          <Route path='login' element={<Login />} ></Route>
        </Routes>

        <Routes>
          <Route path='register' element={<Register />} ></Route>
        </Routes>
        
        <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
         <Routes>

        {/* <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route> */}

        {/* <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route> */}

      </Routes>
        
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App
