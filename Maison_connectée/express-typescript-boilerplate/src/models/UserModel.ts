import mongoose from 'mongoose';
import model from "mongoose";
import schema from "mongoose";

type User = {
    email: string
    password: string
    username: string
}
type UserGet = Omit<User, "password">
type UserPost = Omit<User, "id">
type UserLogin = Pick<User, "email" | "password">
type UserUpdate = Pick<Partial<UserPost>, "username">

//Création des Schémas
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: String,
    password: String,
    username: String
});

userSchema.set('toJSON', { virtuals: true });

export const Userl = mongoose.model('User', userSchema);
export default Userl;