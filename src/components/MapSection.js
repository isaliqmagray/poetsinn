function MapSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="gold-text">Our Location</h2>

        <div className="map-wrapper">
          <iframe
            title="Poets Inn Location"
            src="https://www.google.com/maps?q=POET'S+INN+Movera+Pahalgam&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
