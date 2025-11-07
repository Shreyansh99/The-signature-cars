"use client";

import { useState } from "react";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import Image from "next/image";

const categories = ["All Cars", "Sedan", "SUV", "Hatchback", "Luxury", "Electric"];

const sampleCars: Car[] = [
  {
    id: "1",
    name: "Mercedes-Benz C-Class",
    year: 2023,
    variant: "C 220d",
    brand: "Mercedes-Benz",
    category: "Sedan",
    mileage: "15,420 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹14.2 L",
    emi: "₹28,500/mo",
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop"],
    featured: true,
    badge: "Featured",
    inspectionPassed: true,
  },
  {
    id: "2",
    name: "BMW X5",
    year: 2022,
    variant: "xDrive30d",
    brand: "BMW",
    category: "SUV",
    mileage: "22,100 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹55.5 L",
    emi: "₹1,10,000/mo",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop"],
    badge: "New Arrival",
    inspectionPassed: true,
  },
  {
    id: "3",
    name: "Audi A4",
    year: 2023,
    variant: "Premium Plus",
    brand: "Audi",
    category: "Sedan",
    mileage: "8,500 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹18.9 L",
    emi: "₹37,500/mo",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop"],
    inspectionPassed: true,
  },
  {
    id: "4",
    name: "Hyundai Creta",
    year: 2023,
    variant: "SX (O) Turbo",
    brand: "Hyundai",
    category: "SUV",
    mileage: "12,300 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹9.8 L",
    emi: "₹19,500/mo",
    images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop"],
    badge: "Best Deal",
    inspectionPassed: true,
  },
  {
    id: "5",
    name: "Honda City",
    year: 2023,
    variant: "VX CVT",
    brand: "Honda",
    category: "Sedan",
    mileage: "10,200 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹7.5 L",
    emi: "₹15,000/mo",
    images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&h=400&fit=crop"],
    inspectionPassed: true,
  },
  {
    id: "6",
    name: "Toyota Fortuner",
    year: 2022,
    variant: "4x4 AT",
    brand: "Toyota",
    category: "SUV",
    mileage: "25,000 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹32.5 L",
    emi: "₹64,500/mo",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop"],
    inspectionPassed: true,
  },
];

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState("All Cars");
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCars =
    activeCategory === "All Cars"
      ? sampleCars
      : sampleCars.filter((car) => car.category === activeCategory);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="cars" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Premium Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4 mb-4">
            Handpicked Luxury Vehicles
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Each vehicle undergoes a comprehensive 200-point quality inspection
            to ensure you get the best value for your investment.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-accent text-text-secondary hover:bg-secondary hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car, index) => (
            <div
              key={car.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer border border-gray-100 hover-lift"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={car.images[0]}
                  alt={car.name}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {car.badge && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {car.badge}
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(car.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(car.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              {/* Car Details */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-text-primary mb-1">
                    {car.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {car.year} • {car.variant}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  <div className="text-center">
                    <p className="text-text-secondary">Mileage</p>
                    <p className="font-medium text-text-primary">{car.mileage}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-secondary">Fuel</p>
                    <p className="font-medium text-text-primary">{car.fuelType}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-text-secondary">Transmission</p>
                    <p className="font-medium text-text-primary">{car.transmission}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xl font-bold text-primary">{car.price}</p>
                      <p className="text-xs text-text-secondary">{car.emi}</p>
                    </div>
                    {car.inspectionPassed && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-medium">Certified</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg hover-lift">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;


