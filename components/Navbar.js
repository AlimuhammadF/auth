import Image from "next/image";
import logoImage from "../public/images/logo.svg";
import darkModeImage from "../public/images/darkmode.svg";
import lightModeImage from "../public/images/lightmode.svg";
import { useContext, useState } from "react";
import UiContext from "../context/UiContext";

export default function Navbar() {
	const [menu, setMenu] = useState(false);

	//dark mode
	const { handleDarkMode, darkmode } = useContext(UiContext);

	return (
		<nav
			className={`max-w-screen-xl mx-auto h-24 flex items-center px-8 sticky top-0 justify-between`}
		>
			<div className="flex items-center space-x-2 z-20">
				<Image src={logoImage} alt="Auth logo" priority />
				<h2 className="font-bold text-2xl">Auth.</h2>
			</div>
			<div className="flex space-x-8 z-20">
				{/* dark mode btn */}
				<button
					onClick={() => handleDarkMode()}
					className="group flex items-center"
				>
					<Image
						src={
							darkmode === "dark" ? lightModeImage : darkModeImage
						}
						alt="dark mode"
						priority
						className="opacity-60 transition-all duration-200 group-active:scale-125 group-hover:scale-110 group-hover:opacity-100"
					/>
				</button>

				{/* hamburger menu */}
				<button
					onClick={() => (menu ? setMenu(false) : setMenu(true))}
					className="lg:hidden flex space-y-2 flex-col justify-center"
				>
					<div className="h-0.5 bg-darkBlue dark:bg-white w-9 transition-all duration-500"></div>
					<div className="h-0.5 bg-darkBlue dark:bg-white w-9 transition-all duration-500"></div>
				</button>
			</div>

			{/* menu context */}
			{menu && (
				<div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-white dark:bg-darkBlue z-10">
					menu
				</div>
			)}
		</nav>
	);
}
