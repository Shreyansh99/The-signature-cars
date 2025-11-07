"use client";

import { motion } from "framer-motion";
import { Search, Shield, Users, Star, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import LeadFormModal from "@/components/ui/lead-form-modal";

const Hero = () => {
  const [showLeadFormModal, setShowLeadFormModal] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-light to-accent"
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={floatingVariants.animate}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        animate={floatingVariants.animate}
        transition={{ delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-6 lg:space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-medium text-primary mb-4 lg:mb-6">
                The Signature Cars | Premium Dealership
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight lg:leading-tight"
            >
              Find Your{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dream Car
              </span>{" "}
              with Confidence
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-xl"
            >
              Browse 1000+ verified premium cars at unbeatable prices. Trusted
              by 10,000+ satisfied customers across India.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
            >
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
                onClick={() => document.getElementById('cars')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Cars
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
                onClick={() => setShowLeadFormModal(true)}
              >
                Get Quote
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 pt-4 lg:pt-6"
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span className="text-xs lg:text-sm font-medium text-text-secondary">
                  1000+ Verified Cars
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span className="text-xs lg:text-sm font-medium text-text-secondary">
                  10K+ Happy Customers
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span className="text-xs lg:text-sm font-medium text-text-secondary">
                  4.9/5 Rating
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                <span className="text-xs lg:text-sm font-medium text-text-secondary">
                  100% Safe & Secure
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Car Image with Search */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            variants={itemVariants}
          >
            <motion.div
              className="relative mb-16 lg:mb-20"
            >
              <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80"
                  alt="Premium Car"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            {/* Search Box Overlay - Repositioned to not hide image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 lg:-bottom-12 left-4 right-4 lg:left-6 lg:right-6 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 lg:p-5"
            >
              <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-3 lg:mb-4">
                Find Your Perfect Car
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-3">
                <Select className="w-full text-sm">
                  <option>Brand</option>
                  <option>Mercedes-Benz</option>
                  <option>BMW</option>
                  <option>Audi</option>
                  <option>Hyundai</option>
                  <option>Honda</option>
                  <option>Toyota</option>
                </Select>
                <Select className="w-full text-sm">
                  <option>Budget</option>
                  <option>Under ₹5L</option>
                  <option>₹5L - ₹10L</option>
                  <option>₹10L - ₹20L</option>
                  <option>₹20L+</option>
                </Select>
                <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white text-sm lg:text-base">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Lead Form Modal */}
      <LeadFormModal open={showLeadFormModal} onOpenChange={setShowLeadFormModal} />
    </section>
  );
};

export default Hero;


