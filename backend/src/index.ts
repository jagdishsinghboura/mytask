import express, { Request, Response } from "express";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";

const app = express();
const prisma = new PrismaClient();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/task", taskRoutes);


app.listen(8008, ()=>{
  console.log("lsidfaosif");
  
})
export default app;
