import Router from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CompleteProfile() {
	//session
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session?.user?.userStatus === "complete" && status !== "loading") {
			Router.push("/User/Profile");
		}
	}, [session, status]);

	//refs
	const [date, setDate] = useState();
	const [gender, setGender] = useState();

	//handle complete profile

	const handleCompleteProfile = async (e) => {
		e.preventDefault();

		if (!date) {
			toast.error("Plase enter your birth date");
			return;
		}

		if (!gender) {
			toast.error("Please select your gender");
			return;
		}

		const completeProfileToast = toast.loading("Updating profile...");
		try {
			const res = await fetch("/api/auth/updateProfile", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					gender,
					date,
					email: session?.user?.email,
				}),
			});
			if (res.status === 200) {
				toast.success("Updated", { id: completeProfileToast });
				signOut({ callbackUrl: "/Auth/Signin" });
			} else {
				toast.error("Profile Update failed", {
					id: completeProfileToast,
				});
			}
		} catch (error) {
			alert(error);
			toast.error("Something went wrong", { id: completeProfileToast });
		}
	};

	return (
		<main className="max-w-screen-xl mx-auto">
			<form onSubmit={handleCompleteProfile} className="mx-8 py-40">
				<h2 className="text-2xl font-semibold">
					Complete Your Profile.
				</h2>
				<div className="bg-darkBlue  mt-4 xl:mt-6 dark:bg-white bg-opacity-10 dark:bg-opacity-10 py-4 rounded-2xl px-8 flex flex-col justify-center">
					<h2 className="text-sm opacity-80 mb-3">Date Of Birth</h2>
					<input
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
						placeholder="Date Of Birth"
						className="bg-transparent placeholder:text-darkBlue dark:placeholder:text-white w-full  focus:outline-none"
					/>
				</div>
				<div className="bg-darkBlue  mt-4 xl:mt-6 dark:bg-white bg-opacity-10 dark:bg-opacity-10 py-4 rounded-2xl px-8 flex flex-col">
					<h2 className="text-sm opacity-80">Gender</h2>

					<div className="mt-5">
						<div className="form-check mt-2">
							<input
								onChange={(e) =>
									e.target.checked === true
										? setGender("male")
										: setGender("")
								}
								className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-accent checked:border-accent focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault1"
							/>
							<label
								className="form-check-label cursor-pointer inline-block text-darkBlue dark:text-white"
								htmlFor="flexRadioDefault1"
							>
								Male
							</label>
						</div>

						<div className="form-check mt-2">
							<input
								onChange={(e) =>
									e.target.checked === true
										? setGender("female")
										: setGender("")
								}
								className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-accent checked:border-accent focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault2"
							/>
							<label
								className="form-check-label cursor-pointer inline-block text-darkBlue dark:text-white"
								htmlFor="flexRadioDefault2"
							>
								Female
							</label>
						</div>
						<div className="form-check mt-2">
							<input
								onChange={(e) =>
									e.target.checked === true
										? setGender("other")
										: setGender("")
								}
								className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-accent checked:border-accent focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
								type="radio"
								name="flexRadioDefault"
								id="flexRadioDefault3"
							/>
							<label
								className="form-check-label cursor-pointer inline-block text-darkBlue dark:text-white"
								htmlFor="flexRadioDefault3"
							>
								Other
							</label>
						</div>
					</div>
				</div>
				<button className="h-14 bg-accent w-60 mt-8 rounded-2xl text-lg font-semibold border-2 transition-all duration-300 border-accent hover:bg-transparent hover:text-accent">
					Save
				</button>
			</form>
		</main>
	);
}
