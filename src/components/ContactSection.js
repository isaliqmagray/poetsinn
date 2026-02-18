function ContactSection() {
  return (
    <section className="section">
      <div className="container contact-grid">
        <div>
          <h2 className="gold-text">Contact Us</h2>
          <p>📍 Movera, Pahalgam, Jammu & Kashmir</p>
          <p>📞 +91 97975 96667</p>
          <p>✉ poetsinnpahalgam@gmail.com</p>
        </div>

        <div className="contact-buttons">
          <a
            href="https://wa.me/919797596667"
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            Chat on WhatsApp
          </a>

          <a
            href="https://www.instagram.com/poetsinnpahalgam"
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            View Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
