import express from "express";
import routes from "./api/index.js";
import { errorMiddleware } from "#middlewares/error.middleware.js";
import helmet from "helmet";
import { jsend } from "#utils/response.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "20MB" }));
app.use(express.urlencoded({ extended: true }));
app.use(jsend());
app.use(express.static("public"));


app.use("/api", routes);
app.use("/", (req, res) => {
  res.json({ info: "Backend server" });
});

app.use("/", (_req, res) => {
	res.json({ info: "Worth AI api server. Please visit health route for more information." });
});

app.use(((err, req, res, next) => {
	errorMiddleware(err, req, res);
}) as express.ErrorRequestHandler);

export { app };