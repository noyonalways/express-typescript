import {
	getUserByIdService,
} from "./../services/user.service";

import {
	getAllUserService,
	getUserBySessionTokenService,
} from "../services/user.service";
import { Request, Response } from "express";


// get all the users
export const getUsers = (req: Request, res: Response) => {
	const result = getAllUserService();
	res.json(result);
};


// get user by id
export const getUserById = (req: Request, res: Response) => {
	const { id } = req.params;
	const result = getUserByIdService(id);
	res.json({ id });
};

export const getUserBySessionToken = (req: Request, res: Response) => {
	// res.json(getUserBySessionTokenService())
	res.json("sesson");
};
