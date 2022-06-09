export enum ActuatorType {
  BLINDS = "BLINDS",
  LIGHT = "LIGHT",
}

export default interface Actuator {
  id: string | number;
  type: ActuatorType;
  designation: string;
  state: boolean;
}
export type ActuatorPost = Omit<Actuator, "id">;
export type ActuatorUpdate = Partial<ActuatorPost>;
