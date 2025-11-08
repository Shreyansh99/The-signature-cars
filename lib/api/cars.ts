import { Car } from "@/types";

/**
 * API service for car data
 * Currently uses static data, but will be replaced with backend API calls
 */

// TODO: Replace with actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * Fetch all cars from the backend
 * @returns Promise<Car[]>
 */
export async function fetchAllCars(): Promise<Car[]> {
  // TODO: Uncomment when backend is ready
  // try {
  //   const response = await fetch(`${API_BASE_URL}/cars`, {
  //     next: { revalidate: 60 }, // Revalidate every 60 seconds for ISR
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch cars");
  //   }
  //   
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error fetching cars:", error);
  //   throw error;
  // }

  // Temporary: Return static data
  const { getAllCars } = await import("../cars");
  return getAllCars();
}

/**
 * Fetch a single car by ID from the backend
 * @param id - Car ID
 * @returns Promise<Car | null>
 */
export async function fetchCarById(id: string): Promise<Car | null> {
  // TODO: Uncomment when backend is ready
  // try {
  //   const response = await fetch(`${API_BASE_URL}/cars/${id}`, {
  //     next: { revalidate: 60 }, // Revalidate every 60 seconds for ISR
  //   });
  //   
  //   if (!response.ok) {
  //     if (response.status === 404) {
  //       return null;
  //     }
  //     throw new Error("Failed to fetch car");
  //   }
  //   
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error fetching car:", error);
  //   throw error;
  // }

  // Temporary: Return static data
  const { getCarById } = await import("../cars");
  return getCarById(id) || null;
}

/**
 * Search/filter cars based on query parameters
 * @param params - Search parameters (category, brand, price range, etc.)
 * @returns Promise<Car[]>
 */
export async function searchCars(params: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  transmission?: string;
  query?: string;
}): Promise<Car[]> {
  // TODO: Uncomment when backend is ready
  // try {
  //   const queryString = new URLSearchParams(
  //     Object.entries(params).reduce((acc, [key, value]) => {
  //       if (value !== undefined && value !== null && value !== "") {
  //         acc[key] = String(value);
  //       }
  //       return acc;
  //     }, {} as Record<string, string>)
  //   ).toString();
  //   
  //   const response = await fetch(`${API_BASE_URL}/cars/search?${queryString}`, {
  //     next: { revalidate: 60 },
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error("Failed to search cars");
  //   }
  //   
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error searching cars:", error);
  //   throw error;
  // }

  // Temporary: Filter static data
  const { getAllCars } = await import("../cars");
  const allCars = getAllCars();
  
  return allCars.filter((car) => {
    if (params.category && car.category !== params.category) return false;
    if (params.brand && car.brand !== params.brand) return false;
    if (params.fuelType && car.fuelType !== params.fuelType) return false;
    if (params.transmission && car.transmission !== params.transmission) return false;
    if (params.query) {
      const searchQuery = params.query.toLowerCase();
      const searchableText = `${car.name} ${car.brand} ${car.variant}`.toLowerCase();
      if (!searchableText.includes(searchQuery)) return false;
    }
    // TODO: Add price range filtering when backend is ready
    return true;
  });
}

/**
 * Submit a lead form for a specific car
 * @param carId - Car ID
 * @param formData - Lead form data
 * @returns Promise<{ success: boolean; referenceNumber?: string }>
 */
export async function submitCarLead(
  carId: string,
  formData: {
    fullName: string;
    email: string;
    phone: string;
    lookingFor?: string;
    budget?: string;
    message?: string;
  }
): Promise<{ success: boolean; referenceNumber?: string }> {
  // TODO: Uncomment when backend is ready
  // try {
  //   const response = await fetch(`${API_BASE_URL}/cars/${carId}/lead`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(formData),
  //   });
  //   
  //   if (!response.ok) {
  //     throw new Error("Failed to submit lead");
  //   }
  //   
  //   return await response.json();
  // } catch (error) {
  //   console.error("Error submitting lead:", error);
  //   throw error;
  // }

  // Temporary: Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const referenceNumber = `TSC${Date.now().toString().slice(-8)}`;
  return { success: true, referenceNumber };
}
