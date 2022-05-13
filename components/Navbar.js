import Image from "next/image";
import logoImage from "../public/images/logo.svg";
import darkModeImage from "../public/images/icons/darkmode.svg";
import lightModeImage from "../public/images/icons/lightmode.svg";
import { useContext, useEffect, useState } from "react";
import UiContext from "../context/UiContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function Navbar() {
	//session
	const { data: session } = useSession();

	//handle menu
	const [menu, setMenu] = useState(false);

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
				{session ? (
					<button
						onClick={() => Router.push("/User/Profile")}
						className="w-10 h-10 hidden lg:block bg-accent rounded-full overflow-hidden"
					>
						{session?.user?.image && (
							<img src={session?.user?.image} alt="user-image" />
						)}
					</button>
				) : (
					<>
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
					</>
				)}
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

							{session ? (
								<>
									<li>
										<Link href={"/User/Profile"}>
											<a
												onClick={handleMenuClick}
												className="text-semibold text-xl  active:opacity-100 transition-opacity duration-300"
											>
												Profile
											</a>
										</Link>
									</li>
								</>
							) : (
								<>
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
								</>
							)}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
