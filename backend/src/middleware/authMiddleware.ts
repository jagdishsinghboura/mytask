import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Request, Response } from "express";

dotenv.config();

const JWT_SECRET= process.env.JWT_SECRET||"";

export interface AuthRequest extends Request {
    user?: any;
  }


export const  authenticateJwt =(req:AuthRequest, res:Response, next:NextFunction):any=>{
   
    const token = req.header("Authorization")?.split(" ")[1];

    

   if(!token){
    return res.status(401).json({message:"unauthorize: no token provide"})

   }


   try {
     const decode =  jwt.verify(token, JWT_SECRET);
      req.user = decode;
      next();
   } catch (error) {
      console.log(error);
      res.status(401).json("something is wrong : Invalid token")
   }
}