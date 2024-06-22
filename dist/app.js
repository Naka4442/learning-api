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
/// <reference path="globals.d.ts" />
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const user_1 = require("./controllers/user");
const auth_1 = require("./middlewares/auth");
const tasks_1 = __importDefault(require("./routes/tasks"));
const client_1 = __importDefault(require("./routes/client"));
const work_1 = __importDefault(require("./routes/work"));
const user_2 = __importDefault(require("./routes/user"));
const lesson_1 = __importDefault(require("./routes/lesson"));
const course_1 = __importDefault(require("./routes/course"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/signup", user_1.signup);
app.post("/signin", user_1.signin);
app.use(auth_1.auth);
app.use("/works", work_1.default);
app.use("/users", user_2.default);
app.use("/tasks", auth_1.isAdmin, tasks_1.default);
app.use("/clients", client_1.default);
app.use("/lessons", lesson_1.default);
app.use("/courses", course_1.default);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)("mongodb://127.0.0.1:27017/learning");
            app.listen(3000);
            console.log("Сервер ожидает подключения...");
        }
        catch (err) {
            return console.log(err);
        }
    });
}
main();
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mongoose_1.disconnect)();
    console.log("Приложение завершило работу");
    process.exit();
}));
