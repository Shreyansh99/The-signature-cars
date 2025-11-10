export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cars: {
        Row: {
          id: string
          brand: string
          model: string
          year: number
          price: number
          mileage: number
          fuel_type: string
          transmission: string
          color: string
          body_type: string
          engine_size: number
          power: number
          seats: number
          doors: number
          description: string
          featured: boolean
          is_verified: boolean
          status: string
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand: string
          model: string
          year: number
          price: number
          mileage: number
          fuel_type: string
          transmission: string
          color: string
          body_type: string
          engine_size: number
          power: number
          seats: number
          doors: number
          description: string
          featured?: boolean
          is_verified?: boolean
          status?: string
          images: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string
          year?: number
          price?: number
          mileage?: number
          fuel_type?: string
          transmission?: string
          color?: string
          body_type?: string
          engine_size?: number
          power?: number
          seats?: number
          doors?: number
          description?: string
          featured?: boolean
          is_verified?: boolean
          status?: string
          images?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          car_id: string | null
          full_name: string
          email: string
          phone: string
          looking_for: string | null
          budget: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          car_id?: string | null
          full_name: string
          email: string
          phone: string
          looking_for?: string | null
          budget?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          car_id?: string | null
          full_name?: string
          email?: string
          phone?: string
          looking_for?: string | null
          budget?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
