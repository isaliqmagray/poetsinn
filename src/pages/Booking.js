import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import "./Booking.css";

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room_id: "",
    full_name: "",
    phone: "",
    from_date: "",
    to_date: "",
    persons: 1,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===============================
     FETCH ACTIVE ROOMS
  =============================== */
  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("is_active", true);

      if (!error && data) setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ===============================
     CHECK AVAILABILITY + BOOK
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    if (!form.room_id) {
      setStatus("❌ Please select a room.");
      setLoading(false);
      return;
    }

    if (form.from_date >= form.to_date) {
      setStatus("❌ Invalid dates selected.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Get total rooms
      const { data: roomData, error: roomError } = await supabase
        .from("rooms")
        .select("total_rooms")
        .eq("id", form.room_id)
        .single();

      if (roomError) throw roomError;

      const totalRooms = roomData.total_rooms;

      // 2️⃣ Get approved bookings overlapping same dates
      const { data: bookedData, error: bookedError } = await supabase
        .from("bookings")
        .select("id, from_date, to_date")
        .eq("room_id", form.room_id)
        .eq("status", "APPROVED");

      if (bookedError) throw bookedError;

      // Check date overlap
      const overlappingBookings = bookedData.filter((booking) => {
        return (
          form.from_date < booking.to_date &&
          form.to_date > booking.from_date
        );
      });

      if (overlappingBookings.length >= totalRooms) {
        setStatus("❌ Room not available for selected dates.");
        setLoading(false);
        return;
      }

      // 3️⃣ Insert booking
      const { error: insertError } = await supabase
        .from("bookings")
        .insert([
          {
            room_id: form.room_id,
            full_name: form.full_name,
            phone: form.phone,
            from_date: form.from_date,
            to_date: form.to_date,
            persons: parseInt(form.persons),
            status: "pending", // ✅ FIXED (uppercase)
          },
        ]);

      if (insertError) throw insertError;

      setStatus("✅ Booking submitted successfully!");

      setForm({
        room_id: "",
        full_name: "",
        phone: "",
        from_date: "",
        to_date: "",
        persons: 1,
      });

    } catch (error) {
      console.error("Booking Error:", error);
      setStatus("❌ " + error.message);
    }

    setLoading(false);
  };

  return (
    <section className="booking-section">
      <div className="booking-card">
        <h2>Book Your Stay</h2>

        <form onSubmit={handleSubmit} className="booking-form">

          <select
            name="room_id"
            value={form.room_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} - ₹{room.price}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="from_date"
            value={form.from_date}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="to_date"
            value={form.to_date}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="persons"
            min="1"
            value={form.persons}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Book Now"}
          </button>

          {status && <p className="booking-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

export default Booking;
