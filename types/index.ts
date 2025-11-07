export interface Car {
  id: string;
  name: string;
  year: number;
  variant: string;
  brand: string;
  category: "Sedan" | "SUV" | "Hatchback" | "Luxury" | "Electric";
  mileage: string;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Manual" | "Automatic";
  price: string;
  emi: string;
  images: string[];
  featured?: boolean;
  badge?: "Featured" | "New Arrival" | "Best Deal";
  inspectionPassed: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  rating: number;
  review: string;
  purchase: string;
}

export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  lookingFor: string;
  budget: string;
  additionalRequirements?: string;
  privacyConsent: boolean;
}

