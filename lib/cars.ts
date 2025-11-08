import { Car } from "@/types";

// Sample car data - In production, this would come from a database or API
export const sampleCars: Car[] = [
  {
    id: "1",
    name: "Mercedes-Benz C-Class",
    year: 2023,
    variant: "C 220d",
    brand: "Mercedes-Benz",
    category: "Sedan",
    mileage: "15,420 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹14.2 L",
    emi: "₹28,500/mo",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
    ],
    featured: true,
    badge: "Featured",
    inspectionPassed: true,
  },
  {
    id: "2",
    name: "BMW X5",
    year: 2022,
    variant: "xDrive30d",
    brand: "BMW",
    category: "SUV",
    mileage: "22,100 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹55.5 L",
    emi: "₹1,10,000/mo",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
    ],
    badge: "New Arrival",
    inspectionPassed: true,
  },
  {
    id: "3",
    name: "Audi A4",
    year: 2023,
    variant: "Premium Plus",
    brand: "Audi",
    category: "Sedan",
    mileage: "8,500 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹18.9 L",
    emi: "₹37,500/mo",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop",
    ],
    inspectionPassed: true,
  },
  {
    id: "4",
    name: "Hyundai Creta",
    year: 2023,
    variant: "SX (O) Turbo",
    brand: "Hyundai",
    category: "SUV",
    mileage: "12,300 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹9.8 L",
    emi: "₹19,500/mo",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
    ],
    badge: "Best Deal",
    inspectionPassed: true,
  },
  {
    id: "5",
    name: "Honda City",
    year: 2023,
    variant: "VX CVT",
    brand: "Honda",
    category: "Sedan",
    mileage: "10,200 km",
    fuelType: "Petrol",
    transmission: "Automatic",
    price: "₹7.5 L",
    emi: "₹15,000/mo",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop",
    ],
    inspectionPassed: true,
  },
  {
    id: "6",
    name: "Toyota Fortuner",
    year: 2022,
    variant: "4x4 AT",
    brand: "Toyota",
    category: "SUV",
    mileage: "25,000 km",
    fuelType: "Diesel",
    transmission: "Automatic",
    price: "₹32.5 L",
    emi: "₹64,500/mo",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
    ],
    inspectionPassed: true,
  },
];

export function getCarById(id: string): Car | undefined {
  return sampleCars.find((car) => car.id === id);
}

export function getAllCars(): Car[] {
  return sampleCars;
}


