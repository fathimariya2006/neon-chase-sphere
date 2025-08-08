import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cyberpunk neon colors
				neon: {
					cyan: 'hsl(var(--neon-cyan))',
					purple: 'hsl(var(--neon-purple))',
					pink: 'hsl(var(--neon-pink))',
					green: 'hsl(var(--neon-green))',
					yellow: 'hsl(var(--neon-yellow))'
				}
			},
			fontFamily: {
				orbitron: 'var(--font-primary)',
				mono: 'var(--font-mono)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-dark': 'var(--gradient-dark)'
			},
			boxShadow: {
				'neon-cyan': 'var(--shadow-neon-cyan)',
				'neon-purple': 'var(--shadow-neon-purple)',
				'neon-pink': 'var(--shadow-neon-pink)',
				'game-area': 'var(--shadow-game-area)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'neon-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 5px hsl(var(--neon-cyan)), 0 0 20px hsl(var(--neon-cyan)), 0 0 35px hsl(var(--neon-cyan))',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 10px hsl(var(--neon-cyan)), 0 0 40px hsl(var(--neon-cyan)), 0 0 60px hsl(var(--neon-cyan))',
						transform: 'scale(1.05)'
					}
				},
				'neon-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px hsl(var(--neon-purple) / 0.5), 0 0 20px hsl(var(--neon-purple) / 0.5), 0 0 35px hsl(var(--neon-purple) / 0.5)'
					},
					'50%': { 
						boxShadow: '0 0 10px hsl(var(--neon-purple)), 0 0 40px hsl(var(--neon-purple)), 0 0 60px hsl(var(--neon-purple))'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'slide-in': {
					'0%': { opacity: '0', transform: 'translateX(-100px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'neon-glow': 'neon-glow 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'slide-in': 'slide-in 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
