# The Signature Cars 🚗

**Where Quality Meets Luxury**

A premium car dealership website built with Next.js 14, TypeScript, and modern web technologies. Designed for the Indian market with a focus on luxury car buyers.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.3-ff0055)

## 🌟 Features

### Core Functionality
- **1000+ Verified Cars** - Browse premium vehicles with comprehensive inspection
- **Advanced Search** - Filter by brand, budget, and fuel type
- **Lead Generation** - High-converting quote request form with validation
- **Testimonials Carousel** - Auto-playing customer reviews
- **Responsive Design** - Mobile-first approach with smooth animations

### Technical Features
- ✅ Next.js 14 with App Router
- ✅ TypeScript (strict mode)
- ✅ Tailwind CSS with custom color palette
- ✅ Framer Motion animations
- ✅ React Hook Form + Zod validation
- ✅ SEO optimized with metadata
- ✅ Accessibility (WCAG AA compliant)
- ✅ Performance optimized

## 🎨 Design System

### Color Palette
```css
Primary:    #7286D3  /* Blue */
Secondary:  #8EA7E9  /* Light Blue */
Accent:     #E5E0FF  /* Lavender */
Light:      #FFF2F2  /* Pink White */
Dark:       #2C3E50  /* Dark Blue */
Text Primary:   #1A1A2E
Text Secondary: #4A5568
```

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, 3xl-6xl
- Body: Regular, sm-lg

## 📁 Project Structure

```
the-signature-cars/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Sticky navigation with dropdowns
│   │   └── Footer.tsx      # 4-column footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section with search
│   │   ├── FeaturedCars.tsx # Car listings grid
│   │   ├── WhyChooseUs.tsx  # Features section
│   │   ├── LeadForm.tsx     # Quote request form
│   │   └── Testimonials.tsx # Customer reviews carousel
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── checkbox.tsx
│       ├── label.tsx
│       └── dialog.tsx
├── lib/
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/                 # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd the-signature-cars
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `class-variance-authority` - Component variants
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional classes

### Forms & Validation
- `react-hook-form` - Form management
- `zod` - Schema validation
- `@hookform/resolvers` - Form resolvers

## 🎯 Key Sections

### 1. Navigation Bar
- Sticky header with hide/show on scroll
- Desktop: Full menu with dropdowns
- Mobile: Hamburger menu with slide-in drawer
- CTA: "Get Quote" button

### 2. Hero Section
- Full viewport height
- Gradient background with floating orbs
- Search box with brand/budget/fuel filters
- Trust indicators (1000+ cars, 10K+ customers, 4.9/5 rating)

### 3. Featured Cars
- Filter tabs (All, Sedan, SUV, Hatchback, Luxury, Electric)
- 3-column grid (responsive)
- Hover effects with image zoom
- Favorite button functionality
- Detailed specs (mileage, fuel, transmission)
- EMI calculator

### 4. Why Choose Us
- 8 feature cards in 4-column grid
- Animated icons on hover
- Sub-features list
- Stats row (10K+ customers, 1K+ cars sold, 4.9/5 rating, 50+ cities)

### 5. Lead Form
- Two-column layout
- React Hook Form + Zod validation
- Real-time validation
- Success modal with confetti animation
- WhatsApp integration
- Reference number generation

### 6. Testimonials
- Auto-playing carousel (5s interval)
- 3 cards on desktop, 1 on mobile
- Navigation arrows
- Dot indicators
- Pause on hover
- 8 sample testimonials

### 7. Footer
- 4-column layout
- Social media links
- Quick links & services
- Contact information
- Business hours
- Copyright & legal links

## 🎨 Animations

All animations use Framer Motion:
- **Scroll-triggered** - `whileInView` for sections
- **Stagger effects** - Sequential animations
- **Hover effects** - Scale, lift, rotate
- **Page transitions** - Smooth navigation
- **Loading states** - Spinners and skeletons

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Small devices */
md:  768px   /* Tablets */
lg:  1024px  /* Laptops */
xl:  1280px  /* Desktops */
2xl: 1400px  /* Large screens */
```

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Alt text for all images
- Color contrast WCAG AA compliant

## 🔍 SEO

- Proper meta tags
- Open Graph tags
- Twitter Card tags
- Semantic heading hierarchy
- Descriptive alt text
- Sitemap ready

## 🚀 Performance

- Next.js Image component for optimized images
- Lazy loading below-fold content
- Code splitting
- Tree shaking
- Minification

## 📝 License

This project is private and proprietary.

## 👥 Contact

**The Signature Cars**
- Phone: +91 98765 43210
- Email: info@thesignaturecars.com
- Address: 123 Premium Plaza, MG Road, Bangalore, Karnataka 560001

---

Built with ❤️ using Next.js 14 and TypeScript

