const express= require("express");
const { todoModel } = require("../Model/todo.model");
const todoRouter= express.Router();

todoRouter.get("/home", async(req, res)=>{
    let id = req.body.userId;
    try {
        const data= await todoModel.find({userId:id});
        res.send(data)
    } catch (error) {
        console.log(error);
        res.send("Unable to fetch User data")
    }
})

todoRouter.post("/add", async(req, res)=>{
    let task=req.body;
    try {
        const data= new todoModel(task);
        await data.save()
        res.send("Added task Sucessfully")
    } catch (error) {
        console.log(error);
        res.send("Unable to Add task")
    }
})


todoRouter.patch("/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    try {
      await todoModel.findByIdAndUpdate({_id:id}, data);
        res.send("Updated task");
    } catch (error) {
        console.log(error);
        res.send("Unable to update")
    }
})

todoRouter.delete("/:id", async(req, res)=>{
    const id= req.params.id;
    try {
        await todoModel.findByIdAndDelete({_id:id});
        res.send("Deleted Task");
    } catch (error) {
        console.log(error);
        res.send("Unable to delete")
    }
})



module.exports= {
    todoRouter
}