import cors from "cors";
import { NextFunction, Request, Response } from "express";
import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";

/* DB Connection */
import connect from './ORM/Connect';

// Routers
import indexActuator from "@/routes/ActuateurRoute";
import indexSensor from "@/routes/SensorRoute";
import indexUser from "@/routes/UserRoute";

const app = express();

export const db = 'mongodb://127.0.0.1:27017/Gurupu';
connect({ db });

const allowedOrigins = ['http://localhost:8080/'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexUser);
app.use("/", indexActuator);
app.use("/", indexSensor);

// catch 404
app.use(function (req: Request, res: Response, next: NextFunction) {
  // handle it how it pleases you
  console.log("dans le 404");
  res.status(404).json({ message: "not_found" });
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json(err)
});

export default app;
