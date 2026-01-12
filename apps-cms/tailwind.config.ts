import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/collections/**/*.{js,ts,jsx,tsx}',
    './node_modules/@payloadcms/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config





