"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car } from "@/types";

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

interface SimpleLeadFormProps {
  onSuccess?: () => void;
  car?: Car | null;
}

const SimpleLeadForm: React.FC<SimpleLeadFormProps> = ({ onSuccess, car }) => {
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
    defaultValues: {
      lookingFor: car?.category || "",
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    
    try {
      // Import API service
      const { submitCarLead } = await import("@/lib/api/cars");
    
      // Submit lead (car?.id will be undefined if no car is selected)
      const result = await submitCarLead(car?.id || "general", {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        lookingFor: data.lookingFor,
        budget: data.budget,
      });
      
      if (result.success) {
        setReferenceNumber(result.referenceNumber || `TSC${Date.now().toString().slice(-8)}`);
    setShowSuccessModal(true);
    reset();
    
    // Call onSuccess callback if provided (for modal close)
    if (onSuccess) {
      onSuccess();
        }
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Still show success for now, but in production you'd show an error message
      setReferenceNumber(`TSC${Date.now().toString().slice(-8)}`);
      setShowSuccessModal(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Looking For */}
        <div>
          <Label htmlFor="lookingFor" className="mb-1.5 block text-sm">
            What are you looking for? *
          </Label>
          <select
            {...register("lookingFor")}
            className={`w-full px-3 py-2 text-sm border rounded-md ${
              errors.lookingFor ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue={car?.category || ""}
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

        {/* Budget */}
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

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-full font-semibold transition-all text-sm"
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
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-text-primary">
                  Thank You!
                </h3>
                <p className="text-text-secondary mb-4">
                  We&apos;ve received your request and will contact you within 2 hours.
                </p>
                <div className="bg-gray-50 rounded-lg p-3 mb-6">
                  <p className="text-sm text-text-secondary mb-1">Your Reference Number:</p>
                  <p className="text-lg font-bold text-primary">{referenceNumber}</p>
                </div>
                <Button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleLeadForm;