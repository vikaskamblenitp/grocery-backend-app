import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { isNonEmptyArray } from "@austinburns/type-guards";

export const validateTypedSchema = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		await schema.parseAsync({
			body: req.body,
			query: req.query,
			params: req.params
		});
		return next();
	} catch (error) {
    console.log(error);
		const typedError = error as ZodError;
		if (isNonEmptyArray(typedError?.issues)) {
			typedError.name = "InvalidSchemaError";
			return res.status(400).json(typedError);
		}

		return res.status(400).json(error);
	}
};
