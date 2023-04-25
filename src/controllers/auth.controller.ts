import { Request, Response } from "express";
import {
	createUserService,
	getUserByEmailService,
} from "../services/user.service";
import { authentication, random } from "../helpers";

// Register a new user
export const register = async (req: Request, res: Response) => {
	try {
		const { email, password, username } = req.body;
		if (!email || !password || !username) {
			return res.status(400).json({
				message: "Give all the info",
			});
		}

		const existingUser = await getUserByEmailService(email);

		if (existingUser) {
			return res.status(400).json({
				message: "User already exist",
			});
		}
		const salt = random();
		const user = await createUserService({
			email,
			username,
			authentication: {
				salt,
				password: authentication(salt, password),
			},
		});

		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.status(400);
	}
};

// login user

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				message: "Invalid Info",
			});
		}

		const user = await getUserByEmailService(email).select(
			"+authentication.salt +authentication.password"
		);

		if (!user) {
			return res.status(400).json({
				message: "User not found",
			});
		}

		const expectedHash = authentication(user.authentication.salt, password);

		if (user.authentication.password !== expectedHash) {
			return res.status(403).json({
				message: "Access forbidded User",
			});
		}

		const salt = random();
		user.authentication.sessionToken = authentication(
			salt,
			user._id.toString()
		);
		await user.save();

		res.cookie("NOYON-AUTH", user.authentication.sessionToken, {
			domain: "localhost",
			path: "/",
		});
		return res.status(200).json(user).end();
	} catch (error) {
		console.log(error);
		return res.status(400);
	}
};
