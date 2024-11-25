import { ERROR_CODES, ErrorCode } from "#constants/index";
import { verifyJwtToken } from "#utils/token";
import { StatusCodes } from "http-status-codes";

class AuthenticationMiddlewareError extends Error {
	status: StatusCodes;
	errorCode: ErrorCode;
	constructor(message, httpStatus: StatusCodes, errorCode: ErrorCode) {
		super(message);
		this.name = "AuthenticationMiddlewareError";
		this.status = httpStatus;
		this.errorCode = errorCode;
	}
}

export const validateUser = async (req, res, next) => {
	try {
    const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw new AuthenticationMiddlewareError("Authorization header not present", StatusCodes.UNAUTHORIZED, ERROR_CODES.UNAUTHENTICATED);
		}

		if (!authHeader.startsWith("Bearer")) {
			throw new AuthenticationMiddlewareError("Invalid Authorization header type", StatusCodes.BAD_REQUEST, ERROR_CODES.INVALID);
		}

		const token = authHeader.split(" ")[1];

		const tokenData = await verifyJwtToken(token);

    tokenData.role = {
      id: tokenData.core_roles.id,
      code: tokenData.core_roles.code,
    };

    // readability purpose
    tokenData.user_id = tokenData.id;

		res.locals.user = tokenData;
		return next();
	} catch (error) {
		return next(error);
	}
};