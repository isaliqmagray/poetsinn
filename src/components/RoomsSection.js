import { useState } from "react";

function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [pricePerNight, setPricePerNight] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    persons: "",
    fromDate: "",
    toDate: "",
  });

  const rooms = [
    {
      name: "AC Deluxe Room",
      price: 5199,
      image: "/images/ac-deluxe.jpg",
    },
    {
      name: "Family Room",
      price: 6499,
      image: "/images/family-room.jpg",
    },
  ];

  const openModal = (room) => {
    setSelectedRoom(room.name);
    setPricePerNight(room.price);
  };

  const closeModal = () => {
    setSelectedRoom(null);
    setFormData({
      name: "",
      age: "",
      persons: "",
      fromDate: "",
      toDate: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateNights = () => {
    if (!formData.fromDate || !formData.toDate) return 0;

    const from = new Date(formData.fromDate);
    const to = new Date(formData.toDate);

    const diff = (to - from) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * pricePerNight;

  const isFormValid =
    formData.name.trim() &&
    formData.age > 0 &&
    formData.persons > 0 &&
    formData.fromDate &&
    formData.toDate &&
    nights > 0;

  const handleConfirm = () => {
    if (!isFormValid) return;

    const message = `
🏨 *Room Booking Request*

Room: ${selectedRoom}
Name: ${formData.name}
Age: ${formData.age}
Guests: ${formData.persons}

Check-in: ${formData.fromDate}
Check-out: ${formData.toDate}
Nights: ${nights}

💰 Estimated Total: ₹${totalPrice}

Kindly confirm availability.
`;

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/919797596667?text=${encodedMessage}`,
      "_blank"
    );

    closeModal();
  };

  return (
    <section id="rooms" className="rooms-section">
      <h2 className="section-title">Our Rooms</h2>

      <div className="rooms-grid">
        {rooms.map((room, index) => (
          <div className="room-card" key={index}>
            <img src={room.image} alt={room.name} />
            <h3>{room.name}</h3>
            <p className="room-price">₹ {room.price} / Night</p>
            <button
              className="btn-gold"
              onClick={() => openModal(room)}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Book {selectedRoom}</h3>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
            />

            <input
              type="number"
              name="persons"
              placeholder="Number of Guests"
              value={formData.persons}
              onChange={handleChange}
            />

            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
            />

            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
            />

            {nights > 0 && (
              <div className="price-box">
                <p>Nights: {nights}</p>
                <p>Estimated Total: ₹ {totalPrice}</p>
              </div>
            )}

            <button
              className={`btn-gold ${!isFormValid ? "disabled-btn" : ""}`}
              onClick={handleConfirm}
              disabled={!isFormValid}
            >
              Confirm Booking
            </button>

            <button className="close-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default RoomsSection;
