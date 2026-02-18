import { useState } from "react";
import Lightbox from "../components/Lightbox";

function Gallery() {
  const images = [
    "/images/img_11.jpg",
    "/images/12.jpg",
    "/images/13.jpg",
    "/images/14.jpg",

    "/images/img_1.jpg",
    "/images/img_2.jpg",
    "/images/img_3.jpg",
    "/images/img_4.jpg",
    "/images/img_5.jpg",
    "/images/img_6.jpg",
    "/images/img_7.jpg",
    "/images/img_9.jpg",
    "/images/img_10.jpg",
    "/images/img_11.jpg",
    "/images/img_12.jpg",
    "/images/img_13.jpg",
    "/images/img_14.jpg",
    "/images/img_15.jpg",
    "/images/img_16.jpg",
    "/images/img_17.jpg",
    "/images/img_18.jpg",
    "/images/img_20.jpg",
    "/images/img_21.jpg",
    "/images/img_22.jpg",
    "/images/img_23.jpg",
    "/images/img_24.jpg",

    "/images/ac-deluxe.jpg",
    "/images/family-room.jpg",
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section">
      <div className="container">
        <h1 className="gold-text">Gallery</h1>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-item" key={index}>
              <img
                src={img}
                alt={`Poet's Inn ${index + 1}`}
                onClick={() => setLightboxIndex(index)}
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          setIndex={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

export default Gallery;
