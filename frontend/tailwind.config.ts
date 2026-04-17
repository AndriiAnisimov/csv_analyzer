import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#4F46E5',
                    success: '#10B981',
                    error: '#EF4444',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                    muted: '#F9FAFB',
                }
            },
            borderRadius: {
                'card': '12px',
                'button': '8px',
            },
            boxShadow: {
                'soft': '0 4px 12px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
export default config
