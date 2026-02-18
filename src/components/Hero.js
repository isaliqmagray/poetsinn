import { useState, useEffect } from "react";
import "./HomeSlider.css";

function Hero() {
  const slides = [
    {
      image: "/images/img_2.jpg",
      title: "Luxury Boutique Stay in Pahalgam",
      subtitle: "Experience serenity, elegance & refined comfort."
    },
    {
      image: "/images/img_14.jpg",
      title: "Wake Up to Mountain Views",
      subtitle: "Where every sunrise feels magical."
    },
    {
      image: "/images/img_20.jpg",
      title: "Comfort Meets Nature",
      subtitle: "A perfect escape in the heart of Kashmir."
    },
    {
      image: "/images/img_12.jpg",
      title: "Your Perfect Kashmir Retreat",
      subtitle: "Crafted with warmth, comfort & elegance."
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
        <div key={current} className="hero-content">
          <h1>{slides[current].title}</h1>
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
