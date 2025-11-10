'use client';

import { useState, useRef } from 'react';
import { Formik, Form, Field, useField } from 'formik';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Upload } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/lib/supabase/database.types';
import { VerificationModal } from '@/components/ui/verification-modal';
import { verifyCarCode } from '@/lib/utils/verification';
import { useRouter } from 'next/navigation';

interface CarFormValues {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel_type: string;
  transmission: string;
  color: string;
  body_type: string;
  engine_size: number;
  power: number;
  seats: number;
  doors: number;
  description: string;
  featured?: boolean;
  is_verified?: boolean;
  status?: string;
  images: string[];

  // Verification (not stored in DB)
  verification_code: string;
}

const initialValues: CarFormValues = {
  id: '',
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  fuel_type: 'Petrol',
  transmission: 'Automatic',
  color: '',
  body_type: 'Sedan',
  engine_size: 0,
  power: 0,
  seats: 4,
  doors: 4,
  description: '',
  featured: false,
  is_verified: false,
  status: 'active',
  images: [],

  // Verification
  verification_code: ''
};

const CheckboxField = ({ name, label, ...props }: { name: string; label: string; [key: string]: any }) => {
  const [field] = useField(name);
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={name}
        checked={field.value}
        onCheckedChange={(checked) => {
          field.onChange({
            target: {
              name: field.name,
              value: checked
            }
          });
        }}
        onBlur={field.onBlur}
        name={field.name}
        {...props}
      />
      <Label htmlFor={name}>{label}</Label>
    </div>
  );
};

