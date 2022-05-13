import { useSession, signOut } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Profile() {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (!session) {
			Router.push("/Auth/Signin");
		}

		if (session?.user?.userStatus !== "complete" && status !== "loading") {
			Router.push("/User/CompleteProfile");
		}
	}, [session, status]);

	const handleLogout = async () => {
		const logoutToast = toast.loading("Logging out...");
		try {
			await signOut({ redirect: false });
			toast.success("Logged out successfully", { id: logoutToast });
		} catch (error) {
			toast.error("Something went wrong", { id: logoutToast });
		}
	};

	return (
		<main className="max-w-screen-xl py-40 mx-auto">
			<h2 className="px-8 mb-8 text-2xl lg:text-3xl font-semibold">
				Profile.
			</h2>
			<div className="px-8">
				<p className="text-sm w-full text-left opacity-80">Full Name</p>
				<h2 className="max-w-full w-full flex justify-start px-5 h-14 rounded-2xl items-center text-base mt-2 bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10">
					{session?.user?.name}
				</h2>
			</div>
			<div className="px-8 mt-8">
				<p className="text-sm w-full text-left opacity-80">Email</p>
				<h2 className="max-w-full w-full flex justify-start px-5 h-14 rounded-2xl items-center text-base mt-2 bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10">
					{session?.user?.email}
				</h2>
			</div>
			<div className="px-8 mt-8">
				<p className="text-sm w-full text-left opacity-80">
					Date of birth
				</p>
				<h2 className="max-w-full w-full flex justify-start px-5 h-14 rounded-2xl items-center text-base mt-2 bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10">
					{session?.user?.dateOfBirth}
				</h2>
			</div>
			<div className="px-8 mt-8">
				<p className="text-sm w-full text-left opacity-80">Gender</p>
				<h2 className="max-w-full w-full flex justify-start px-5 h-14 rounded-2xl items-center text-base mt-2 bg-darkBlue dark:bg-white bg-opacity-10 dark:bg-opacity-10">
					{session?.user?.gender}
				</h2>
			</div>
			<button
				onClick={handleLogout}
				className="mx-8 mt-8 w-60 h-14 border-2 border-red-500 text-red-500 font-semibold rounded-2xl hover:bg-red-500 hover:bg-opacity-10 transition-all duration-300"
			>
				Logout
			</button>
		</main>
	);
}
