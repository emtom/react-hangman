/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'base-blue': '#23314e',
        'base-blue-lighten': '#344974',
        'white': '#fff',
        'success': '#8ec148',
        'danger': '#d94555'
      }
    },
  },
  plugins: [],
}

