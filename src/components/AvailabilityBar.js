import { useState } from "react";

function AvailabilityBar() {
  const [form, setForm] = useState({
    checkin: "",
    checkout: "",
    guests: "1",
  });

  const handleSubmit = () => {
    if (!form.checkin || !form.checkout) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const start = new Date(form.checkin);
    const end = new Date(form.checkout);
    const nights = (end - start) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      alert("Please select valid dates.");
      return;
    }

    const message = `
Room Availability Request - Poet's Inn

Check-In: ${form.checkin}
Check-Out: ${form.checkout}
Guests: ${form.guests}

Total Nights: ${nights}

Kindly confirm availability.
    `;

    const encoded = encodeURIComponent(message);

    window.open(
      `https://wa.me/919797596667?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <div className="availability-wrapper">
      <div className="availability-bar">

        <div className="availability-item">
          <label>Check-In</label>
          <input
            type="date"
            value={form.checkin}
            onChange={(e) =>
              setForm({ ...form, checkin: e.target.value })
            }
          />
        </div>

        <div className="availability-item">
          <label>Check-Out</label>
          <input
            type="date"
            value={form.checkout}
            onChange={(e) =>
              setForm({ ...form, checkout: e.target.value })
            }
          />
        </div>

        <div className="availability-item">
          <label>Guests</label>
          <select
            value={form.guests}
            onChange={(e) =>
              setForm({ ...form, guests: e.target.value })
            }
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>

        <button
          className="btn-gold availability-btn"
          onClick={handleSubmit}
        >
          Check Availability
        </button>

      </div>
    </div>
  );
}

export default AvailabilityBar;
