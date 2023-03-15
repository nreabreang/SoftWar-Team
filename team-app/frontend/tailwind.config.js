module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],

	theme: {
		extend: {

			spacing: {
				'100': '25rem',
				'120': '30rem'

			},

			margin: {
				'1.5': '0.4rem',

			},

			padding: {
				'0.05': '0.05rem',
			},

			colors: {
				'light-pink': '#FCC5C0',
				'white-pink': '#FFF2F2',
				'pink': '#FAE7E7',
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
