const express = require("express");

const userRouter = require("./routes/user"); 

const app = express();

app.use("/users", userRouter);
app.get("/", (req, res) => res.end("I'm working!!!"))

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