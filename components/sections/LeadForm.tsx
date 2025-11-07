"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  BadgeCheck,
  Shield,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Zod validation schema
const leadFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  lookingFor: z.string().min(1, "Please select what you're looking for"),
  budget: z.string().optional(),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  onSuccess?: () => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate reference number
    const refNum = `TSC${Date.now().toString().slice(-8)}`;
    setReferenceNumber(refNum);
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
    reset();
    
    // Call onSuccess callback if provided (for modal close)
    if (onSuccess) {
      onSuccess();
    }
  };

  const benefits = [
    {
      icon: BadgeCheck,
      title: "Best Price Guarantee",
      description: "We match or beat any competitor's price",
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "Your data is encrypted and protected",
    },
    {
      icon: Clock,
      title: "Quick Response (2 hours)",
      description: "Our experts will contact you within 2 hours",
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "10+ years of industry experience",
    },
  ];

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

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Left Column - Benefits - Compact */}
        <motion.div
          variants={itemVariants}
          className="bg-white p-4 lg:p-6 text-text-primary border-r border-gray-200"
        >
          <div className="inline-block px-3 py-1.5 bg-primary/10 rounded-full text-xs font-semibold mb-3 text-primary">
            THE SIGNATURE CARS ADVANTAGE
          </div>

          <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-text-primary">
            Get Your Dream Car Quote in 30 Seconds
          </h2>

          <p className="text-text-secondary mb-4">
            Fill out the form and our expert team will contact you within 2
            hours with the best deals.
          </p>

          {/* Benefits List - Compact */}
          <div className="space-y-3 mb-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start space-x-3"
              >
                <div className="bg-primary/10 p-2.5 rounded-lg flex-shrink-0">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5 text-text-primary">{benefit.title}</h3>
                  <p className="text-xs text-text-secondary">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Stats - Compact */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div>
              <p className="text-lg lg:text-xl font-bold text-text-primary">10,000+</p>
              <p className="text-xs text-text-secondary">Happy Customers</p>
            </div>
            <div>
              <p className="text-lg lg:text-xl font-bold text-text-primary">4.9/5</p>
              <p className="text-xs text-text-secondary">Rating</p>
            </div>
            <div>
              <p className="text-lg lg:text-xl font-bold text-text-primary">1,000+</p>
              <p className="text-xs text-text-secondary">Cars Sold</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form - Compact */}
        <motion.div variants={itemVariants} className="p-4 lg:p-6">
          <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-3">
            Get Started in Seconds
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* Full Name - Compact */}
            <div>
              <Label htmlFor="fullName" className="flex items-center space-x-2 mb-1.5 text-sm">
                <User className="h-4 w-4 text-primary" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="fullName"
                {...register("fullName")}
                placeholder="Enter your full name"
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email - Compact */}
            <div>
              <Label htmlFor="email" className="flex items-center space-x-2 mb-1.5 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email Address *</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="your.email@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone - Compact */}
            <div>
              <Label htmlFor="phone" className="flex items-center space-x-2 mb-1.5 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="9876543210"
                maxLength={10}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Looking For - Compact */}
            <div>
              <Label htmlFor="lookingFor" className="mb-1.5 block text-sm">
                What are you looking for? *
              </Label>
              <select
                {...register("lookingFor")}
                className={`w-full px-3 py-2 text-sm border rounded-md ${
                  errors.lookingFor ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select an option</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Electric">Electric</option>
                <option value="Not Sure">Not Sure</option>
              </select>
              {errors.lookingFor && (
                <p className="text-red-500 text-xs mt-1">{errors.lookingFor.message}</p>
              )}
            </div>

            {/* Budget - Compact */}
            <div>
              <Label htmlFor="budget" className="mb-1.5 block text-sm">
                Your Budget
              </Label>
              <select
                {...register("budget")}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
              >
                <option value="">Select budget range</option>
                <option value="Under 5L">Under ₹5L</option>
                <option value="5-10L">₹5L - ₹10L</option>
                <option value="10-20L">₹10L - ₹20L</option>
                <option value="20-30L">₹20L - ₹30L</option>
                <option value="30L+">₹30L+</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            {/* Submit Button - Compact */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 rounded-full font-semibold transition-all text-sm"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Get Instant Quote
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 1,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </motion.div>

                <h3 className="text-2xl font-bold text-text-primary mb-2">
                  Thank You!
                </h3>
                <p className="text-text-secondary mb-4">
                  We&apos;ve received your request. Our expert team will contact you
                  within 2 hours.
                </p>

                <div className="bg-accent/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-text-secondary mb-1">
                    Your Reference Number
                  </p>
                  <p className="text-xl font-bold text-primary">{referenceNumber}</p>
                </div>

                <Button
                  onClick={() =>
                    window.open(
                    "https://wa.me/919876543210?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request.%20My%20reference%20number%20is%20" +
                      referenceNumber,
                    "_blank"
                  )
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white mb-3"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat on WhatsApp Now
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeadForm;

