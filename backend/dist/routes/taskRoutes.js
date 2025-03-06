"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/add", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dueDate } = req.body;
    try {
        if (title == undefined || description == undefined || dueDate == undefined) {
            throw new Error("Please fill in all fields");
        }
        const user = yield prisma.user.findFirst({
            where: {
                username: req.user.username,
            },
        });
        if (!user) {
            res.status(404).json({
                message: "user not found",
            });
        }
        const task = yield prisma.task.create({
            data: {
                title,
                description,
                status: "IN_PROGRESS",
                dueDate: dueDate ? new Date(dueDate) : null,
                userId: (user === null || user === void 0 ? void 0 : user.id) || req.user.id,
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
}));
router.delete("/delete/:taskId", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const taskId = parseInt(req.params.taskId);
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log(taskId, userId);
    try {
        if (taskId == undefined || userId == undefined) {
            throw new Error("server not get proper credential");
        }
        const task = yield prisma.task.findUnique({
            where: {
                id: taskId
            },
        });
        if (req.user.id !== (task === null || task === void 0 ? void 0 : task.userId)) {
            res
                .status(403)
                .json({ message: "You are not authorize person of this task" });
        }
        const deleteTask = yield prisma.task.delete({
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
}));
router.put("/update/:taskId", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dueDate } = req.body;
    const isoDate = new Date(dueDate).toISOString();
    const taskId = parseInt(req.params.taskId);
    try {
        if (title == undefined && description == undefined && dueDate == undefined) {
            throw new Error("no update data");
        }
        console.log(dueDate);
        const task = yield prisma.task.findFirst({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            res.status(404).json({ message: "task not found" });
        }
        if ((task === null || task === void 0 ? void 0 : task.userId) !== req.user.id) {
            res.status(404).json("Unauthorize:youcant update this task");
        }
        yield prisma.task.update({
            where: {
                id: taskId,
            },
            data: {
                title: title || (task === null || task === void 0 ? void 0 : task.title),
                description: description || (task === null || task === void 0 ? void 0 : task.description),
                dueDate: isoDate || (task === null || task === void 0 ? void 0 : task.dueDate),
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
}));
router.put("/complete/:taskId", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = parseInt(req.params.taskId);
        if (!taskId || !req.user.id) {
            res.status(400).json({ message: "Task ID and user authentication required" });
        }
        const task = yield prisma.task.findFirst({
            where: { id: taskId },
        });
        if (!task) {
            res.status(404).json({ message: "Task not found" }); // FIXED: Added return
        }
        if ((task === null || task === void 0 ? void 0 : task.userId) !== req.user.id) {
            res.status(403).json({ message: "Unauthorized: You cannot change this task" }); // FIXED: 403 for unauthorized
        }
        yield prisma.task.update({
            where: { id: taskId },
            data: { status: "COMPLETED" },
        });
        res.status(200).json({ message: "Task updated successfully" });
    }
    catch (error) {
        console.error("Error while updating task:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.get("/all", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany({
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
}));
router.get("/all/completed", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield prisma.task.findMany({
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
}));
router.get("/mytask/:id", authMiddleware_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(req.params.id);
    try {
        const task = yield prisma.task.findMany({
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
}));
exports.default = router;
