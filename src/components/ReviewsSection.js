function ReviewsSection() {
  const reviews = [
    {
      name: "Arjun Mehta",
      text: "Amazing stay with breathtaking mountain views. Rooms were very clean and comfortable.",
      rating: 5,
    },
    {
      name: "Sana Khan",
      text: "Staff was very polite and helpful. The food was delicious and service was quick.",
      rating: 5,
    },
    {
      name: "Imran Shah",
      text: "Best boutique hotel experience in Pahalgam. Highly recommended for families.",
      rating: 4,
    },
    {
      name: "Ritika Sharma",
      text: "Peaceful environment and beautiful interiors. Loved the ambiance.",
      rating: 5,
    },
    {
      name: "Adil Mir",
      text: "Very safe and comfortable stay. Great hospitality and scenic location.",
      rating: 4,
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="gold-text">Customer Reviews</h2>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="stars">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>

              <p>"{review.text}"</p>
              <h4>— {review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
