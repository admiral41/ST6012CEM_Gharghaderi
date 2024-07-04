
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./pages/components/Header";
import Navbar from "./pages/components/Navbar";
import Footer from "./pages/components/Footer";
import Gallery from "./pages/Gallery";
import CommunityDetail from "./pages/CommunityDetail";
import HouseDetails from "./pages/HouseDetails";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Contact from "./pages/Contact";
import Plots from "./pages/Plots";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoutes from "./PrivaterRoutes/AdminRoutes";
import ScrollToTop from "./pages/components/ScrollToTop";

import Register from "./pages/Register";
import Login from "./pages/Login";
import UserRoutes from "./PrivaterRoutes/UserRoutes";
import UserDashboard  from "./pages/User/UserDashboard";
function App() {
  return (
   <Router>
    <Header/>
    <Navbar/>

    <ToastContainer />
  <ScrollToTop />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/community/:id" element={<CommunityDetail/>} />
    <Route path="/house/:id" element={<HouseDetails/>} />
    <Route path="/plots" element={<Plots/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>} />
    <Route element={<UserRoutes/>}>
    <Route path="/dashboard/*" element={<UserDashboard/>} />
    </Route>
    <Route element={<AdminRoutes />}>
    <Route path="/admindashboard/*" element={<AdminDashboard />} />
    </Route>

    </Routes>
    <Footer/>
   </Router>
  );
}

export default App;
