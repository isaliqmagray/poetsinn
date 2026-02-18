function FeaturesSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="gold-text">Hotel Features</h2>

        <div className="features-grid">

          <div className="feature-item">
            <i className="fa-solid fa-wifi"></i>
            <p>High-Speed Free WiFi</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-tv"></i>
            <p>Smart LED TV</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-utensils"></i>
            <p>Multi-Cuisine Restaurant</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-mountain"></i>
            <p>Mountain View Rooms</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-car"></i>
            <p>Free Parking</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-temperature-arrow-up"></i>
            <p>24/7 Hot Water</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-bell-concierge"></i>
            <p>Room Service</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-shield-halved"></i>
            <p>Safe & Secure Stay</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-snowflake"></i>
            <p>AC Deluxe Rooms</p>
          </div>

          <div className="feature-item">
            <i className="fa-solid fa-users"></i>
            <p>Family Friendly Suites</p>
          </div>

          {/* NEW FEATURE 1 */}
          <div className="feature-item">
            <i className="fa-solid fa-fire"></i>
            <p>Heated Rooms in Winter</p>
          </div>

          {/* NEW FEATURE 2 */}
          <div className="feature-item">
            <i className="fa-solid fa-clock"></i>
            <p>24/7 Front Desk Assistance</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
