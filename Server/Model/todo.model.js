const mongoose= require("mongoose");

const todoSchema= mongoose.Schema({
    task: String,
    userId: String,
    status: Boolean
})

const todoModel= mongoose.model("todo", todoSchema);

module.exports= {
    todoModel
}
