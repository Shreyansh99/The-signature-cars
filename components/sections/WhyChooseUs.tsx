"use client";

import {
  ShieldCheck,
  BadgeIndianRupee,
  Truck,
  RotateCcw,
  Award,
  Calculator,
  Wrench,
  Users,
  CheckCircle2,
  Phone,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LeadFormModal from "@/components/ui/lead-form-modal";

const WhyChooseUs = () => {
  const [showLeadFormModal, setShowLeadFormModal] = useState(false);
  const features = [
    {
      icon: ShieldCheck,
      title: "200+ Point Inspection",
      description: "Every car passes rigorous quality checks",
      subPoints: [
        "Engine & transmission tested",
        "Safety systems verified",
        "Complete service history",
        "100% accident-free guarantee",
      ],
    },
    {
      icon: BadgeIndianRupee,
      title: "Save Up to ₹2 Lakhs",
      description: "Best prices guaranteed or we match it",
      subPoints: [
        "Lowest market prices",
        "Instant price match",
        "Zero hidden fees",
        "Transparent valuation",
      ],
    },
    {
      icon: RotateCcw,
      title: "7-Day Return Policy",
      description: "Love it or return it - no questions asked",
      subPoints: [
        "Full refund guarantee",
        "Free pickup service",
        "No restocking fees",
        "Instant refund processing",
      ],
    },
    {
      icon: Award,
      title: "5-Year Warranty",
      description: "Comprehensive coverage for peace of mind",
      subPoints: [
        "Engine & gearbox warranty",
        "24/7 roadside assistance",
        "Free maintenance packages",
        "Nationwide service network",
      ],
    },
  ];

  const guarantees = [
    {
      icon: Star,
      title: "4.9/5 Customer Rating",
      description: "From 10,000+ happy customers",
    },
    {
      icon: Truck,
      title: "24-Hour Delivery",
      description: "Get your car delivered to your doorstep",
    },
    {
      icon: Calculator,
      title: "99% Loan Approval",
      description: "Instant financing at lowest rates",
    },
  ];



  return (
    <section id="why-choose-us" className="py-8 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - More Conversion Focused */}
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            TRUSTED BY 10,000+ CUSTOMERS
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mt-3 mb-3">
            Why Smart Buyers Choose Signature Cars
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-lg">
            Get the best deals, guaranteed quality, and complete peace of mind with every purchase
          </p>
        </motion.div>

        {/* Top Guarantees - Immediate Trust Building */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={guarantee.title}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <guarantee.icon className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-bold text-text-primary mb-1">
                {guarantee.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {guarantee.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid - Focused on Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary/30 group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg mb-3">
                <feature.icon className="h-5 w-5 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary mb-3 font-medium">
                {feature.description}
              </p>

              {/* Sub-points */}
              <ul className="space-y-1.5">
                {feature.subPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-2 text-sm text-text-secondary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Strong CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-6 lg:p-8 text-center border border-gray-200 shadow-sm"
        >
          <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-text-primary">
            Ready to Experience the Signature Difference?
          </h3>
          <p className="text-lg mb-4 text-text-secondary max-w-2xl mx-auto">
            Join thousands of satisfied customers who got their dream car with complete peace of mind
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => setShowLeadFormModal(true)}
            >
              Get Instant Quote
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg font-semibold"
              onClick={() => window.open('tel:+919999999999', '_self')}
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Now: +91 99999 99999
            </Button>
          </div>
          <p className="text-sm mt-3 opacity-75">
            Limited time offer: Get ₹25,000 off on your first purchase
          </p>
        </motion.div>
      </div>
      
      {/* Lead Form Modal */}
      <LeadFormModal open={showLeadFormModal} onOpenChange={setShowLeadFormModal} />
    </section>
  );
};

export default WhyChooseUs;

