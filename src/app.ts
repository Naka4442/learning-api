/// <reference path="globals.d.ts" />
import express, { Express } from "express";
import { connect, disconnect } from "mongoose";

import { signin, signup } from "./controllers/user";
import { auth, isAdmin } from "./middlewares/auth";

import tasksRouter from './routes/tasks'
import clientsRouter from './routes/client'
import worksRouter from './routes/work'
import userRouter from "./routes/user";
import lessonRouter from "./routes/lesson";
import courseRouter from "./routes/course";

const app : Express = express();

app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);

app.use(auth);

app.use("/works", worksRouter); 
app.use("/users", userRouter);
app.use("/tasks", isAdmin, tasksRouter);
app.use("/clients", clientsRouter)
app.use("/lessons", lessonRouter);
app.use("/courses", courseRouter);

async function main() {
 
    try{
        await connect("mongodb://127.0.0.1:27017/learning");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}

main();

process.on("SIGINT", async() => {
      
    await disconnect();
    console.log("Приложение завершило работу");
    process.exit();

});