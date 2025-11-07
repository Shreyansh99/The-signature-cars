"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Car, ShieldCheck, Handshake } from "lucide-react";

const Hero = () => {
  const features = [
    {
      icon: Car,
      title: "1000+ Verified Cars",
      description: "Hand-picked and inspected for quality",
    },
    {
      icon: ShieldCheck,
      title: "12-Month Warranty",
      description: "Peace of mind with every purchase",
    },
    {
      icon: Handshake,
      title: "Easy Financing",
      description: "Tailored loan options for you",
    },
  ];

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-accent to-light min-h-screen flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-primary mb-4 animate-scale-in">
              Welcome to The Signature Cars
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-tight mb-6">
              Find Your Next <span className="text-primary">Dream Car</span>
            </h1>

            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0">
              Discover a curated selection of premium pre-owned vehicles. Each
              car is thoroughly inspected to ensure the highest quality and
              performance.
            </p>

            <div className="flex justify-center lg:justify-start space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg shadow-lg hover-lift"
              >
                Explore Cars
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg shadow-lg hover-lift"
              >
                Sell Your Car
              </Button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden lg:block animate-fade-in">
            <img
              src="/images/hero-car.png"
              alt="Luxury Car"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 lg:mt-32 grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover-lift"
            >
              <div className="inline-block bg-primary text-white p-4 rounded-full mb-4">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;


