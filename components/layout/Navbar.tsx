"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LeadFormModal from "@/components/ui/lead-form-modal";
import Link from "next/link";

const Navbar = () => {
  const [showLeadFormModal, setShowLeadFormModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsScrolled(false);
        setIsVisible(true);
      } else {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-20">
          {/* Logo - Now clickable and redirects to home */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center space-x-2 group"
              aria-label="The Signature Cars - Home"
            >
              <div className="bg-primary p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                The Signature Cars
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors relative group"
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="tel:+919876543210"
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
              aria-label="Call us at +91 98765 43210"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">+91 98765 43210</span>
            </Link>
            <Button 
              className="rounded-full bg-primary hover:bg-primary/90 text-white px-6"
              onClick={() => setShowLeadFormModal(true)}
              aria-label="Get a quote"
            >
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
              aria-label="Mobile navigation menu"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="The Signature Cars - Home"
                  >
                    <div className="bg-primary p-2 rounded-lg">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-text-primary">
                      The Signature Cars
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center w-full px-4 py-3 text-text-secondary hover:bg-accent hover:text-primary rounded-lg transition-colors"
                      aria-label={`Navigate to ${link.name}`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 space-y-4">
                  <Link
                    href="tel:+919876543210"
                    className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Call us at +91 98765 43210"
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-sm font-medium">+91 98765 43210</span>
                  </Link>
                  <Button 
                    className="w-full rounded-full bg-primary hover:bg-primary/90 text-white"
                    onClick={() => setShowLeadFormModal(true)}
                    aria-label="Get a quote"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
        {/* Lead Form Modal */}
        <LeadFormModal open={showLeadFormModal} onOpenChange={setShowLeadFormModal} />
    </motion.nav>
  );
};

export default Navbar;

