function Footer() {
  return (
    <footer className="footer">

      <div className="container footer-grid">

        {/* Column 1 */}
        <div className="footer-about">
          <h3 className="gold-text">Poet’s Inn</h3>
          <p>
            Nestled in the heart of Pahalgam Valley, Poet’s Inn offers
            boutique luxury surrounded by mountains and the Lidder River.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>Home</li>
            <li>Rooms</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="footer-heading">Amenities</h4>
          <ul className="footer-links">
            <li>Free WiFi</li>
            <li>Smart TV</li>
            <li>Restaurant</li>
            <li>Room Service</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="footer-heading">Contact</h4>

          <p><i className="fa-solid fa-location-dot"></i> Pahalgam, Kashmir</p>
          <p><i className="fa-solid fa-phone"></i> +91 97975 96667</p>
          <p><i className="fa-solid fa-envelope"></i> poetsinnpahalgam@gmail.com</p>

          <div className="footer-social">
            <a href="https://wa.me/919797596667" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-whatsapp"></i>
            </a>

            <a href="https://www.instagram.com/poetsinnpahalgam" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="mailto:poetsinnpahalgam@gmail.com">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Poet’s Inn. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
