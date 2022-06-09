import mongoose from 'mongoose';
import model from "mongoose";
import schema from "mongoose";



enum ActuatorType{
    BLINDS,
    LIGHT
}

type Actuator = {
    id: number | string
    type: ActuatorType
    designation: string
    state: boolean
}

type ActuatorPost = Omit<Actuator, "id">
type ActuatorUpdate = Partial<ActuatorPost>

const Schema = mongoose.Schema;
const actuatorSchema= new Schema({
    type: {type: String, required: true, enum: ['BLINDS', 'LIGHT']},
    designation: String,
    state: Boolean
});

actuatorSchema.set('toJSON', { virtuals: true });

export const Actuator = mongoose.model('Actuator', actuatorSchema);
export default Actuator;
