import { useRef, useState } from "react";
import "./VideoSection.css";

function VideoSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const handleSoundToggle = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  return (
    <section className="video-section-split">

      {/* VIDEO SIDE */}
      <div className="video-container">
        <video
          ref={videoRef}
          className="video-main"
          src="/videos/hotel.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="video-controls">
          <button
            type="button"
            className="control-btn"
            onClick={handleSoundToggle}
          >
            {muted ? "🔊 Sound On" : "🔇 Mute"}
          </button>

          <button
            type="button"
            className="control-btn"
            onClick={handleFullscreen}
          >
            ⛶ Fullscreen
          </button>
        </div>
      </div>

      {/* QUOTE SIDE */}
      <div className="quote-container">
        <h2>Kashmir — Heaven on Earth</h2>

        <p className="quote-text">
          “Between the mountains and the river’s song,
          luxury finds its truest meaning.”
        </p>

        <p className="quote-sub">
          At Poet’s Inn, every sunrise feels personal,
          every evening feels unforgettable.
        </p>
      </div>

    </section>
  );
}

export default VideoSection;
