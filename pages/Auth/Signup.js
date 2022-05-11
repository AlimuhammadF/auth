import { useContext } from "react";
import UiContext from "../../context/UiContext";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Signup() {
	const { darkmode } = useContext(UiContext);

	return (
		<div className="max-w-screen-xl mx-auto min-h-screen grid grid-cols-1">
			<main className="col-span-1 flex flex-col items-center py-44 mx-8 h-full">
				<motion.article
					initial={{ translateY: "-50px", opacity: 0 }}
					animate={{ translateY: "0px", opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col items-center"
				>
					<h4 className="text-lg font-semibold opacity-60">
						START FOR FREE
					</h4>
					<h2 className="font-semibold text-3xl lg:text-4xl mt-8 text-center">
						Create a account.
					</h2>
					<p className="mt-5 opacity-80">
						Already have an account?{" "}
						<Link href={"/Auth/Signin"}>
							<a className="opacity-100 text-accent font-semibold cursor-pointer">
								Signin
							</a>
						</Link>
					</p>
				</motion.article>
				<motion.form
					initial={{ translateY: "50px", opacity: 0 }}
					animate={{ translateY: "0px", opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.3 }}
					className="w-full max-w-lg flex-grow mt-8"
				>
					<div className="flex flex-col xl:flex-row justify-between">
						<div className="bg-darkBlue xl:w-60  dark:bg-white bg-opacity-10 dark:bg-opacity-10 h-14 rounded-2xl px-8 flex items-center">
							<input
								type="text"
								placeholder="First Name"
								className="bg-transparent placeholder:text-darkBlue   dark:placeholder:text-white w-full focus:outline-none"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="19"
								className="opacity-70 dark:opacity-70"
							>
								<path
									d="M2.5 5c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5zm9.117 6.071a2.3 2.3 0 0 0-1.67.218c-1.518.844-3.376.844-4.894 0-.502-.279-1.111-.358-1.67-.218C1.391 11.574 0 13.382 0 15.467v1.011c0 .638.17 1.262.493 1.806.263.442.756.717 1.285.717h11.443c.529 0 1.022-.274 1.285-.718a3.53 3.53 0 0 0 .493-1.805v-1.011c.001-2.085-1.39-3.893-3.382-4.396z"
									fill={`${
										darkmode === "light"
											? "#12234A"
											: "#fff"
									}`}
								/>
							</svg>
						</div>

						<div className="bg-darkBlue xl:w-60 mt-4 xl:mt-0 dark:bg-white bg-opacity-10 dark:bg-opacity-10 h-14 rounded-2xl px-8 flex items-center">
							<input
								type="text"
								placeholder="Last Name"
								className="bg-transparent placeholder:text-darkBlue dark:placeholder:text-white w-full  focus:outline-none"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="19"
								className="opacity-70 dark:opacity-70"
							>
								<path
									d="M2.5 5c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5zm9.117 6.071a2.3 2.3 0 0 0-1.67.218c-1.518.844-3.376.844-4.894 0-.502-.279-1.111-.358-1.67-.218C1.391 11.574 0 13.382 0 15.467v1.011c0 .638.17 1.262.493 1.806.263.442.756.717 1.285.717h11.443c.529 0 1.022-.274 1.285-.718a3.53 3.53 0 0 0 .493-1.805v-1.011c.001-2.085-1.39-3.893-3.382-4.396z"
									fill={`${
										darkmode === "light"
											? "#12234A"
											: "#fff"
									}`}
								/>
							</svg>
						</div>
					</div>
					<div className="bg-darkBlue  mt-4 xl:mt-6 dark:bg-white bg-opacity-10 dark:bg-opacity-10 h-14 rounded-2xl px-8 flex items-center">
						<input
							type="email"
							placeholder="Email@example.com"
							className="bg-transparent placeholder:text-darkBlue dark:placeholder:text-white w-full  focus:outline-none"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="15"
							className="opacity-70 dark:opacity-70"
						>
							<path
								d="M7.86 7.21L.69 2.12C1.48.85 2.9 0 4.5 0h10a4.5 4.5 0 0 1 3.81 2.11l-7.15 5.08c-1.01.67-2.31.67-3.3.02zM18.98 4.1L12.3 8.84a5.08 5.08 0 0 1-2.81.85c-.96 0-1.92-.28-2.76-.84L.02 4.1 0 4.5v6A4.51 4.51 0 0 0 4.5 15h10a4.51 4.51 0 0 0 4.5-4.5v-6c0-.13-.01-.27-.02-.4z"
								fill={`${
									darkmode === "light" ? "#12234A" : "#fff"
								}`}
							/>
						</svg>
					</div>
					<div className="bg-darkBlue  mt-4 xl:mt-6 dark:bg-white bg-opacity-10 dark:bg-opacity-10 h-14 rounded-2xl px-8 flex items-center">
						<input
							type="email"
							placeholder="Password"
							className="bg-transparent placeholder:text-darkBlue dark:placeholder:text-white w-full  focus:outline-none"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="20"
							className="opacity-70 dark:opacity-70"
						>
							<path
								d="M12.5 7.99V5c0-2.76-2.24-5-5-5s-5 2.24-5 5v2.99C1.02 8.73 0 10.24 0 12v3a4.51 4.51 0 0 0 4.5 4.5h6A4.51 4.51 0 0 0 15 15v-3c0-1.76-1.02-3.27-2.5-4.01zM8.5 14c0 .55-.45 1-1 1s-1-.45-1-1v-1c0-.55.45-1 1-1s1 .45 1 1v1zm2-6.5h-6V5a3.01 3.01 0 0 1 3-3 3.01 3.01 0 0 1 3 3v2.5z"
								fill={`${
									darkmode === "light" ? "#12234A" : "#fff"
								}`}
							/>
						</svg>
					</div>
					<button className="flex justify-center text-white font-semibold items-center group w-full h-14 bg-accent border-2 border-accent hover:bg-transparent hover:text-accent rounded-2xl mt-4 xl:mt-8 transition-all duration-300">
						Signup
					</button>
					<div className="w-full flex justify-center items-center relative my-8">
						<hr className=" border w-full h-0.5 border-darkBlue dark:border-white border-opacity-20 dark:border-opacity-20" />
						<p className="text-sm absolute font-semibold">OR</p>
					</div>
					<div className="flex w-full flex-col xl:flex-row justify-between">
						<button
							type="button"
							className="xl:w-60 h-14 font-semibold bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-2xl hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all duration-300"
						>
							Google
						</button>
						<button
							type="button"
							className="xl:w-60 mt-4 xl:mt-0 h-14 font-semibold bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-2xl hover:bg-opacity-20 dark:hover:bg-opacity-20 transition-all duration-300"
						>
							Github
						</button>
					</div>
				</motion.form>
			</main>
		</div>
	);
}
