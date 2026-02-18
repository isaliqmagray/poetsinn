import { useState, useEffect } from "react";
import "./Hero.css";

function Hero() {
  const slides = [
    {
      image: "/images/img_2.jpg",
      title: "Luxury Boutique Stay in Pahalgam",
      subtitle: "Experience serenity, elegance & refined comfort."
    },
    {
      image: "/images/img_20.jpg",
      title: "Wake Up to Mountain Views",
      subtitle: "Where every sunrise feels magical."
    },
    {
      image: "/images/img_14.jpg",
      title: "Comfort Meets Nature",
      subtitle: "A perfect escape in the heart of Kashmir."
    },
    {
      image: "/images/img_2.jpg",
      title: "Perfect for Families & Couples",
      subtitle: "Spacious rooms crafted with warmth."
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slides[current].image})`
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 key={slides[current].title}>
            {slides[current].title}
          </h1>
          <p>{slides[current].subtitle}</p>
          <a href="#rooms" className="btn-gold hero-btn">
            Explore Rooms
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
