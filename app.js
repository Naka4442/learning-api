const express = require("express");
const mongoose = require("mongoose");

const { signin, signup } = require("./controllers/user");
const { auth } = require("./middlewares/auth");
const userRouter = require("./routes/user");
const lessonRouter = require("./routes/lesson"); 

const app = express();

app.use(express.json());

app.post("/signup", signup);
app.post("/signin", signin);

app.use(auth);

app.use("/users", userRouter);
app.use("/lessons", lessonRouter);

async function main() {
 
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/learning");
        app.listen(3000);
        console.log("Сервер ожидает подключения...");
    }
    catch(err) {
        return console.log(err);
    }
}

main();

process.on("SIGINT", async() => {
      
    await mongoose.disconnect();
    console.log("Приложение завершило работу");
    process.exit();

});