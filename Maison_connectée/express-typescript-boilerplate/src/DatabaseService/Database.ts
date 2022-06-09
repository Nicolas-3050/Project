import { EventEmitter } from "stream";
import IDatabase from "./IDatabase";
import { Userl } from "@/models/UserModel";
import { Sensor as Sensor } from "@/models/SensorModel";
import { Actuator as Actuator } from "@/models/ActuateurModel"
import mongoose from "mongoose";

let tableauModel = new Map<string, mongoose.Model<any, {}, {}, {}>>([
    ["user", Userl],
    ["sensor", Sensor],
    ["actuator", Actuator]
]);

class Database extends EventEmitter implements IDatabase {

    constructor() {
        super()
    }


    public create(type: string){
        
        let model= tableauModel.get(type);
        let params= ,
        const objectDatabase = await model.find(params);
        // API Reponse
        

        return false;
    }

    public affichage(type: string){

        

    }

    public affichageById(id: number){

        

    }

    public modify(type: string, id: number){

        
         return false;
    }

    public delete(id: number){

        

        return false;
    }

}


export default Database