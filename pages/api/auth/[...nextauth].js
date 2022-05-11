import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../utils/database";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			id: "credentials",
			name: "Credentials",
			type: "credentials",

			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			async authorize(credentials, req) {
				const client = await MongoClient.connect(
					process.env.MONGODB_URI
				);
				const db = client.db();

				const users = db.collection("users");
				//Find user with the email
				const result = await users.findOne({
					email: credentials.email,
				});
				//Not found - send error res
				if (!result) {
					client.close();
					throw new Error("No user found with the email.");
				}
				const comparePasswords = await compare(
					credentials.password,
					result.password
				);

				//Incorrect password - send response
				if (!comparePasswords) {
					client.close();
					throw new Error("Wrong credentials.");
				}
				//Else send success response
				client.close();

				return result;
			},
		}),
	],
	adapter: MongoDBAdapter(clientPromise),
	secret: process.env.JWT_SECRET,
	session: {
		// Set to jwt in order to CredentialsProvider works properly
		strategy: "jwt",
	},
	pages: {
		signIn: "/Auth/Signin",
	},

	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user);

			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user; // Setting token in session

			return session;
		},
	},
});
