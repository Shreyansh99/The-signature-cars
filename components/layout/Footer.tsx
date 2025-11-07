"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const Footer = () => {


  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  const quickLinks = [
    { text: "Home", href: "#home" },
    { text: "About Us", href: "#about" },
    { text: "Inventory", href: "#inventory" },
    { text: "Services", href: "#services" },
    { text: "Testimonials", href: "#testimonials" },
    { text: "Contact Us", href: "#contact" },
  ];

  return (
    <footer className="bg-dark text-light py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Newsletter and Social */}
        <div
          className="grid lg:grid-cols-2 gap-8 items-center pb-12 border-b border-gray-700"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white">
              Stay Updated with The Signature Cars
            </h3>
            <p className="text-gray-400">
              Subscribe to our newsletter for the latest car arrivals, offers, and
              news.
            </p>
          </div>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-gray-800 border-gray-600 text-white rounded-l-md focus:ring-primary focus:border-primary"
            />
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-r-md">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Middle Section: Links and Contact */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-12"
        >
          {/* About */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">About Us</h4>
            <p className="text-gray-400 mb-4">
              The Signature Cars is a premier dealership for high-quality, pre-owned
              luxury vehicles. We are dedicated to providing a seamless and
              trustworthy car buying experience.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link href={link.href} key={index} className="text-gray-400 hover:text-primary transition-colors">
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary flex-shrink-0" />
                <span>
                  123 Luxury Lane, Prestige City, New Delhi, 110001, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <a href="tel:+919212121212" className="hover:text-primary">
                  +91 9212121212
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <a
                  href="mailto:contact@thesignaturecars.com"
                  className="hover:text-primary"
                >
                  contact@thesignaturecars.com
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Timings */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">
              Showroom Hours
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="font-semibold text-gray-300">Mon - Sat:</span> 10:00
                AM - 8:00 PM
              </li>
              <li>
                <span className="font-semibold text-gray-300">Sunday:</span> 11:00 AM
                - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div
          className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-500"
        >
          <p>
            &copy; {new Date().getFullYear()} The Signature Cars. All Rights
            Reserved.
          </p>
          <p className="text-sm mt-2">
            Designed & Developed with ❤️ by{" "}
            <a
              href="https://shreyas-sonwane.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Shreyas Sonwane
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

