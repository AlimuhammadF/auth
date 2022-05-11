import Head from "next/head";
import Image from "next/image";
import heroImage from "../public/images/hero.svg";
import Router from "next/router";
import { motion } from "framer-motion";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Auth.</title>
				<meta
					name="description"
					content="This is a full stack authentication website for portfolio purposes."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen py-40">
				{/* left side */}
				<article className="col-span-1 flex flex-col justify-center lg:items-start ml-8 mr-8 lg:mr-0 items-center z-10">
					<motion.h1
						initial={{ translateY: "50px", opacity: 0 }}
						animate={{ translateY: "0px", opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="font-semibold text-5xl xl:text-6xl text-center lg:text-left leading-tight"
					>
						Full stack auth website for portfolio purposes
						<span className="text-accent">.</span>
					</motion.h1>
					<motion.p
						initial={{ translateY: "50px", opacity: 0 }}
						animate={{ translateY: "0px", opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.3 }}
						className="text-center lg:text-lg lg:text-left font-normal mt-5 lg:mt-10 opacity-70 px-10 lg:px-0"
					>
						This is a full stack authentication website for
						portfolio purposes only. This website do not have any
						other purpose.
					</motion.p>
					<motion.div
						initial={{ translateY: "50px", opacity: 0 }}
						animate={{ translateY: "0px", opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.6 }}
						className="flex flex-col lg:flex-row mt-10 space-y-6 lg:space-x-8 lg:space-y-0 space-x-0 pb-14"
					>
						<button
							onClick={() => Router.push("/Auth/Signin")}
							className="w-52 h-14 text-lg bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10 font-semibold rounded-2xl hover:bg-opacity-20 hover:dark:bg-opacity-20 transition-colors duration-300"
						>
							Signin
						</button>
						<button
							onClick={() => Router.push("/Auth/Signup")}
							className="w-52 h-14 text-lg bg-accent text-white font-semibold rounded-2xl border-2 border-accent hover:bg-transparent hover:text-accent transition-colors duration-300"
						>
							Signup
						</button>
					</motion.div>
				</article>

				{/* right hero */}
				<motion.div
					initial={{ translateY: "50px", opacity: 0 }}
					animate={{ translateY: "0px", opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.9 }}
					className="col-span-1 hidden lg:flex justify-center items-center pb-14 mr-8 z-10"
				>
					<Image src={heroImage} alt="auth hero image" priority />
				</motion.div>
			</main>
		</div>
	);
}
