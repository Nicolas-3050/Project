import { EventEmitter } from "stream";
import { Userl } from "@/models/UserModel";
import { Sensor as Sensor } from "@/models/SensorModel";
import { Actuator as Actuator } from "@/models/ActuateurModel"
import mongoose from "mongoose";

export default interface IDatabase {

    create: (type: string) => boolean,
    affichage: (type: string) => ,
    affichageById: (id: number) => ,
    delete: (id: number) => boolean,
    modify: (type: string, id: number) => boolean
    
}