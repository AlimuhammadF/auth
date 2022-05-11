import { createContext, useEffect, useState } from "react";

const UiContext = createContext({
	darkmode: true,
	handleDarkMode: () => {},
});

export function UiContextProvider({ children }) {
	//scroll
	const [scroll, setScroll] = useState(null);

	useEffect(() => {
		const handleScroll = () => {
			setScroll(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
	}, []);

	//dark mode
	const [darkmode, setDarkMode] = useState("dark");
	useEffect(() => {
		if (
			localStorage.getItem("color-theme") === "dark" ||
			(!("color-theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			setDarkMode("dark");
		} else {
			setDarkMode("light");
		}
	}, []);
	const handleDarkMode = () => {
		// if set via local storage previously
		if (localStorage.getItem("color-theme")) {
			if (localStorage.getItem("color-theme") === "light") {
				setDarkMode("dark");
				localStorage.setItem("color-theme", "dark");
			} else {
				setDarkMode("light");
				localStorage.setItem("color-theme", "light");
			}

			// if NOT set via local storage previously
		} else {
			if (darkmode === "dark") {
				setDarkMode("light");
				localStorage.setItem("color-theme", "light");
			} else {
				setDarkMode("dark");
				localStorage.setItem("color-theme", "dark");
			}
		}
	};

	const context = { darkmode, handleDarkMode, scroll };

	return <UiContext.Provider value={context}>{children}</UiContext.Provider>;
}

export default UiContext;
