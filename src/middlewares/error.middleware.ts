import { isNonEmptyArray } from "@austinburns/type-guards";
import { ENVIRONMENTS, ERROR_CODES } from "#constants/index";
import { envConfig } from "#configs/env.config";

export const errorMiddleware = (error, req, res) => {
	error.details = isNonEmptyArray(error.details) ? error.details : [error?.details ?? error.message];
	if (error.status < 500) {
		if (envConfig.ENV === ENVIRONMENTS.DEVELOPMENT) {
			console.error(error);
		}
		res.jsend.fail(
			error.message,
			{
				errorName: error.name,
				details: envConfig.ENV === ENVIRONMENTS.DEVELOPMENT ? error.details : undefined
			},
			error.errorCode,
			error.status
		);
		return;
	}
	console.error(error);
	res.jsend.error(error.message, error.status, ERROR_CODES.UNKNOWN_ERROR, {
		errorName: error.name,
		code: error.code,
		details: envConfig.ENV === ENVIRONMENTS.DEVELOPMENT ? error.details : undefined
	});
};
