import { useState } from "react";
import Lightbox from "../components/Lightbox";

function PhotosSection() {
  const images = [
    "/images/img_1.jpg",
    "/images/img_2.jpg",
    "/images/img_3.jpg",
    "/images/img_4.jpg",
    "/images/img_5.jpg",
    "/images/img_6.jpg",
    "/images/img_7.jpg",
    "/images/img_9.jpg"
  ];

  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Hotel Photos</h2>

        <div className="photos-grid">
          {images.map((img, index) => (
            <div className="photo-card" key={index}>
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

export default PhotosSection;
