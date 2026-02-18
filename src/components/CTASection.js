function CTASection() {
  return (
    <section
      className="cta-section"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/nearby/baisaran.jpg)`
      }}
    >
      <div className="cta-overlay">
        <h2>Ready for a Peaceful Stay in Pahalgam?</h2>

        <p>
          Let the mountains welcome you. Book your escape today and experience
          luxury surrounded by nature.
        </p>

        <a
          href="https://wa.me/919797596667"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn"
        >
          Book via WhatsApp
        </a>
      </div>
    </section>
  );
}

export default CTASection;
