function EnquirySection() {
  return (
    <section className="section enquiry-section">
      <div className="container">

        <div className="enquiry-card">
          <h2 className="gold-text">Make an Enquiry</h2>
          <p className="enquiry-subtext">
            Fill in your details and we will contact you shortly.
          </p>

          <form className="enquiry-form">

            <div className="form-group">
              <input type="text" required />
              <label>Full Name</label>
            </div>

            <div className="form-group">
              <input type="tel" required />
              <label>Phone Number</label>
            </div>

            <div className="form-group">
              <input type="date" required />
              <label className="active-label">Check-In</label>
            </div>

            <div className="form-group">
              <input type="date" required />
              <label className="active-label">Check-Out</label>
            </div>

            <div className="form-group full-width">
              <textarea rows="4" required></textarea>
              <label>Message</label>
            </div>

            <button className="btn-gold enquiry-btn">
              Send Enquiry
            </button>

          </form>
        </div>

      </div>
    </section>
  );
}

export default EnquirySection;
