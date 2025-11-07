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
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "200+ Point Inspection",
      description: "Comprehensive quality checks on every vehicle",
      subPoints: [
        "Mechanical inspection",
        "Body & paint check",
        "Interior condition",
        "Documentation verification",
      ],
    },
    {
      icon: BadgeIndianRupee,
      title: "Best Price Guarantee",
      description: "Competitive prices with price match promise",
      subPoints: [
        "Transparent pricing",
        "No hidden charges",
        "Price match guarantee",
        "Best market value",
      ],
    },
    {
      icon: Truck,
      title: "Quick Delivery",
      description: "Get your car delivered in 24-48 hours",
      subPoints: [
        "Doorstep delivery",
        "Pan-India service",
        "Safe transportation",
        "Real-time tracking",
      ],
    },
    {
      icon: RotateCcw,
      title: "7-Day Money Back",
      description: "No questions asked return policy",
      subPoints: [
        "Full refund guarantee",
        "Easy return process",
        "No hidden terms",
        "Customer satisfaction",
      ],
    },
    {
      icon: Award,
      title: "Comprehensive Warranty",
      description: "Extended warranty options available",
      subPoints: [
        "Engine warranty",
        "Transmission coverage",
        "Roadside assistance",
        "24/7 support",
      ],
    },
    {
      icon: Calculator,
      title: "Flexible Financing",
      description: "Instant loan approvals with low interest",
      subPoints: [
        "Low interest rates",
        "Flexible tenure",
        "Quick approval",
        "Multiple bank options",
      ],
    },
    {
      icon: Wrench,
      title: "Complimentary Services",
      description: "3 free services included with every purchase",
      subPoints: [
        "Free servicing",
        "Insurance transfer",
        "RC transfer",
        "Documentation help",
      ],
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "10+ years of industry experience",
      subPoints: [
        "Certified advisors",
        "24/7 customer support",
        "Personalized assistance",
        "Post-sale support",
      ],
    },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "1,000+", label: "Cars Sold" },
    { value: "4.9/5", label: "Customer Rating" },
    { value: "50+", label: "Cities Served" },
  ];



  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-white to-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-4 mb-4">
            The Signature Cars Advantage
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Experience premium service and unmatched quality with every purchase.
            We&apos;re committed to making your car buying journey smooth and hassle-free.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-primary/30 group hover-lift"
            >
              {/* Icon Container */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 group-hover:shadow-lg transition-all duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {feature.description}
              </p>

              {/* Sub-points */}
              <ul className="space-y-2">
                {feature.subPoints.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-start space-x-2 text-xs text-text-secondary"
                  >
                    <CheckCircle2 className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-text-secondary font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

