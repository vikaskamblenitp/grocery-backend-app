import bcrypt from "bcryptjs";
import { envConfig } from "#configs/env.config";

export const generateHash = (plainTextPassword: string) => {
	const salt = bcrypt.genSaltSync(envConfig.SALT_ROUNDS as number);
	const hash = bcrypt.hashSync(plainTextPassword, salt);
	return hash;
};

export const compareHash = (plainTextPassword, hash) => {
	const isMatch = bcrypt.compareSync(plainTextPassword, hash);
	return isMatch;
};
