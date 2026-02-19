import Hero from "../components/Hero";
import AvailabilityBar from "../components/AvailabilityBar";
import AboutSection from "../components/AboutSection";
import WhyChooseUs from "../components/WhyChooseUs";
import FeaturesSection from "../components/FeaturesSection";
import RoomsSection from "../components/RoomsSection";
import NearbySection from "../components/NearbySection";
import VideoSection from "../components/VideoSection";
import PhotosSection from "../components/PhotosSection";
import ReviewsSection from "../components/ReviewsSection";
import CTASection from "../components/CTASection";
import EnquirySection from "../components/EnquirySection";
import MapSection from "../components/MapSection";
import Booking from "./Booking";

function Home() {
  return (
    <>
      <Hero />
      <AvailabilityBar />
      <Booking />
      <AboutSection />
      <WhyChooseUs />
      <FeaturesSection />
      <RoomsSection />
      <NearbySection />
      <VideoSection />
      <PhotosSection />
      <ReviewsSection />
      <CTASection />
      <EnquirySection />
      <MapSection />
    </>
  );
}

export default Home;
