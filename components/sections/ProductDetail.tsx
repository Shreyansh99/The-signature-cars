"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car } from "@/types";
import Image from "next/image";
import {
  CheckCircle2,
  Fuel,
  Gauge,
  Settings,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  MessageCircle,
  Quote,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SimpleLeadForm from "@/components/ui/simple-lead-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

interface ProductDetailProps {
  car: Car;
}

const ProductDetail = ({ car }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  // WhatsApp number - update with your actual WhatsApp business number
  const whatsappNumber = "919212121212"; // Format: country code + number (no + or spaces)
  
  // Generate WhatsApp message with car details
  const getWhatsAppMessage = () => {
    const message = `Hi! I'm interested in this car:

🚗 *${car.name} ${car.year}*
📋 Variant: ${car.variant}
💰 Price: ${car.price}
💳 EMI: ${car.emi}
📊 Mileage: ${car.mileage}
⛽ Fuel: ${car.fuelType}
⚙️ Transmission: ${car.transmission}
🏷️ Category: ${car.category}

Please share more details and availability.`;
    
    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${getWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  const features = [
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Gauge, label: "Mileage", value: car.mileage },
    { icon: Settings, label: "Transmission", value: car.transmission },
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: MapPin, label: "Category", value: car.category },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#cars"
            className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg"
            >
              <Image
                src={car.images?.[selectedImageIndex] || car.images?.[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop`}
                alt={car.name}
                fill
                className="object-cover"
                priority
              />
              {car.badge && (
                <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {car.badge}
                </div>
              )}
              {car.inspectionPassed && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Certified
                </div>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Title & Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                {car.name} {car.year}
              </h1>
              <p className="text-lg text-text-secondary mb-4">{car.variant}</p>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl lg:text-5xl font-bold text-primary">
                  {car.price}
                </span>
                <span className="text-lg text-text-secondary">
                  EMI from {car.emi}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => setShowQuoteForm(true)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg py-6 text-lg font-semibold"
                >
                  <Quote className="mr-2 h-5 w-5" />
                  Get Quote
                </Button>
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  variant="outline"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 rounded-lg py-6 text-lg font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <feature.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-text-secondary">{feature.label}</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {feature.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Key Features
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-text-secondary">
                    200+ Point Quality Inspection
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-text-secondary">
                    Complete Documentation Verified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-text-secondary">
                    12-Month Warranty Included
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-text-secondary">
                    Free Home Delivery Available
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-primary/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Need Help? Contact Us
              </h3>
              <div className="space-y-2 text-text-secondary">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 92121 21212</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@signaturecars.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Quote Form Modal */}
      <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowQuoteForm(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-text-primary">
              Get Your Quote for {car.name} {car.year}
            </DialogTitle>
            <p className="text-text-secondary mt-2">
              Fill out the form below and our expert team will contact you within 2 hours with the best deals.
            </p>
          </DialogHeader>

          {/* Car Details in Modal */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={car.images?.[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop`}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {car.name} {car.year}
                </h3>
                <p className="text-sm text-text-secondary mb-2">{car.variant}</p>
                <div className="flex flex-wrap gap-3 text-xs text-text-secondary mb-2">
                  <span>{car.mileage}</span>
                  <span>•</span>
                  <span>{car.fuelType}</span>
                  <span>•</span>
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{car.price}</span>
                  <span className="text-sm text-text-secondary">EMI {car.emi}</span>
                </div>
              </div>
            </div>
          </div>

          <SimpleLeadForm 
            car={car} 
            onSuccess={() => setShowQuoteForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDetail;

