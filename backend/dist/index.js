"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 8080;
const prisma = new client_1.PrismaClient();
app.get("/", (req, res) => {
    res.send("Hello, Express with TypeScript!");
});
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/user", userRoutes_1.default);
app.use("/api/v1/task", taskRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
