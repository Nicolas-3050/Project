import {Sensor as Sens, Sensor} from "@/models/SensorModel";
import { NextFunction, Request, Response } from "express";
import {ApiResponse} from "@/Response/Response";
import {db} from '../app';

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await Sens.find(req.body);
      var apiResponse = new ApiResponse("sensor", sensor);
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  
  getId: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await Sens.findById(req.params.id);
      var apiResponse = new ApiResponse("sensor", {sensor});
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await Sens.create(req.body);
      var apiResponse = new ApiResponse("Sensor has been created", {id: sensor._id});
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },



  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Sensor = await Sens.findOneAndUpdate({_id : req.params.id}, {
        type: req.body.type,
        designation : req.body.designation,
        rawValue: req.body.rawValue});
      var apiResponse = new ApiResponse("sensor updated");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sensor = await Sens.findByIdAndRemove(req.params.id);
      var apiResponse = new ApiResponse("sensor deleted");
      res.json(apiResponse);
      return;
    } catch (error) {
      console.error(error)
      next(error);
    }
  },
};
