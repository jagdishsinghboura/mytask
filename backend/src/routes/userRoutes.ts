import { PrismaClient } from "@prisma/client";
import { Request, Response, Router } from "express";

import bcrypt  from "bcrypt"
import { generateToken } from "../utils/jwt";

const router = Router();
const prisma = new PrismaClient();

router.post("/sign-in",async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await prisma.user.findFirst({
        where:{
          username:username,
        }
    })
    if(!user){
         res.status(400).json({message:"user not found :please create first Account", status:false})
    }


    const isMatched = await bcrypt.compare(password,user?.password||"" );
    if(!isMatched){
         res.status(404).json({message:"password not matched",status:false})
    }

    const token = generateToken({id:user?.id, username:username});

    res.status(200).json({
        message:"login successfully",
        status:true,
        token,
        user,
    })

});


router.post("/sign-up", async (req: Request, res: Response) => {

    const { username, password, firstName, lastName } = req.body;
  
    try {
      const isExistUser = await prisma.user.findFirst({
        where: {
          username: username,
        },
      });

      if(isExistUser){
        res.status(404).json({
            message :"user already exist",
            data:null,
        });
      }
  
    
      const newPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          username,
          password: newPassword,
          firstName,
          lastName,
        },
      });

      const token = generateToken({id:user.id, username:user.username});
  
      if (user) {
         res.status(201).json({
          message: "User created successfully", 
          status: true,
          token, 
          data: user,
        });
      }
    } catch (error) {
      console.log("Error while signup", error);
      res.status(500).json({
        message:"Internal server error",
        status:false,
      })
    }
  });
  

export default router;
