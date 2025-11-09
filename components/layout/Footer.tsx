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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          {/* Column 1 - About */}
          <motion.div variants={itemVariants}>
            <a href="#home" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
              <div className="bg-white p-2 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold">The Signature Cars</span>
            </a>
            <p className="text-sm text-white/80 mb-4 italic">
              &quot;Where Quality Meets Luxury&quot;
            </p>
            <p className="text-sm text-white/70 mb-6">
              Your trusted partner for premium cars.
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

            <div className="mt-6 pt-6 border-t border-white/10">
              <ul className="space-y-4">
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
              </ul>
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
        </motion.div>

        {/* Bottom Row - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-6 border-t border-white/20"
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

