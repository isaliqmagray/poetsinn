import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import "./Navbar.css";

const TOTAL_ROOMS = 7;

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(TOTAL_ROOMS);
  const location = useLocation();

  /* ===============================
     SCROLL EFFECT
  =============================== */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===============================
     CALCULATE AVAILABILITY
  =============================== */
  const calculateAvailability = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const { count: confirmedBookings, error } = await supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed")
        .lte("from_date", today)
        .gt("to_date", today);

      if (error) {
        console.log("Booking Count Error:", error);
        return;
      }

      console.log("Confirmed Today:", confirmedBookings);

      const available = TOTAL_ROOMS - confirmedBookings;

      console.log("Available Calculated:", available);

      setAvailableRooms(available >= 0 ? available : 0);

    } catch (err) {
      console.log("Availability Error:", err);
    }
  };

  /* ===============================
     INITIAL + REALTIME
  =============================== */
  useEffect(() => {
    calculateAvailability();

    const channel = supabase
      .channel("availability-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        () => {
          calculateAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">

        <Link to="/" className="logo">
          Poet’s Inn
        </Link>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link 
            to="/" 
            className={location.pathname === "/" ? "active-link" : ""}
          >
            Home
          </Link>

          <Link 
            to="/gallery"
            className={location.pathname === "/gallery" ? "active-link" : ""}
          >
            Gallery
          </Link>
        </div>

        <div className="availability-badge">
          🏨 {availableRooms} Rooms Available
        </div>

        <div className="mobile-toggle" onClick={toggleMenu}>
          ☰
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
