import { type ErrorCode } from "#constants";
import { StatusCodes } from "http-status-codes";

export class OrdersApiError extends Error {
	status: StatusCodes;
	errorCode: ErrorCode;
	data: any;

	constructor(message: string, httpStatus: StatusCodes, errorCode: ErrorCode, data?: any) {
		super(message);
		this.name = "OrdersApiError";

		this.status = httpStatus ?? StatusCodes.BAD_REQUEST;
		this.errorCode = errorCode;
		this.data = data;
	}
}
