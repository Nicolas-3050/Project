import {Actuator as Act} from "@/models/ActuateurModel";
import { NextFunction, Request, Response } from "express";
import {ApiResponse} from "@/Response/Response";
import {db} from '../app';
import { reduceEachLeadingCommentRange } from "typescript";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await Act.find(req.body);
      var apiResponse = new ApiResponse("actuator", actuator);
      res.json(apiResponse);
      return;
      //res.json({ message: "hello world", id: Actuator._id});
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  
  getId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await Act.findById(req.params.id);
      //res.json({ message: "hello world", id: Actuator._id});
      var apiResponse = new ApiResponse("actuator", {actuator});
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await Act.create(req.body);
      //var apiResponse = new ApiResponse("Actuautor has been updated", {id: Actuator._id});
      //res.json(apiResponse);
      //res.json({ message: "ça marche" });
      var apiResponse = new ApiResponse("Actuator has been created", {id: actuator._id});
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },



  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await Act.findOneAndUpdate({_id : req.params.id}, {
      type: req.body.type,
      designation : req.body.designation,
      state: req.body.state});
      var apiResponse = new ApiResponse("actuator updated");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },


  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await Act.findByIdAndRemove(req.params.id);
      var apiResponse = new ApiResponse("actuator deleted");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
};
