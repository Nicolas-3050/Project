import { Userl as User } from "@/models/UserModel";
import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "@/Response/Response"
import argon2 from "argon2";
import { argon2Verify } from "@/middleware/argon2";
import { argon2Hash } from "@/middleware/argon2";
import jwt from "jsonwebtoken";
import config from "@/config";
import { token } from "morgan";
import tokenVerify from "@/middleware/Authentification";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.find(req.body);
      var apiResponse = new ApiResponse("user", user);
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  getId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);
      var apiResponse = new ApiResponse("user", { user });
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Hash pwd avec argon2
      const { email, password } = req.body;
      const user = new User(req.body);
      user.password = await argon2Hash(password);
      await User.create(user);

      // Creation token with in payload id and email
      let token: string;
      try {
        token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
        console.log(token);
      } catch (error) {
        next(error);
        throw new Error("jwt sign error");
      }

      var apiResponse = new ApiResponse("Created", user.id, undefined);
      res.json(apiResponse);
      return;
    } catch (error) {
      next(error);
      next(new ApiResponse("Error", undefined, error as Error));
    }
  },

  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Verify password argon2
    try {
      if (await argon2Verify(user.password, password)) {

        const apiResponse = new ApiResponse("Success", user.id, user.email);
        res.json(apiResponse);

      } else {
        const resultat = new ApiResponse("Erreur :", undefined, password as Error)
        res.json(resultat);
      }
    } catch (error) {
      next(error);
      throw new Error("Erreur de verification");
    }
  },

  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
      });
      var apiResponse = new ApiResponse("user updated");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      var apiResponse = new ApiResponse("user deleted");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
};
