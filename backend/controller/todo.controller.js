const ToDo = require("../model/todo.model");


exports.createATodo =  (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: false,
            message: "Content can't be empty"
        });
        return;
    }
    if (!req.body.taskName || !req.body.bucketID) {
        res.status(400).json({
            status: false,
            message: "task name and bucketID is req"
        });
        return;
    }
    const todoData = {
        taskName:req.body.taskName,
        bucketID:req.body.bucketID
    }
    ToDo.createATodo(todoData, (err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else {
            res.json({status: true, data})
        };
    })
}

exports.getToDoListOfBucket =  (req,res) => {
    if (!req.query || !req.query.bucketID) {
        res.status(400).json({
            status: false,
            message: "bucket Id is required!"
        });
        return;
    }
    ToDo.getToDoListOfBucket(req.query.bucketID,(err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};

exports.deleteAToDo =  (req, res) => {
    if (!req.body || !req.body.todoId) {
        res.status(400).json({
            status: false,
            message: "todoId is required!"
        });
        return;
    }
    ToDo.deleteAToDo(req.body.todoId,(err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};

exports.updateATodo =  (req, res) => {
    if (!req.body || !req.body.todoId ||   !req.body.taskName) {
        res.status(400).json({
            status: false,
            message: "todoId && taskName is required!"
        });
        return;
    }
    ToDo.updateATodo(req.body.todoId,req.body.taskName,(err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};

exports.markToDoDone =  (req, res) => {
    if (!req.body || !req.body.todoId) {
        res.status(400).json({
            status: false,
            message: "todoId is required!"
        });
        return;
    }
    ToDo.markToDoDone(req.body.todoId,(err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};