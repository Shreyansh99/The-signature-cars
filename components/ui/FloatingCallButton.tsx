"use client";

import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const FloatingCallButton = () => {
  return (
    <motion.a
      href="tel:+919876543210"
      aria-label="Call us"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-5 right-5 z-50 bg-primary text-white rounded-full w-15 h-15 flex items-center justify-center shadow-lg"
      style={{ width: 60, height: 60 }}
    >
      <Phone className="h-6 w-6" />
    </motion.a>
  );
};

export default FloatingCallButton;