"use client";

import { motion } from "framer-motion";
import {
  Car,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Buy Cars", href: "#cars" },
    { name: "Sell Car", href: "#sell" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    { name: "Car Financing", href: "#financing" },
    { name: "Insurance", href: "#insurance" },
    { name: "Service & Maintenance", href: "#service" },
    { name: "Documentation Help", href: "#documentation" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" },
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
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Column 1 - About */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">The Signature Cars</span>
            </div>
            <p className="text-sm text-white/80 mb-4 italic">
              "Where Quality Meets Luxury"
            </p>
            <p className="text-sm text-white/70 mb-6">
              Your trusted partner in finding the perfect premium car. We offer
              1000+ verified vehicles with comprehensive inspection and warranty.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/10 hover:bg-white hover:text-primary p-2 rounded-full transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 - Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 - Services */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 - Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">
                  123 Premium Plaza, MG Road,
                  <br />
                  Bangalore, Karnataka 560001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-white/70 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-white/70 flex-shrink-0" />
                <a
                  href="mailto:info@thesignaturecars.com"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  info@thesignaturecars.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-white/70 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/70">
                  <p>Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Row - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} The Signature Cars. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#privacy"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <span className="text-white/30">|</span>
              <a
                href="#terms"
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

