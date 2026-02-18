function NearbySection() {
  const places = [
    {
      name: "Betaab Valley",
      image: "/images/nearby/betaab.jpg",
      description:
        "A scenic valley surrounded by snow-covered mountains and lush greenery."
    },
    {
      name: "Aru Valley",
      image: "/images/nearby/aru.jpg",
      description:
        "A peaceful paradise perfect for nature lovers and trekkers."
    },
    {
      name: "Lidder River",
      image: "/images/nearby/lidder.jpg",
      description:
        "Crystal-clear river flowing through Pahalgam’s breathtaking landscapes."
    },
    {
      name: "Baisaran",
      image: "/images/nearby/baisaran.jpg",
      description:
        "Known as Mini Switzerland, offering stunning panoramic views."
    }
  ];

  return (
    <section className="section nearby-section">
      <div className="container">
        <h2 className="section-title">Nearby Attractions</h2>

        <div className="nearby-grid">
          {places.map((place, index) => (
            <div className="nearby-card" key={index}>
              <img src={place.image} alt={place.name} />
              <div className="nearby-content">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NearbySection;
