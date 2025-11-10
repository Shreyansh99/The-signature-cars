import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/sections/ProductDetail";
import { carsApi } from "@/lib/api/cars";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  // Using the API service layer for consistency
  const { data: car } = await carsApi.getCarById(params.id);

  if (!car) {
    return {
      title: "Car Not Found | The Signature Cars",
    };
  }

  return {
    title: `${car.name} ${car.year} - ${car.price} | The Signature Cars`,
    description: `View details of ${car.name} ${car.year} ${car.variant}. Price: ${car.price}, EMI: ${car.emi}. ${car.mileage} driven, ${car.fuelType}, ${car.transmission} transmission.`,
  };
}

export default async function CarDetailPage({ params }: PageProps) {
  // Using the API service layer - will automatically switch to backend when ready
  const { data: car } = await carsApi.getCarById(params.id);

  if (!car) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProductDetail car={car} />
      <Footer />
    </main>
  );
}

