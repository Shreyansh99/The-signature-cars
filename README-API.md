# API Integration Guide

This document explains how to transition from static data to backend API calls.

## Current Setup

Currently, the app uses static data from `lib/cars.ts`. The API service layer in `lib/api/cars.ts` is set up to make the transition seamless.

## Architecture

```
lib/
├── cars.ts              # Static data (temporary)
└── api/
    └── cars.ts          # API service layer (will call backend)
```

## Transition Steps

### 1. Backend Setup

Create your backend API endpoints:

- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/search` - Search/filter cars (query params: category, brand, minPrice, maxPrice, fuelType, transmission, query)
- `POST /api/cars/:id/lead` - Submit lead form for a car

### 2. Update API Service

Edit `lib/api/cars.ts` and:

1. Set the `API_BASE_URL` environment variable:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   ```

2. Uncomment the API calls in each function:
   - `fetchAllCars()`
   - `fetchCarById()`
   - `searchCars()`
   - `submitCarLead()`

3. Remove or comment out the static data fallbacks.

### 3. Environment Variables

Add to `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### 4. API Response Format

Your backend should return data in this format:

**Car Object:**
```typescript
{
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
```

**Lead Submission Response:**
```typescript
{
  success: boolean;
  referenceNumber?: string;
}
```

### 5. Testing

1. Start with a local backend
2. Update `API_BASE_URL` to `http://localhost:3001` (or your backend port)
3. Uncomment API calls in `lib/api/cars.ts`
4. Test each endpoint
5. Deploy backend
6. Update `API_BASE_URL` to production URL

## Benefits of This Architecture

1. **Easy Transition**: Just uncomment code and set environment variable
2. **Type Safety**: TypeScript ensures data consistency
3. **Error Handling**: Already implemented
4. **SSR/ISR Ready**: Uses Next.js `fetch` with revalidation
5. **No Breaking Changes**: Frontend components don't need changes

## Notes

- The API service uses Next.js Server Components by default (for SSR/ISR)
- For client-side fetching, you might want to add a client-side hook
- Error handling is basic - enhance as needed for production
- Consider adding request caching, retries, and rate limiting



