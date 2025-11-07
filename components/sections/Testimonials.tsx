"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/types";
import Image from "next/image";

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    photo: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    review:
      "Excellent service! The team was very professional and helped me find the perfect car within my budget. The entire process was smooth and transparent.",
    purchase: "Honda City 2023",
  },
  {
    id: "2",
    name: "Priya Sharma",
    photo: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    review:
      "I was skeptical about buying a used car, but The Signature Cars changed my perspective. The car was in pristine condition and the documentation was flawless.",
    purchase: "Hyundai Creta 2022",
  },
  {
    id: "3",
    name: "Amit Patel",
    photo: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    review:
      "Best car buying experience ever! The 200-point inspection gave me complete confidence. Highly recommend to anyone looking for premium cars.",
    purchase: "Mercedes-Benz C-Class 2023",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    photo: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    review:
      "The financing options were very flexible and the team helped me get the best deal. The delivery was quick and the car was exactly as described.",
    purchase: "BMW X5 2022",
  },
  {
    id: "5",
    name: "Vikram Singh",
    photo: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    review:
      "Outstanding service from start to finish. The expert guidance helped me make an informed decision. The 7-day money back guarantee shows their confidence.",
    purchase: "Audi A4 2023",
  },
  {
    id: "6",
    name: "Kavita Desai",
    photo: "https://i.pravatar.cc/150?img=10",
    rating: 5,
    review:
      "I'm extremely happy with my purchase. The car was delivered on time and the complimentary services are a great bonus. Will definitely recommend!",
    purchase: "Toyota Fortuner 2022",
  },
  {
    id: "7",
    name: "Arjun Mehta",
    photo: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    review:
      "Professional team, transparent pricing, and excellent after-sales support. The Signature Cars truly lives up to its name. Five stars!",
    purchase: "Maruti Suzuki Swift 2023",
  },
  {
    id: "8",
    name: "Neha Gupta",
    photo: "https://i.pravatar.cc/150?img=16",
    rating: 5,
    review:
      "The entire buying process was hassle-free. The team was patient with all my questions and helped me find exactly what I was looking for.",
    purchase: "Honda Civic 2022",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Determine how many cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, cardsToShow]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + cardsToShow >= testimonials.length ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, testimonials.length - cardsToShow) : prev - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + cardsToShow
  );

  // Fill remaining slots if at the end
  if (visibleTestimonials.length < cardsToShow) {
    const remaining = cardsToShow - visibleTestimonials.length;
    visibleTestimonials.push(...testimonials.slice(0, remaining));
  }



  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <Quote className="absolute top-10 left-10 h-32 w-32 text-primary" />
        <Quote className="absolute bottom-10 right-10 h-32 w-32 text-secondary rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            CUSTOMER REVIEWS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream cars with us.
            Real reviews from real people.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div
              key={currentIndex}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover-lift"
                >
                    {/* Customer Photo & Info */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20">
                        <Image
                          src={testimonial.photo}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary">
                          {testimonial.name}
                        </h4>
                        <div className="flex items-center space-x-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className='text-text-secondary text-sm mb-4 leading-relaxed'>
                      &quot;{testimonial.review}&quot;
                    </p>

                    {/* Purchase Info */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs text-text-secondary">
                        <span className="font-semibold text-primary">Bought:</span>{" "}
                        {testimonial.purchase}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center items-center space-x-2 mt-8">
            {Array.from({
              length: Math.ceil(testimonials.length / cardsToShow),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index * cardsToShow)}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / cardsToShow) === index
                    ? "bg-primary w-8 h-2"
                    : "bg-gray-300 w-2 h-2 hover:bg-primary/50"
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

