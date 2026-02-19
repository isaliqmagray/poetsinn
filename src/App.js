import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";
import ChatBot from "./components/ChatBot";
import AvailabilityBadge from "./components/AvailabilityBadge";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";

import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <AvailabilityBadge />
      {children}
      <Footer />
      <FloatingButtons />
      <ChatBot />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
        <Route path="/booking" element={<Layout><Booking /></Layout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