export default function AddCarForm() {
  const router = useRouter();
  const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [formData, setFormData] = useState<CarFormValues | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add toast notification function
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // You can replace this with your preferred toast implementation
    // For example, using react-hot-toast or sonner
    console.log(`${type.toUpperCase()}: ${message}`);
  };
  
  const handleFormSubmit = (values: CarFormValues) => {
    // Store form data and show verification
    setFormData(values);
    setShowVerification(true);
  };

  const handleVerificationSuccess = () => {
    if (formData) {
      submitCarData(formData);
    }
  };

  const submitCarData = async (data: CarFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Upload images first if any
      const imageUrls = await Promise.all(
        data.images.map(async (image) => {
          if (image.startsWith('blob:')) {
            // Convert blob to file and upload
            const response = await fetch(image);
            const blob = await response.blob();
            const file = new File([blob], `car-${Date.now()}.jpg`, { type: 'image/jpeg' });
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('car_images')
              .upload(`public/${file.name}`, file);

            if (uploadError) throw uploadError;
            
            const { data: { publicUrl } } = supabase.storage
              .from('car_images')
              .getPublicUrl(uploadData.path);
              
            return publicUrl;
          }
          return image;
        })
      );

      // Prepare car data for submission - mapping to Supabase database schema
      const carData: Record<string, any> = {
        brand: data.brand,
        model: data.model,
        year: Number(data.year),
        price: Number(data.price),
        mileage: Number(data.mileage),
        fuel_type: data.fuel_type,
        transmission: data.transmission,
        color: data.color,
        body_type: data.body_type,
        engine_size: Number(data.engine_size),
        power: Number(data.power),
        seats: Number(data.seats),
        doors: Number(data.doors),
        description: data.description,
        images: imageUrls,
        featured: data.featured || false,
        is_verified: true,
        status: data.status || 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Remove any undefined values
      Object.keys(carData).forEach(key => {
        if (carData[key] === undefined) {
          delete carData[key];
        }
      });

      // Submit to Supabase
      const { data: car, error } = await supabase
        .from('cars')
        .insert([carData])
        .select()
        .single();

      if (error) throw error;

      showToast('Car added successfully!');
      router.push('/cars');
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast(error instanceof Error ? error.message : 'Failed to add car. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
      setShowVerification(false);
    }
  };

  const verifyCode = async (
    code: string,
    _sessionId: string,
    _csrfToken: string
  ): Promise<{ valid: boolean; token?: string; error?: string; remaining_attempts?: number }> => {
    try {
      const response = await fetch('/api/verify-car-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        return { valid: false, error: 'Verification failed' };
      }

      const result = await response.json();
      return { valid: !!result.success };
    } catch (error) {
      console.error('Verification error:', error);
      return { valid: false, error: 'Verification error' };
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    currentImages: string[]
  ) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    
    setIsUploading(true);
    
    // Convert FileList to array and filter images
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    // Create object URLs for preview
    const newImages = imageFiles.map(file => URL.createObjectURL(file));
    
    // Update form field with new images (limit to 10 total)
    setFieldValue('images', [...currentImages, ...newImages].slice(0, 10));
    
    // Reset the file input to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    setIsUploading(false);
  };
  
  const removeImage = (
    index: number,
    setFieldValue: (field: string, value: any) => void,
    currentImages: string[]
  ) => {
    const newImages = [...currentImages];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index]);
    newImages.splice(index, 1);
    setFieldValue('images', newImages);
  };

  return (
    <div className="container mx-auto py-8">
      <Formik
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="space-y-6 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Car</CardTitle>
                <CardDescription>Fill in the details of the car you want to add to inventory.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Information */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Field 
                      as={Input} 
                      id="brand" 
                      name="brand" 
                      placeholder="e.g., Toyota" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model *</Label>
                    <Field 
                      as={Input} 
                      id="model" 
                      name="model" 
                      placeholder="e.g., Camry" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Field 
                      as={Input} 
                      id="year" 
                      name="year" 
                      type="number" 
                      min="1900" 
                      max={new Date().getFullYear() + 1}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Field 
                      as={Input} 
                      id="price" 
                      name="price" 
                      type="number"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage (km) *</Label>
                    <Field 
                      as={Input} 
                      id="mileage" 
                      name="mileage" 
                      type="number"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel_type">Fuel Type *</Label>
                    <Field 
                      as="select"
                      id="fuel_type"
                      name="fuel_type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Petrol">Petrol</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Electric">Electric</option>
                      <option value="Hybrid">Hybrid</option>
                    </Field>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission *</Label>
                    <Field 
                      as="select"
                      id="transmission"
                      name="transmission"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </Field>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color *</Label>
                    <Field 
                      as={Input} 
                      id="color" 
                      name="color" 
                      placeholder="e.g., Red" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="body_type">Body Type *</Label>
                    <Field 
                      as="select"
                      id="body_type"
                      name="body_type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="Coupe">Coupe</option>
                      <option value="Convertible">Convertible</option>
                      <option value="Wagon">Wagon</option>
                    </Field>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engine_size">Engine Size (L) *</Label>
                    <Field 
                      as={Input} 
                      id="engine_size" 
                      name="engine_size" 
                      type="number"
                      step="0.1"
                      placeholder="e.g., 2.5"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="power">Power (HP) *</Label>
                    <Field 
                      as={Input} 
                      id="power" 
                      name="power" 
                      type="number"
                      placeholder="e.g., 200"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seats">Seats *</Label>
                    <Field 
                      as={Input} 
                      id="seats" 
                      name="seats" 
                      type="number"
                      min="1"
                      max="9"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors *</Label>
                    <Field 
                      as={Input} 
                      id="doors" 
                      name="doors" 
                      type="number"
                      min="2"
                      max="5"
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <CheckboxField
                      name="featured"
                      label="Featured Listing"
                    />
                  </div>
                  </CardContent>
                </Card>
              
              {/* Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Images</h3>
                <p className="text-sm text-gray-500">Upload high-quality images of the car (max 10)</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {values.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="h-32 w-full bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={image} 
                          alt={`Car image ${index + 1}`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index, setFieldValue, values.images)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <label 
                    className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const files = Array.from(e.dataTransfer.files).filter(file => 
                        file.type.startsWith('image/')
                      );
                      
                      // Create a proper FileList-like object
                      const dataTransfer = new DataTransfer();
                      files.forEach(file => dataTransfer.items.add(file));
                      
                      // Create a new event with the proper type
                      const event = {
                        target: {
                          files: dataTransfer.files
                        }
                      } as unknown as React.ChangeEvent<HTMLInputElement>;
                      
                      handleImageUpload(event, setFieldValue, values.images);
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleImageUpload(e, setFieldValue, values.images)}
                    />
                    <div className="flex flex-col items-center">
                      <Upload className="h-6 w-6 text-gray-400 mb-1" />
                      <span className="text-sm text-gray-500">Upload Image</span>
                    </div>
                  </label>
                </div>
                
                {isUploading && (
                  <div className="mt-2 text-sm text-gray-500">
                    Uploading images...
                  </div>
                )}
              </div>
              
              {/* Description */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                  <CardDescription>Provide a detailed description of the car</CardDescription>
                </CardHeader>
                <CardContent>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    placeholder="Enter car description..."
                    rows={4}
                    className="min-h-[120px]"
                    required
                  />
                </CardContent>
              </Card>
              
              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Additional features and services can be configured after the car is added.</p>
                  </div>
                </CardContent>
              </Card>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Adding Car...' : 'Add Car'}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
      
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={verifyCode}
        onSuccess={handleVerificationSuccess}
      />
    </div>
  );
}
