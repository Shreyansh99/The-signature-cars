"use client";

import { motion } from "framer-motion";
import { Heart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Car } from "@/types";
import Image from "next/image";

interface CarCardProps {
  car: Car;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CarCard = ({ car, index, isFavorite, onToggleFavorite }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer border border-gray-100 hover:shadow-2xl transition-all"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={`https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&q=80&sig=${car.id}`}
          alt={car.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {car.badge && (
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
            {car.badge}
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(car.id);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          1/{car.images.length}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-1">
          {car.name} {car.year}
        </h3>
        <p className="text-sm text-text-secondary mb-4">{car.variant}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
          <div>
            <p className="text-text-secondary">Mileage</p>
            <p className="font-semibold text-text-primary">{car.mileage}</p>
          </div>
          <div>
            <p className="text-text-secondary">Fuel</p>
            <p className="font-semibold text-text-primary">{car.fuelType}</p>
          </div>
          <div>
            <p className="text-text-secondary">Transmission</p>
            <p className="font-semibold text-text-primary">{car.transmission}</p>
          </div>
        </div>

        {car.inspectionPassed && (
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600 font-medium">
              Inspection Passed
            </span>
          </div>
        )}

        <div className="flex items-baseline justify-between mb-2">
          <div>
            <p className="text-2xl font-bold text-text-primary">{car.price}</p>
            <p className="text-sm text-text-secondary">EMI from {car.emi}</p>
          </div>
        </div>

        <Button className="w-full mt-4 rounded-full bg-primary hover:bg-primary/90 text-white">
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

export default CarCard;

