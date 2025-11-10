import { createClient } from '@/lib/supabase/client'
import { Car, CarFormData } from "@/lib/supabase/types"

const supabase = createClient()

export interface CarFilters {
  featured?: boolean;
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  fuelType?: string;
  [key: string]: any;
}

// Helper functions for car operations
export async function getCarById(id: string): Promise<Car | null> {
  const { data: car, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error || !car) return null
  return car
}

export async function getAllCars(filters: any = {}): Promise<Car[]> {
  let query = supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })

  // Apply filters if any
  if (filters.featured) {
    query = query.eq('featured', true)
  }
  
  const { data: cars, error } = await query
  
  if (error) {
    console.error('Error fetching cars:', error)
    return []
  }
  
  return cars || []
}

export function formatPrice(price: number | string): string {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 1,
    minimumFractionDigits: 1,
  })
    .format(priceNum / 100000)
    .replace('₹', '₹')
    .replace(/\.0$/, '') + ' L'
}

export function calculateEMI(price: number | string, months: number = 60): string {
  const priceNum = typeof price === 'string' ? parseFloat(price) : price
  const emi = (priceNum * 1.1) / months // 10% interest over 5 years (60 months)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  })
    .format(emi)
    .replace('₹', '₹') + '/mo'
}

export async function addCarWithVerification(
  carData: CarFormData, 
  verificationCode: string
): Promise<{ data: Car | null; error: Error | null }> {
  try {
    // Verify the code matches the one in environment variables
    if (verificationCode !== process.env.NEXT_PUBLIC_CAR_ADD_VERIFICATION_CODE) {
      return { 
        data: null, 
        error: new Error('Invalid verification code') 
      };
    }

    // Add the car to the database
    const { data, error } = await supabase
      .from('cars')
      .insert([{
        ...carData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_verified: true,
        status: 'active'
      }])
      .select()
      .single();

    if (error) throw error;
    
    return { data, error: null };
  } catch (error) {
    console.error('Error adding car:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error('Failed to add car') 
    };
  }
}

