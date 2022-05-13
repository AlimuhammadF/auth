import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const client = await MongoClient.connect(process.env.MONGODB_URI);
		const db = client.db();

		const filter = { email: req.body.email };
		const updateDoc = {
			$set: {
				gender: req.body.gender,
				dateOfBirth: req.body.date,
				userStatus: "complete",
			},
		};
		const options = { upsert: true };
		const updateusername = await db
			.collection("users")
			.updateOne(filter, updateDoc, options);

		client.close();
		res.status(200).json({
			success: "Successfully Updated Profile",
			updateusername,
		});
	} else {
		//Response for other than POST method
		res.status(400).json({ error: "Route not valid" });
	}
}

export default handler;
