import { Hero } from "../components/Hero";
import { CategorySection } from "../components/CategorySection";
import { PackageSection } from "../components/PackageSection";
import { RoadTripSection } from "../components/RoadTripSection";
import { DestinationGrid } from "../components/DestinationGrid";
import { WhyUsSection } from "../components/WhyUsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <CategorySection />
      <PackageSection />
      <RoadTripSection />
      <DestinationGrid />
      <WhyUsSection />
      <TestimonialsSection />
    </motion.div>
  );
};
