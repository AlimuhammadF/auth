import { MongoClient } from "mongodb";
import { hash } from "bcryptjs";
async function handler(req, res) {
	//Only POST mothod is accepted
	if (req.method === "POST") {
		//Getting email and password from body
		const { name, email, password } = req.body;
		//Validate

		//Connect with database
		const client = await MongoClient.connect(process.env.MONGODB_URI);
		const db = client.db();
		//Check existing
		const checkExisting = await db
			.collection("users")
			.findOne({ email: email });
		//Send error response if duplicate user is found
		if (checkExisting) {
			res.status(422).json({
				success: false,
				message: "User already exists",
			});
			client.close();
			return;
		}
		//Hash password
		const status = await db.collection("users").insertOne({
			name,
			email,
			password: await hash(password, 12),
			emailVerified: null,
			userStatus: "incomplete",
			/* : await hash(password, 12), */
		});
		//Send success response
		res.status(200).json({
			success: true,
			message: "Account has been created successfully.",
			...status,
		});
		//Close DB connection
		client.close();
	} else {
		//Response for other than POST method
		res.status(500).json({ message: "Route not valid" });
	}
}

export default handler;
