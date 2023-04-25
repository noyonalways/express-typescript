import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRoute  from './routes/user.route'
import authRoute  from './routes/auth.route'

const app = express();

// middlewares
app.use(
	cors({
		credentials: true,
	})
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


// home route
app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({
		success: true,
		message: "App in Running",
	});
});


// All routes
app.use("/user", userRoute);
app.use('/auth', authRoute)



export default app;


