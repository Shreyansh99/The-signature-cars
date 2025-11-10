import { Database } from './database.types'

export type Car = Database['public']['Tables']['cars']['Row']
export type CarFormData = Omit<Database['public']['Tables']['cars']['Insert'], 'id' | 'created_at' | 'updated_at' | 'is_verified' | 'status' | 'images'> & {
  images: string[]
}
