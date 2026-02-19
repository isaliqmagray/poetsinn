import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Poet's Inn 💎 Your luxury stay in Pahalgam. How may I assist you today?",
    },
  ]);

  const [bookingData, setBookingData] = useState({
    guests: null,
    nights: null,
  });

  const [step, setStep] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const botReply = (text) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { sender: "bot", text }]);
    }, 900);
  };

  const handleUser = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const startBooking = () => {
    handleUser("Start Booking");
    setStep("guests");
    botReply("How many guests will be staying?");
  };

  const selectGuests = (g) => {
    handleUser(g);
    setBookingData((prev) => ({ ...prev, guests: g }));
    setStep("nights");
    botReply("For how many nights?");
  };

  const selectNights = (n) => {
    handleUser(n);
    setBookingData((prev) => ({ ...prev, nights: n }));
    setStep(null);

    const whatsappURL = `https://wa.me/919797596667?text=Hi, I want to book a room for ${bookingData.guests} for ${n}.`;

    botReply("Preparing your booking request... Redirecting to WhatsApp 📲");

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
    }, 1500);
  };

  const showPrices = () => {
    handleUser("Room Prices");
    botReply("✨ Deluxe Mountain Room – ₹3500 per night\n✨ Family Suite – ₹5500 per night");
  };

  const showLocation = () => {
    handleUser("Location");
    botReply("We are located near Lidder River in Pahalgam, just 5 minutes from the main market.");
  };

  const showRooms = () => {
    handleUser("Room Types");
    botReply("We offer Deluxe Mountain Rooms (2 Guests) and Family Suites (Up to 4 Guests).");
  };

  const showContact = () => {
    handleUser("Contact");
    botReply("You can call us at +91 97975 96667 or book via WhatsApp anytime.");
  };

  return (
    <>
      <div className={`chat-window ${open ? "open" : ""}`}>
        <div className="chat-header">
          Poet's Inn Concierge
          <span onClick={() => setOpen(false)}>✕</span>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {typing && (
            <div className="chat-message bot typing">
              Assistant is typing...
            </div>
          )}

          {!step && (
            <div className="chat-options">
              <button onClick={showPrices}>Room Prices</button>
              <button onClick={showRooms}>Room Types</button>
              <button onClick={showLocation}>Location</button>
              <button onClick={showContact}>Contact</button>
              <button onClick={startBooking}>Start Booking</button>
            </div>
          )}

          {step === "guests" && (
            <div className="chat-options">
              <button onClick={() => selectGuests("2 Guests")}>
                2 Guests
              </button>
              <button onClick={() => selectGuests("4 Guests")}>
                4 Guests
              </button>
            </div>
          )}

          {step === "nights" && (
            <div className="chat-options">
              <button onClick={() => selectNights("1 Night")}>
                1 Night
              </button>
              <button onClick={() => selectNights("2 Nights")}>
                2 Nights
              </button>
              <button onClick={() => selectNights("3 Nights")}>
                3 Nights
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-bubble pulse" onClick={() => setOpen(!open)}>
        💬
      </div>
    </>
  );
}

export default ChatBot;
