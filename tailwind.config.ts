import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#7286D3',
  				foreground: '#FFFFFF',
  				50: '#F0F2FA',
  				100: '#E1E5F5',
  				200: '#C3CBEB',
  				300: '#A5B1E1',
  				400: '#8797D7',
  				500: '#7286D3',
  				600: '#5A6BB8',
  				700: '#48549A',
  				800: '#36427C',
  				900: '#24305E'
  			},
  			secondary: {
  				DEFAULT: '#8EA7E9',
  				foreground: '#FFFFFF',
  				50: '#F3F6FD',
  				100: '#E7EDFB',
  				200: '#CFDBF7',
  				300: '#B7C9F3',
  				400: '#9FB7EF',
  				500: '#8EA7E9',
  				600: '#7A96E0',
  				700: '#6685D7',
  				800: '#5274CE',
  				900: '#3E63C5'
  			},
  			accent: {
  				DEFAULT: '#E5E0FF',
  				foreground: '#1A1A2E',
  				50: '#F9F8FF',
  				100: '#F3F1FF',
  				200: '#E5E0FF',
  				300: '#D7CFFF',
  				400: '#C9BEFF',
  				500: '#BBADFF',
  				600: '#AD9CFF',
  				700: '#9F8BFF',
  				800: '#917AFF',
  				900: '#8369FF'
  			},
  			light: {
  				DEFAULT: '#FFF2F2',
  				foreground: '#1A1A2E'
  			},
  			dark: {
  				DEFAULT: '#2C3E50',
  				foreground: '#FFFFFF'
  			},
  			text: {
  				primary: '#1A1A2E',
  				secondary: '#4A5568'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

