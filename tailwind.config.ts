import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Premium Canvas Palette
  			canvas: {
  				base: 'var(--canvas-base)',
  				surface1: 'var(--surface-1)',
  				surface2: 'var(--surface-2)',
  				surface3: 'var(--surface-3)',
  			},
  			indigo: {
  				300: 'var(--indigo-300)',
  				400: 'var(--indigo-400)',
  				500: 'var(--indigo-500)',
  			},
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'premium': '14px',
  		},
  		spacing: {
  			'xs': 'var(--spacing-xs)',
  			'sm': 'var(--spacing-sm)',
  			'md': 'var(--spacing-md)',
  			'lg': 'var(--spacing-lg)',
  			'xl': 'var(--spacing-xl)',
  		},
  		boxShadow: {
  			'sm': 'var(--shadow-sm)',
  			'md': 'var(--shadow-md)',
  			'lg': 'var(--shadow-lg)',
  			'glow-sm': 'var(--glow-sm)',
  			'glow-md': 'var(--glow-md)',
  			'glow-lg': 'var(--glow-lg)',
  		},
  		animation: {
  			'rotate-glow': 'rotate-glow 8s linear infinite',
  			'pulse-status': 'pulse-status 2s ease-in-out infinite',
  			'dash-flow': 'dash-flow 20s linear infinite',
  		},
  		backdropBlur: {
  			'premium': '20px',
  		},
  		backdropSaturate: {
  			'premium': '180%',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
