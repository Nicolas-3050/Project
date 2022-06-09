import { EventEmitter } from "stream";
import IAuthenticator from "./IAuthenticator";
import argon2 from "argon2"
import { Userl as User } from "@/models/UserModel";
import { argon2Hash } from "@/middleware/argon2";
import { argon2Verify } from "@/middleware/argon2";

class Authenticator extends EventEmitter implements IAuthenticator {

    constructor(){
        super()
    }

    public login (password: string, hash: string){

        // Verify password argon2
        try {
        if ( argon2Verify(hash, password)) {
            

        } else {
            
        }
        } catch (error) {
        next(error);
        throw new Error("Erreur de verification");
        }
            return null
    }

    public signup(email: string, password:string){
    
        const user = new User(email, password );
        user.password =  argon2Hash(password);
        User.create(user);
        return null
    }

    public authenticate (token: string, id?: number | undefined, role?: string){

        return false
    };

}

export default Authenticator;