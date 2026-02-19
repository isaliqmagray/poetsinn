import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) navigate("/admin");
    };
    checkSession();
  }, [navigate]);

  /* ================= FETCH BOOKINGS ================= */
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /* ================= FILTER LOGIC ================= */
  const filteredBookings = useMemo(() => {
    let data = bookings;

    if (search) {
      data = data.filter((b) =>
        b.full_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((b) => b.status === statusFilter);
    }

    return data;
  }, [bookings, search, statusFilter]);

  /* ================= KPI STATS ================= */
  const total = bookings.length;
  const confirmed = bookings.filter(b => b.status === "confirmed").length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;

  const revenue = bookings
    .filter(b => b.status === "confirmed")
    .reduce((sum, b) => sum + Number(b.total_price || 0), 0);

  /* ================= MONTHLY ANALYTICS ================= */
  const monthlyData = useMemo(() => {
    const months = {};

    bookings.forEach(b => {
      const month = new Date(b.created_at).toLocaleString("default", {
        month: "short"
      });

      if (!months[month]) {
        months[month] = { month, revenue: 0, bookings: 0 };
      }

      months[month].bookings += 1;

      if (b.status === "confirmed") {
        months[month].revenue += Number(b.total_price || 0);
      }
    });

    return Object.values(months);
  }, [bookings]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchBookings();
  };

  /* ================= DELETE ================= */
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete permanently?")) return;
    await supabase.from("bookings").delete().eq("id", id);
    fetchBookings();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Poet's Inn</h2>
        <p>Enterprise Admin</p>

        <div className="sidebar-menu">
          <span onClick={() => setActiveTab("dashboard")}>Dashboard</span>
          <span onClick={() => setActiveTab("bookings")}>Bookings</span>
          <span onClick={() => setActiveTab("analytics")}>Analytics</span>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* MAIN */}
      <div className="admin-content">

        {/* DASHBOARD */}
        {activeTab === "dashboard" && (
          <>
            <div className="admin-topbar">
              <h1>Executive Overview</h1>
              <p>Real-time hotel performance</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card total">
                <h3>Total Bookings</h3>
                <h1>{total}</h1>
              </div>

              <div className="stat-card confirmed">
                <h3>Confirmed</h3>
                <h1>{confirmed}</h1>
              </div>

              <div className="stat-card pending">
                <h3>Pending</h3>
                <h1>{pending}</h1>
              </div>

              <div
                className="stat-card revenue clickable"
                onClick={() => setActiveTab("analytics")}
              >
                <h3>Total Revenue</h3>
                <h1>₹ {revenue}</h1>
              </div>

              <div className="stat-card cancelled">
                <h3>Cancelled</h3>
                <h1>{cancelled}</h1>
              </div>
            </div>
          </>
        )}

        {/* BOOKINGS */}
        {activeTab === "bookings" && (
          <>
            <div className="admin-topbar">
              <h1>Bookings Management</h1>
            </div>

            <div className="filters">
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {loading && <p>Loading...</p>}
            {errorMsg && <p style={{color:"red"}}>{errorMsg}</p>}
            {!loading && filteredBookings.length === 0 && (
              <p>No bookings found.</p>
            )}

            <div className="booking-table">
              {filteredBookings.map((b) => (
                <div key={b.id} className="booking-row">

                  <div>
                    <strong>{b.full_name}</strong>
                    <p>{b.phone}</p>
                    <p>{b.from_date} → {b.to_date}</p>
                    <div className={`status ${b.status}`}>
                      {b.status}
                    </div>
                  </div>

                  <div className="actions">
                    {b.status !== "confirmed" && (
                      <button onClick={() => updateStatus(b.id,"confirmed")}>
                        Confirm
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button onClick={() => updateStatus(b.id,"cancelled")}>
                        Cancel
                      </button>
                    )}
                    <button onClick={() => deleteBooking(b.id)}>
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <>
            <div className="admin-topbar">
              <h1>Revenue Analytics</h1>
              <p>Monthly trend overview</p>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid stroke="#333" />
                  <XAxis dataKey="month" stroke="#d4af37" />
                  <YAxis stroke="#d4af37" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#d4af37"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid stroke="#333" />
                  <XAxis dataKey="month" stroke="#d4af37" />
                  <YAxis stroke="#d4af37" />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#1e6f5c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;
