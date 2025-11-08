"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { fetchAllCars } from "@/lib/api/cars";

const categories = ["All Cars", "Sedan", "SUV", "Hatchback", "Luxury", "Electric"];

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState("All Cars");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cars using the API service layer
  useEffect(() => {
    const loadCars = async () => {
      try {
        setIsLoading(true);
        const fetchedCars = await fetchAllCars();
        setCars(fetchedCars);
      } catch (error) {
        console.error("Error loading cars:", error);
        // Fallback to empty array on error
        setCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCars();
  }, []);

  const filteredCars =
    activeCategory === "All Cars"
      ? cars
      : cars.filter((car) => car.category === activeCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="cars" className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 lg:mb-12"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Premium Collection
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mt-2 sm:mt-4 mb-2 sm:mb-4">
            Handpicked Luxury Vehicles
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Each vehicle undergoes a comprehensive 200-point quality inspection
            to ensure you get the best value for your investment.
          </p>
        </motion.div>

        {/* Filter Tabs - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8 lg:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-accent text-text-secondary hover:bg-secondary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <p className="text-text-secondary">Loading cars...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredCars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary">No cars found in this category.</p>
        </div>
        )}

        {/* Car Grid - Compact Layout */}
        {!isLoading && filteredCars.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {filteredCars.map((car, index) => (
            <Link
              key={car.id}
              href={`/car/${car.id}`}
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
            >
                {/* Image Container - Compact */}
                <div className="relative h-40 lg:h-48 overflow-hidden">
                <Image
                    src={car.images[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&q=80&sig=${car.id}`}
                  alt={car.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {car.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {car.badge}
                  </div>
                )}
                <button
                    onClick={(e) => toggleFavorite(car.id, e)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(car.id)
                        ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

                {/* Content - Compact */}
                <div className="p-4 lg:p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-base lg:text-lg font-bold text-text-primary">
                        {car.name}
                      </h3>
                      <p className="text-xs lg:text-sm text-text-secondary">{car.variant} • {car.year}</p>
                    </div>
                    {car.inspectionPassed && (
                      <CheckCircle2 className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0" />
                    )}
                  </div>

                  {/* Specs Row - Compact */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-text-secondary">
                    <span>{car.mileage}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{car.fuelType}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{car.transmission}</span>
                  </div>

                  {/* Price Section */}
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-lg lg:text-xl font-bold text-text-primary">{car.price}</p>
                      <p className="text-xs text-text-secondary">EMI {car.emi}</p>
                    </div>
                    <Button 
                      size="sm"
                      className="rounded-full bg-primary hover:bg-primary/90 text-white text-xs lg:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      View
                  </Button>
                </div>
              </div>
              </motion.div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;


