module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				darkBlue: {
					DEFAULT: "#12234A",
				},
				accent: {
					DEFAULT: "#1E61FF",
				},
			},
		},
	},
	plugins: [],

	darkMode: "class",
};
