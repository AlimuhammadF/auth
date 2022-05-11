import Image from "next/image";
import logoImage from "../public/images/logo.svg";
import darkModeImage from "../public/images/icons/darkmode.svg";
import lightModeImage from "../public/images/icons/lightmode.svg";
import { useContext, useEffect, useState } from "react";
import UiContext from "../context/UiContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
	//handle menu
	const [menu, setMenu] = useState(false);
	const [renderDropDown, setRenderDropDown] = useState(false);

	const handleMenuClick = () => {
		if (menu) {
			setMenu(false);
		} else {
			setMenu(true);
		}
	};
	useEffect(() => {
		if (menu) {
			document.body.style.overflow = "hidden";
		} else if (!menu) {
			document.body.style.overflow = "visible";
		}
	}, [menu]);

	const menuVariants = {
		hidden: {
			right: "-100vw",
		},
		show: {
			right: "0vw",
		},
		transition: {
			duration: 0.3,
			ease: "ease-out",
		},
	};

	//dark mode
	const { handleDarkMode, darkmode, scroll } = useContext(UiContext);

	return (
		<nav
			className={`max-w-screen-xl mx-auto h-24 flex items-center px-8 fixed w-full left-0 right-0 top-0 ${
				scroll >= 60 ? "bg-white dark:bg-darkBlue" : "bg-transparent"
			}  justify-between z-20`}
		>
			<div className="flex items-center space-x-2 z-20">
				<Image src={logoImage} alt="Auth logo" priority />
				<h2 className="font-bold text-2xl">Auth.</h2>
			</div>
			<div className="flex items-center space-x-8 z-20 h-full">
				{/* nav links  */}
				<ul className="lg:flex items-center space-x-8 h-full hidden">
					<li>
						<Link href={"/"}>
							<a className="font-medium opacity-60 hover:opacity-100 cursor-pointer transition-opacity duration-300">
								Home
							</a>
						</Link>
					</li>
					<li
						className="relative  h-full flex items-center group"
						onMouseEnter={() => setRenderDropDown(true)}
						onMouseLeave={() => setRenderDropDown(false)}
					>
						<a className="font-medium opacity-60 group-hover:opacity-100 cursor-pointer transition-opacity duration-300">
							Render Method
						</a>
						<AnimatePresence>
							{renderDropDown && (
								<motion.ul
									initial={{ translateY: "20px", opacity: 0 }}
									animate={{ translateY: "0px", opacity: 1 }}
									exit={{ translateY: "20px", opacity: 0 }}
									transition={{ duration: 0.15 }}
									className="absolute z-30 -left-16 rounded-2xl bg-transparent shadow-md top-20 flex flex-col items-start w-64 bg-gray dark:bg-darkBlue-light "
								>
									<li className="h-full w-full flex justify-center items-center pt-2.5 px-2.5">
										<Link
											href={"/Renders/ServerSideRender"}
										>
											<a className="py-2.5 px-10 w-full rounded-2xl font-medium opacity-60 hover:opacity-100 bg-darkBlue bg-opacity-0 dark:bg-white dark:bg-opacity-0 hover:bg-opacity-10 hover:dark:bg-opacity-10 cursor-pointer transition-opacity duration-300">
												Server Side Render
											</a>
										</Link>
									</li>
									<li className="h-full w-full flex justify-center items-center pb-2.5 px-2.5">
										<Link
											href={"/Renders/ClientSideRender"}
										>
											<a className="py-2.5 mt-2 w-full px-10 rounded-2xl font-medium opacity-60 hover:opacity-100 bg-darkBlue bg-opacity-0 dark:bg-opacity-0 dark:bg-white hover:bg-opacity-10 hover:dark:bg-opacity-10 cursor-pointer transition-opacity duration-300">
												Client Side Render
											</a>
										</Link>
									</li>
								</motion.ul>
							)}
						</AnimatePresence>
					</li>
					<li>
						<Link href={"/ProtectedRoute"}>
							<a className="font-medium opacity-60 hover:opacity-100 cursor-pointer transition-opacity duration-300">
								Protected Route
							</a>
						</Link>
					</li>
				</ul>

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

				{/* desktop signin */}
				<hr className="hidden lg:block bg-darkBlue opacity-20 dark:bg-white h-8 w-0.5 transition-all duration-500" />
				<Link href={"/Auth/Signin"}>
					<a className="hidden lg:flex font-medium hover:opacity-70 transition-opacity duration-300  justify-center items-center cursor-pointer ">
						Signin
					</a>
				</Link>
				<Link href={"/Auth/Signup"}>
					<a className="hidden lg:flex text-white  justify-center items-center cursor-pointer bg-accent w-24 h-11 rounded-2xl font-medium border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300">
						Signup
					</a>
				</Link>

				{/* hamburger menu */}
				<button
					onClick={handleMenuClick}
					className="lg:hidden flex space-y-2 flex-col justify-center py-4"
				>
					<div className="h-0.5 bg-darkBlue dark:bg-white w-9"></div>
					<div className="h-0.5 bg-darkBlue dark:bg-white w-9 "></div>
				</button>
			</div>

			{/* menu context */}
			<AnimatePresence>
				{menu && (
					<motion.div
						variants={menuVariants}
						initial="hidden"
						animate="show"
						exit="hidden"
						transition="transition"
						className="fixed w-screen h-screen top-0 z-10 lg:hidden block bg-white dark:bg-darkBlue"
					>
						<ul className="w-full h-full flex flex-col space-y-8 justify-center items-center">
							<li>
								<Link href={"/"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-xl active:opacity-100 transition-opacity duration-300"
									>
										Home
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/Renders/ServerSideRender"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-xl active:opacity-100 transition-opacity duration-300"
									>
										Server Side Render
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/Renders/ClientSideRender"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-xl active:opacity-100 transition-opacity duration-300"
									>
										Client Side Render
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/ProtectedRoute"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-xl active:opacity-100 transition-opacity duration-300"
									>
										Protected Route
									</a>
								</Link>
							</li>

							<hr className="w-36 opacity-20 border border-darkBlue dark:border-white transition-colors duration-500" />

							<li>
								<Link href={"/Auth/Signin"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-xl  active:opacity-100 transition-opacity duration-300"
									>
										Signin
									</a>
								</Link>
							</li>
							<li>
								<Link href={"/Auth/Signup"}>
									<a
										onClick={handleMenuClick}
										className="text-semibold text-white bg-accent text-lg px-10 py-3 rounded-2xl active:opacity-100 duration-300 border-2 border-accent hover:bg-transparent hover:text-accent"
									>
										Signup
									</a>
								</Link>
							</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
