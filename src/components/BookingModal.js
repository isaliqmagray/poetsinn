import { useState } from "react";

function BookingModal({ room, close }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    from: "",
    to: "",
    persons: "",
  });

  const calculateNights = () => {
    if (!form.from || !form.to) return 0;
    const start = new Date(form.from);
    const end = new Date(form.to);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const total = nights * room.price;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nights) {
      alert("Please select valid dates.");
      return;
    }

    const message = `
Booking Request - Poet's Inn

Room: ${room.name}
Name: ${form.name}
Phone: ${form.phone}
From: ${form.from}
To: ${form.to}
Persons: ${form.persons}

Total Nights: ${nights}
Total Amount: ₹${total}
`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919797596667?text=${encoded}`, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{room.name} Booking</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            required
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="date"
            required
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />
          <input
            type="date"
            required
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />
          <input
            type="number"
            placeholder="No. of Persons"
            required
            onChange={(e) => setForm({ ...form, persons: e.target.value })}
          />

          <p>Total Nights: {nights}</p>
          <p>Total Amount: ₹{total}</p>

          <button className="btn-gold" type="submit">
            Confirm via WhatsApp
          </button>
        </form>

        <button className="close-btn" onClick={close}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default BookingModal;
