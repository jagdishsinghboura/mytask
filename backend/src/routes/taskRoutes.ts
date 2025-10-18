import { Request, Response, Router } from "express";
import { authenticateJwt, AuthRequest } from "../middleware/authMiddleware";
import { PrismaClient, TaskStatus } from "@prisma/client";

const router = Router();

const prisma = new PrismaClient();

router.post(
  "/add",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {
    const { title, description, dueDate } = req.body;

    try {

      if (title == undefined || description == undefined || dueDate == undefined) {
        throw new Error("Please fill in all fields");
      }
     

      const user = await prisma.user.findFirst({
        where: {
          username: req.user.username,
        },
      });

      if (!user) {
        res.status(404).json({
          message: "user not found",
        });
      }

      const task = await prisma.task.create({
        data: {
          title,
          description,
          status: "IN_PROGRESS",
          dueDate: dueDate ? new Date(dueDate) : null,
          userId: user?.id || req.user.id,
        },
      });

      res.status(201).json({
        message: "task add succefully",
        task,
      });
    } catch (error) {
      console.log("Error while adding the Task ", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);
router.delete(
  "/delete/:taskId",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user?.id;



    try {
      if (taskId == undefined || userId == undefined) {
        throw new Error("server not get proper credential");
      }
      const task = await prisma.task.findUnique({
        where: {
          id: taskId
        },
      });

      if (req.user.id !== task?.userId) {
        res
          .status(403)
          .json({ message: "You are not authorize person of this task" });
      }

      const deleteTask = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });

      res
        .status(200)
        .json({ message: "task delete succefully", data: deleteTask });
    } catch (error) {
      console.log("error while delete the task ", error);
      res.status(500).json({
        message: `internal server error `,
      });
    }
  }
);
router.put(
  "/update/:taskId",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {
    const { title, description, dueDate } = req.body;

    const isoDate = new Date(dueDate).toISOString();

    const taskId = parseInt(req.params.taskId);

    try {
      if (title == undefined && description == undefined && dueDate == undefined) {
        throw new Error("no update data");
      }




      const task = await prisma.task.findFirst({
        where: {
          id: taskId,
        },
      });

      if (!task) {
        res.status(404).json({ message: "task not found" });
      }
      if (task?.userId !== req.user.id) {
        res.status(404).json("Unauthorize:youcant update this task");
      }

      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title: title || task?.title,
          description: description || task?.description,
          dueDate: isoDate || task?.dueDate,
        },
      });

      res.status(200).json({
        message: "task updated susscefully",
      });
    } catch (error) {
      console.log("error while updating error", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);
router.put(
  "/complete/:taskId",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {
    try {
      const taskId = parseInt(req.params.taskId);
      if (!taskId || !req.user.id) {
        res.status(400).json({ message: "Task ID and user authentication required" });
      }

      const task = await prisma.task.findFirst({
        where: { id: taskId },
      });

      if (!task) {
        res.status(404).json({ message: "Task not found" }); // FIXED: Added return
      }

      if (task?.userId !== req.user.id) {
        res.status(403).json({ message: "Unauthorized: You cannot change this task" }); // FIXED: 403 for unauthorized
      }

      await prisma.task.update({
        where: { id: taskId },
        data: { status: "COMPLETED" },
      });

      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      console.error("Error while updating task:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/all",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {



    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: req.user.id,
        },
      });

      if (!tasks) {
        res.status(404).json({ message: "no tasks found" });
      }

      res.status(200).json({
        message: "All data fetched",
        data: tasks,
      });
    } catch (error) {
      console.log("error while fetaching the task", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);
router.get("/completed",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {


    try {
      const tasks = await prisma.task.findMany({
        where: {
          userId: req.user.id,
          status: "COMPLETED",
        },
      });

      if (!tasks) {
        res.status(404).json({ message: "no tasks found" });
      }

      res.status(200).json({
        message: "All data fetched",
        data: tasks,
      });
    } catch (error) {
      console.log("error while fetaching the task", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);


router.get("/mytask/:id",
  authenticateJwt,
  async (req: AuthRequest, res: Response) => {

    const taskId = parseInt(req.params.id);

    try {
      const task = await prisma.task.findMany({
        where: {
          userId: req.user.id,
          id: taskId
        },
      });

      if (!task) {
        res.status(404).json({ message: "no tasks found" });
      }

      res.status(200).json({
        message: "All data fetched",
        data: task,
      });
    } catch (error) {
      console.log("error while fetaching the task", error);
      res.status(500).json({
        message: "internal server error",
      });
    }
  }
);

router.get("/pending", authenticateJwt, async (req: AuthRequest, res: Response) => {
  try {
    const userTasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      }
    })

    const today = new Date();
    const pendingTasks = userTasks.filter((task) => {
      const dateObj = task.dueDate ? new Date(task.dueDate) : null;
      if (dateObj && dateObj.getTime() < today.getTime() && task.status == 'IN_PROGRESS') {
        return task;
      }
    })


    pendingTasks.map(async (task) => {
      await prisma.task.update(({
        where: {
          id: task.id,
        },
        data: {
          status: "PENDING"
        }
      }))
    })

    const updatedpendingTasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
        status: "PENDING"
      }
    })
    if (!updatedpendingTasks) {
      res.status(404).json({
        message: "No task is pending.. ",
        data: [],
      });
    }
    res.status(200).json({
      message: "Pending task ",
      data: updatedpendingTasks,
    });
  } catch (error: any) {
    console.log("error in  /pending route :", error);
    res.status(500).json({
      message: error.message,
    })
  }
})


router.get("/today-tasks", authenticateJwt, async (req: AuthRequest, res: Response) => {
  try {


    const allTasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      }
    })


    if (!allTasks) {
      res.status(404).json({
        message: "no tasks found",
        data: []
      });
    }

    const today = new Date();
    const duetasks = allTasks.filter(task => {
      if (!task.dueDate) return
      const dueDate = new Date(task?.dueDate)

      if (
        today.getFullYear() === dueDate.getFullYear() &&
        today.getMonth() === dueDate.getMonth() &&
        today.getDate() === dueDate.getDate()) {
        return task;
      }

    })

    res.status(200).json({
      message: "todays tasks",
      data: duetasks,
    })
  } catch (error) {
    console.log("error while fetaching the task", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
})

router.get("/track", authenticateJwt, async (req: AuthRequest, res: Response) => {
  try {
    const labels = ["IN_PROGRESS", "COMPLETED", "PENDING"];
    const data: { [key: string]: number } = {};

    for (let label  in labels) {
      
      
      const count = await prisma.task.count({
        where: {
          userId: req.user.id,
          status: labels[label] as TaskStatus,
        }
        
      })
      data[labels[label]] = count;
    }
    


    res.status(200).json({
      message:"track data",
      data ,
    })

  } catch (error: any) {
    console.log("erorr", error)
    res.status(500).json({
      message: error.message,
    })

  }
})

export default router;
