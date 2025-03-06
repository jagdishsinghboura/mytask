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
router.post("/sign-in", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield prisma.user.findFirst({
        where: {
            username: username,
        }
    });
    if (!user) {
        res.status(400).json({ message: "user not found :please create first Account", status: false });
    }
    const isMatched = yield bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "");
    if (!isMatched) {
        res.status(404).json({ message: "password not matched", status: false });
    }
    const token = (0, jwt_1.generateToken)({ id: user === null || user === void 0 ? void 0 : user.id, username: username });
    res.status(200).json({
        message: "login successfully",
        status: true,
        token,
        user,
    });
}));
router.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName } = req.body;
    try {
        const isExistUser = yield prisma.user.findFirst({
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
        const newPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
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
}));
exports.default = router;
