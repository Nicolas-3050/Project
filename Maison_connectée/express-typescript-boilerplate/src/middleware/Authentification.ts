import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "@/config";

// Middleware permettant la verification du Token
var tokenVerify = async function (req: Request, res: Response, next: NextFunction) {

    let tokenHeader = req.headers.authorization!.split(" ");
    try {
        const userId = jwt.verify(tokenHeader[1], config.jwtSecret);
        console.log("token: ", tokenHeader[1])
        if (req.body.user.id && req.body.user.id !== userId) {
            throw 'Invalid user ID';
        }
        else {
            next();
        }
    } catch (error) {
        console.log(tokenHeader[1]);
        next(error);
    }
};

export default tokenVerify