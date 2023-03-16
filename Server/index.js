const express= require("express");
const { connection } = require("./Config/db");
const { validator } = require("./Middleware/validator.middleware");
const { userRouter } = require("./Routes/user.routes");
const { todoRouter } = require('./Routes/todo.routes');
const app= express();

const cors= require("cors");

app.use(cors({
    origin : "*"
}))

app.use(express.json());

require("dotenv").config();

app.get("/", (req, res)=>{
    res.send("Welcome to Todo");
})

app.use("/user", userRouter);

app.use(validator);

app.use('/todo', todoRouter )



app.listen(process.env.PORT, async()=>{
    try{
        await connection
        console.log("Connected to database")
    }
    catch(err){
        console.log(err)
        console.log("Error while connecting to DB")
    }
    console.log(`Running on port ${process.env.PORT}`)
});