module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
      screens: {
        xs: { min: "320", max: "639px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        sm: { min: "640px", max: "767px" },
        // => @media (min-width: 640px and max-width: 767px) { ... }

        md: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

				'xs': { 'min': '320', 'max': '639px' },
				// => @media (min-width: 640px and max-width: 767px) { ... }

				'sm': { 'min': '640px', 'max': '767px' },
				// => @media (min-width: 640px and max-width: 767px) { ... }

				'md': { 'min': '768px', 'max': '1023px' },
				// => @media (min-width: 768px and max-width: 1023px) { ... }

				'lg': { 'min': '1024px', 'max': '1279px' },
				// => @media (min-width: 1024px and max-width: 1279px) { ... }

				'xl': { 'min': '1280px', 'max': '1535px' },
				// => @media (min-width: 1280px and max-width: 1535px) { ... }

				'2xl': { 'min': '1536px' },
				// => @media (min-width: 1536px) { ... }
			},

			spacing: {
				'100': '25rem',
				'120': '30rem'

			},

			margin: {
				'1.5': '0.4rem',
				
			   },

			colors: {
				'light-pink': '#FCC5C0',
				'white-pink': '#FFF2F2',
				'red-it': '#DB4D4B',
				'navy': '#263159',
				'dark': '#1E1E1E',
			  },

			  dropShadow: {
				'sh': '0 35px 35px #DB4D4B'
			  },
		}
	},

	plugins: [
		require('flowbite/plugin')
	],
}
