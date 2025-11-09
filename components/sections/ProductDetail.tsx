"use client";

import { useState, useEffect } from "react";
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
  Quote,
  X,
  ShieldCheck,
  Award,
  ThumbsUp,
  CarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SimpleLeadForm from "@/components/ui/simple-lead-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";

interface ProductDetailProps {
  car: Car;
}

const KeyFeature = ({
  icon: Icon,
  text,
  color,
}: {
  icon: React.ElementType;
  text: string;
  color: string;
}) => (
  <div className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
    <Icon className={`h-5 w-5 ${color} mt-0.5 flex-shrink-0`} />
    <span className="text-text-secondary text-sm leading-relaxed">{text}</span>
  </div>
);

const ProductDetail = ({ car }: ProductDetailProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // WhatsApp number
  const whatsappNumber = "919212121212";
  
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

  const nextImage = () => {
    if (car.images && car.images.length > 1) {
      setSelectedImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const prevImage = () => {
    if (car.images && car.images.length > 1) {
      setSelectedImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
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
      {/* Sticky Header with Breadcrumb - Mobile Optimized */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3">
          <Link
            href="/#cars"
            className="inline-flex items-center text-sm text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 lg:py-8">
        {/* Mobile-First Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
          
          {/* Image Section - Optimized for Mobile */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-lg">
              <Image
                src={car.images?.[selectedImageIndex] || car.images?.[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop`}
                alt={car.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
              />
              
              {/* Navigation Arrows for Mobile */}
              {car.images && car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors lg:hidden"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors lg:hidden"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {car.badge && (
                  <div className="bg-primary text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    {car.badge}
                  </div>
                )}
                {car.inspectionPassed && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Certified
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images - Optimized */}
            {car.images && car.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary shadow-md ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image}
                      alt={`${car.name} - View ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16.66vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section - Mobile Optimized */}
          <div className="lg:col-span-4 space-y-4">
            {/* Title & Price - Mobile First */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-1">
                {car.name} {car.year}
              </h1>
              <p className="text-base sm:text-lg text-text-secondary mb-3 sm:mb-4">{car.variant}</p>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                  {car.price}
                </span>
                <span className="text-sm sm:text-base text-text-secondary">
                  EMI from {car.emi}
                </span>
              </div>

              {/* Action Buttons - Sticky on Mobile */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => setShowQuoteForm(true)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-lg py-4 text-base sm:text-lg font-semibold"
                >
                  <Quote className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Get Quote
                </Button>
                <Button
                  size="lg"
                  onClick={openWhatsApp}
                  variant="outline"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white border-green-500 rounded-lg py-4 text-base sm:text-lg font-semibold"
                >
                  <WhatsAppIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Specifications - Mobile Optimized */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <feature.icon className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-text-secondary">{feature.label}</p>
                      <p className="text-sm font-semibold text-text-primary">
                        {feature.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features - Mobile Optimized */}
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-3 sm:mb-4">
                Key Features
              </h3>
              <div className="space-y-3">
                <KeyFeature
                  icon={ShieldCheck}
                  text="200+ Point Quality Inspection"
                  color="text-green-500"
                />
                <KeyFeature
                  icon={Award}
                  text="12-Month Warranty Included"
                  color="text-blue-500"
                />
                <KeyFeature
                  icon={ThumbsUp}
                  text="Complete Documentation Verified"
                  color="text-yellow-500"
                />
                <KeyFeature
                  icon={CarIcon}
                  text="Free Home Delivery Available"
                  color="text-purple-500"
                />
              </div>
            </div>

            {/* Contact Info - Mobile Optimized */}
            <div className="bg-primary/5 rounded-xl p-4 sm:p-6 border border-primary/10">
              <h3 className="text-base sm:text-lg font-semibold text-text-primary mb-3 sm:mb-4">
                Need Help? Contact Us
              </h3>
              <div className="space-y-2 text-text-secondary">
                <a href="tel:+919212121212" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm sm:text-base">+91 92121 21212</span>
                </a>
                <a href="mailto:info@signaturecars.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm sm:text-base">info@signaturecars.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Form Modal - Mobile Optimized */}
      <Dialog open={showQuoteForm} onOpenChange={setShowQuoteForm}>
        <DialogContent className="max-w-lg mx-4 my-4 max-h-[90vh] overflow-y-auto rounded-xl">
          <button
            onClick={() => setShowQuoteForm(false)}
            className="absolute right-3 top-3 rounded-full opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10 bg-white/80 backdrop-blur-sm p-1"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <DialogHeader className="pr-8">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-text-primary">
              Get Your Quote
            </DialogTitle>
            <p className="text-text-secondary text-sm mt-1">
              Our expert team will contact you within 2 hours with the best deals.
            </p>
          </DialogHeader>

          {/* Car Details in Modal - Mobile Optimized */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 border border-gray-200">
            <div className="flex gap-3">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={car.images?.[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop`}
                  alt={car.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-text-primary mb-1 truncate">
                  {car.name} {car.year}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary mb-2 truncate">{car.variant}</p>
                <div className="flex flex-wrap gap-2 text-xs text-text-secondary mb-2">
                  <span>{car.mileage}</span>
                  <span>•</span>
                  <span>{car.fuelType}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg sm:text-xl font-bold text-primary">{car.price}</span>
                  <span className="text-xs sm:text-sm text-text-secondary">EMI {car.emi}</span>
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

