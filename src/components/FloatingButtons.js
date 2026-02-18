function FloatingButtons() {
  return (
    <div className="floating-wrapper">
      {/* WhatsApp */}
      <a
        href="https://wa.me/919797596667"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/poetsinnpahalgam"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn instagram"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
}

export default FloatingButtons;
