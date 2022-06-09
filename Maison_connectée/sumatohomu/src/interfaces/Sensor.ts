export enum SensorType {
  TEMPERATURE = "TEMPERATURE",
  HUMIDITY = "HUMIDITY",
  BARO = "BARO",
  PROXIMITY = "PROXIMITY",
}

export interface Sensor {
  id?: number | string;
  type: SensorType;
  designation: string;
  rawValue: number | boolean;
}

export type SensorGet = Sensor & { value: string };
export type SensorPost = Omit<Sensor, "id">;
export type SensorUpdate = Partial<SensorPost>;
