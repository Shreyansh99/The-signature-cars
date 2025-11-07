import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedCars from "@/components/sections/FeaturedCars";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import LeadForm from "@/components/sections/LeadForm";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedCars />
      <Testimonials />
      <WhyChooseUs />
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Get Your Dream Car Quote
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Fill out the form below and our expert team will contact you within 2 hours with the best deals
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}

