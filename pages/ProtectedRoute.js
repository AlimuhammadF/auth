import { useSession, signOut } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProtectedRoute() {
	const { data: session, status } = useSession();

	//redirect
	const [redirectTime, setRedirectTime] = useState("5s");

	useEffect(() => {
		if (!session && status !== "loading") {
			setTimeout(() => {
				setRedirectTime("4s");
				setTimeout(() => {
					setRedirectTime("3s");
					setTimeout(() => {
						setRedirectTime("2s");
						setTimeout(() => {
							setRedirectTime("1s");
							setTimeout(() => {
								Router.push("/");
							}, 1000);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}
	}, [session, status]);

	//logout
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		const logoutToast = toast.loading("Logging out...");
		setLoading(true);
		try {
			await signOut({ redirect: false });
			toast.success("Logged out successfully", { id: logoutToast });
			setLoading(false);
		} catch (error) {
			toast.error("Something went wrong", { id: logoutToast });
			setLoading(false);
		}
	};

	return (
		<main className="max-w-4xl min-h-screen mx-auto flex justify-center items-center">
			<article className="w-full py-40  px-8">
				<h2 className="font-semibold text-3xl md:text-5xl text-center leading-tight">
					{session
						? "This is a protected page you are a authenticated user thats why you can see this"
						: "This is a protected page only authenticated users can see this."}
				</h2>
				{session ? (
					<div className="w-full flex flex-col items-center mt-14">
						<p className="opacity-80">Your Email</p>
						<h2 className="max-w-lg w-full flex justify-center h-14 rounded-2xl items-center text-lg mt-2 bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10">
							{session?.user?.email}
						</h2>
						<p className="mt-10">
							<span>
								<button
									onClick={handleLogout}
									disabled={loading}
									className="text-red-500 hover:underline cursor-pointer"
								>
									Logout
								</button>
							</span>{" "}
							to see the effect.
						</p>
					</div>
				) : (
					<div className="w-full flex flex-col items-center mt-14">
						<h2 className="text-xl text-center">
							You will be redirected to the homepage in
						</h2>
						<p className="text-5xl mt-5">{redirectTime}</p>
					</div>
				)}
			</article>
		</main>
	);
}
