import argon2 from "argon2";
// Function for hash password
export function argon2Hash(password: string) {

    try {
        return argon2.hash(password);
      } catch {
        throw new Error("argon2 error hash");
      }
}

// Function for verify password
export function argon2Verify(userPassword: string, password: string) {
    
    try {
        return argon2.verify(userPassword, password);
      } catch {
        throw new Error("argon2 error verify");
      }
}