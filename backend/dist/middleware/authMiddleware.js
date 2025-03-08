"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
const authenticateJwt = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "unauthorize: no token provide" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decode;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json("something is wrong : Invalid token");
    }
};
exports.authenticateJwt = authenticateJwt;
