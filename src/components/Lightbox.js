import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Lightbox.css";

export default function Lightbox({ images, index, setIndex, onClose }) {
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      setIndex((prev) => (prev + 1) % images.length);
    }
    if (e.key === "ArrowLeft") {
      setIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.img
          key={images[index]}
          src={images[index]}
          alt=""
          className="lightbox-image"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        <button
          className="nav left"
          onClick={() =>
            setIndex(index === 0 ? images.length - 1 : index - 1)
          }
        >
          ‹
        </button>

        <button
          className="nav right"
          onClick={() =>
            setIndex((index + 1) % images.length)
          }
        >
          ›
        </button>

        <button className="close" onClick={onClose}>
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
