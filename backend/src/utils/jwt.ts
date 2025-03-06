import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const JWT_SECRET= process.env.JWT_SECRET||"";

export const generateToken =(payload:object):string=>{
    const token =jwt.sign(payload, JWT_SECRET,{expiresIn:"1h"});
    return token;
}

export const verifyToken = (token:string):any=>{
   try {
    return jwt.verify(token, JWT_SECRET);
   } catch (error) {
    return null;
   }
}