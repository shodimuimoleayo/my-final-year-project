/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./login/**/*.{php,js}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-screen': {'max': '994px'},
        'custom-screen-ml': {'max': '664px'},
        'custom-screen-dh': {'max': '1039px'},
        'custom-screen-d': {'max': '606px'},
        'custom-screen-1': {'max': '516px'},
        
      },
    },
  },
  plugins: [],
}
