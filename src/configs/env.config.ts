import dotenv from "dotenv";
import { hostname } from "os";

dotenv.config({
	path: process.env.NODE_ENV === "production" ? ".env" : ".env.local"
});

export const envConfig = {
  ENV: process.env.NODE_ENV || "development",
  HOSTNAME: hostname(),
  APP_PORT: process.env.APP_PORT || 3000,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS || "10"),
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};