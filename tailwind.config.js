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
					light: "#1C3161",
				},
				accent: {
					DEFAULT: "#1E61FF",
				},
				gray: {
					DEFAULT: "#EFEEEE",
				},
			},
		},
	},
	plugins: [],

	darkMode: "class",
};
