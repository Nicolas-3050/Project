import mongoose from 'mongoose';

enum SensorType{
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY",
    BARO = "BARO",
    PROXIMITY = "PROXIMITY"
}

type Sensor = {
    type: SensorType
    designation : string
    rawValue: number | boolean
}

type SensorGet = Sensor & {value: string}
type SensorPost = Omit<Sensor, "id">
type SensorUpdate = Partial<SensorPost>

const Schema = mongoose.Schema;
const sensorSchema= new Schema({
    type: {type: String, required: true, enum: ['TEMPERATURE', 'HUMIDITY', 'BARO', 'PROXIMITY']},
    designation: String,
    rawValue: Number 
});

sensorSchema.set('toJSON', { virtuals: true });

export const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;