"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SimpleLeadForm from "@/components/ui/simple-lead-form";
import { Car } from "@/types";
import Image from "next/image";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car?: Car | null;
}

const LeadFormModal = ({ open, onOpenChange, car }: LeadFormModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-text-primary">
              {car ? `Get Quote for ${car.name}` : "Get Your Dream Car Quote"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-text-secondary mt-2">
            Fill out this form and our expert team will contact you within 2 hours with the best deals.
          </p>
        </DialogHeader>
        
        {/* Car Details Section */}
        {car && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={car.images[0] || `https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&q=80&sig=${car.id}`}
                  alt={car.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-text-primary mb-1">
                  {car.name} {car.year}
                </h3>
                <p className="text-sm text-text-secondary mb-2">{car.variant}</p>
                <div className="flex flex-wrap gap-3 text-xs text-text-secondary mb-2">
                  <span>{car.mileage}</span>
                  <span>•</span>
                  <span>{car.fuelType}</span>
                  <span>•</span>
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{car.price}</span>
                  <span className="text-sm text-text-secondary">EMI {car.emi}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <SimpleLeadForm onSuccess={() => onOpenChange(false)} car={car} />
      </DialogContent>
    </Dialog>
  );
};

export default LeadFormModal;