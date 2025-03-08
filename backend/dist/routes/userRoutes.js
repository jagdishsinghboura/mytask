"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.post("/sign-in", async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            username: username,
        }
    });
    if (!user) {
        res.status(400).json({ message: "user not found :please create first Account", status: false });
    }
    const isMatched = await bcrypt_1.default.compare(password, user?.password || "");
    if (!isMatched) {
        res.status(404).json({ message: "password not matched", status: false });
    }
    const token = (0, jwt_1.generateToken)({ id: user?.id, username: username });
    res.status(200).json({
        message: "login successfully",
        status: true,
        token,
        user,
    });
});
router.post("/sign-up", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    try {
        const isExistUser = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });
        if (isExistUser) {
            res.status(404).json({
                message: "user already exist",
                data: null,
            });
        }
        const newPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: newPassword,
                firstName,
                lastName,
            },
        });
        const token = (0, jwt_1.generateToken)({ id: user.id, username: user.username });
        if (user) {
            res.status(201).json({
                message: "User created successfully",
                status: true,
                token,
                data: user,
            });
        }
    }
    catch (error) {
        console.log("Error while signup", error);
        res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
});
exports.default = router;
