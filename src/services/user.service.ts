import User from "../models/User";

export const getAllUserService = async () => {
	const users = await User.find();
	return users;
};

export const createUserService = async (values: Record<string, any>) => {
	const result = new User(values).save().then((user) => user.toObject());
	return result;
};

export const getUserByEmailService = (email: string) => User.findOne({ email });
	


export const getUserByIdService = async (id: string) => {
	const user = await User.findById(id);
	return user;
};

export const deleteUserByIdService = async (id: string) => {
	const result = await User.findOneAndDelete({ _id: id });
	return result;
};

export const getUserBySessionTokenService = async (sessionToken: string) => {
	const result = await User.findOne({
		"authentication.sessionToken": sessionToken,
	});
	return result;
};
