import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import UiContext from "../context/UiContext";
import Loading from "./loading";
import Navbar from "./Navbar";

export default function Layout({ children }) {
	//dark mode
	const { darkmode } = useContext(UiContext);
	const { status } = useSession();

	return (
		<div className={`${darkmode}`}>
			<Head>
				<title>Auth.</title>
				<meta
					name="description"
					content="This is a full stack authentication website for portfolio purposes."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="bg-white dark:bg-darkBlue text-darkBlue dark:text-white font min-h-screen overflow-x-hidden">
				{status === "loading" ? (
					<Loading />
				) : (
					<>
						<Toaster />
						<Navbar />
						{children}
					</>
				)}
			</main>
		</div>
	);
}
