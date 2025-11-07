import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedCars from "@/components/sections/FeaturedCars";
import LeadForm from "@/components/sections/LeadForm";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <LeadForm />
      <Testimonials />
      <Footer />
    </main>
  );
}

