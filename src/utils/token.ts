const jwt = require("jsonwebtoken");
import { ERROR_CODES } from "#constants/index";
import { StatusCodes } from "http-status-codes";
import fs from "node:fs";

const publicKey = fs.readFileSync('./keys/public.key', 'utf8');
const privateKey = fs.readFileSync('./keys/private.key', 'utf8');

export const generateJwtToken = (data, expiresIn = "3h") => {
  const token = jwt.sign(data, privateKey, { expiresIn, algorithm: "RS256" });
  return token;
};

export const verifyJwtToken = token => {
	try {
		const decodedData = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
		return decodedData;
	} catch (err: any) {
		if (err.name === "TokenExpiredError") {
			err.message = "User Session Expired";
		}
		err.status = StatusCodes.UNAUTHORIZED;
		err.errorCode = ERROR_CODES.UNAUTHENTICATED;

		throw err;
	}
};

export const verifyJwtTokenWithoutExpiration = refreshToken => {
	try {
		const decodedData = jwt.verify(refreshToken, publicKey, { ignoreExpiration: true });
		return decodedData;
	} catch (err) {
		throw err;
	}
};
