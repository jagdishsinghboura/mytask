"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/add", authMiddleware_1.authenticateJwt, async (req, res) => {
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
    }
    catch (error) {
        console.log("Error while adding the Task ", error);
        res.status(500).json({
            message: "internal server error",
        });
    }
});
router.delete("/delete/:taskId", authMiddleware_1.authenticateJwt, async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const userId = req.user?.id;
    console.log(taskId, userId);
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
    }
    catch (error) {
        console.log("error while delete the task ", error);
        res.status(500).json({
            message: `internal server error `,
        });
    }
});
router.put("/update/:taskId", authMiddleware_1.authenticateJwt, async (req, res) => {
    const { title, description, dueDate } = req.body;
    const isoDate = new Date(dueDate).toISOString();
    const taskId = parseInt(req.params.taskId);
    try {
        if (title == undefined && description == undefined && dueDate == undefined) {
            throw new Error("no update data");
        }
        console.log(dueDate);
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
    }
    catch (error) {
        console.log("error while updating error", error);
        res.status(500).json({
            message: "internal server error",
        });
    }
});
router.put("/complete/:taskId", authMiddleware_1.authenticateJwt, async (req, res) => {
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
    }
    catch (error) {
        console.error("Error while updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/all", authMiddleware_1.authenticateJwt, async (req, res) => {
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
    }
    catch (error) {
        console.log("error while fetaching the task", error);
        res.status(500).json({
            message: "internal server error",
        });
    }
});
router.get("/all/completed", authMiddleware_1.authenticateJwt, async (req, res) => {
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
    }
    catch (error) {
        console.log("error while fetaching the task", error);
        res.status(500).json({
            message: "internal server error",
        });
    }
});
router.get("/mytask/:id", authMiddleware_1.authenticateJwt, async (req, res) => {
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
    }
    catch (error) {
        console.log("error while fetaching the task", error);
        res.status(500).json({
            message: "internal server error",
        });
    }
});
exports.default = router;
