"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Send, Star, ThumbsUp, Users } from "lucide-react";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const phoneNumberRegex = new RegExp(
  /^([+]?d{1,2}[-s]?)?d{3}[-s]?d{3}[-s]?d{4}$/
);

const lookingForOptions = [
  "Not Sure",
  "New Car",
  "Pre-owned Car",
  "Sell Car",
  "Car Service",
  "Car Insurance",
  "Other",
];

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  phoneNumber: z.string().refine((value) => phoneNumberRegex.test(value), {
    message: "Invalid phone number format.",
  }),
  lookingFor: z.string().refine((value) => lookingForOptions.includes(value), {
    message: "Please select a valid option.",
  }),
  message: z.string().optional(),
});

const LeadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      lookingFor: "Not Sure",
      message: "",
    },
  });

  const openWhatsApp = () => {
    const phoneNumber = "+919212121212";
    const message = "Hello, I would like to know more about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccessModal(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="w-full py-20 bg-gradient-to-br from-light to-accent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-up">
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Get in Touch
            </h2>
            <p className="text-text-secondary mb-6">
              Have questions or need assistance? Fill out the form below, and
              we&apos;ll get back to you shortly.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 9876543210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lookingFor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>You are looking for?</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                        {lookingForOptions.map((option) => (
                          <Button
                            key={option}
                            type="button"
                            variant={field.value === option ? "default" : "outline"}
                            onClick={() => field.onChange(option)}
                            className="w-full flex items-center justify-center transition-all"
                          >
                            {field.value === option && (
                              <Check className="w-4 h-4 mr-2" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific details or questions?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg hover-lift"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Side - Contact Info & Testimonials */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-up">
              <h3 className="text-2xl font-bold text-text-primary mb-4">
                Why Choose Us?
              </h3>
              <div className="space-y-4 text-text-secondary">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    <span className="font-semibold text-text-primary">
                      Quality You Can Trust:
                    </span>{" "}
                    Every car is hand-picked and passes a rigorous 200-point
                    inspection.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ThumbsUp className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    <span className="font-semibold text-text-primary">
                      Transparent Pricing:
                    </span>{" "}
                    No hidden fees. The price you see is the price you pay.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <p>
                    <span className="font-semibold text-text-primary">
                      Customer-First Approach:
                    </span>{" "}
                    We&apos;re dedicated to making your car buying experience
                    exceptional.
                  </p>
                </div>
              </div>
              <Button
                onClick={openWhatsApp}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white rounded-lg hover-lift"
              >
                Chat on WhatsApp
              </Button>
            </div>

            {/* Testimonial */}
            <div className="bg-white p-8 rounded-2xl shadow-lg animate-slide-up">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} fill="currentColor" className="h-5 w-5" />
                  ))}
                </div>
                <p className="ml-2 text-sm font-bold text-text-primary">
                  5.0 rating based on 1,200+ reviews
                </p>
              </div>
              <blockquote className="text-text-secondary italic">
                &quot;The best car buying experience I&apos;ve ever had. The team
                was professional, the process was seamless, and I got a fantastic
                deal on my dream car. Highly recommended!&quot;
              </blockquote>
              <p className="mt-4 font-semibold text-text-primary">- Aman Gupta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full text-center p-8 animate-scale-in">
            <div className="mx-auto bg-green-100 rounded-full h-20 w-20 flex items-center justify-center mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Submission Successful!
            </h2>
            <p className="text-text-secondary mb-8">
              Thank you for reaching out. We&apos;ve received your inquiry and one
              of our team members will contact you within 24 hours.
            </p>
            <Button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg hover-lift"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeadForm;

