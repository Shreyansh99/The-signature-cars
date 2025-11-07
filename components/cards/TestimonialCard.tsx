"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/types";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
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
          <h4 className="font-bold text-text-primary">{testimonial.name}</h4>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Review Text */}
      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        "{testimonial.review}"
      </p>

      {/* Purchase Info */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-xs text-text-secondary">
          <span className="font-semibold text-primary">Bought:</span>{" "}
          {testimonial.purchase}
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

