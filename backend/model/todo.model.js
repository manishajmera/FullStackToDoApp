const sql = require("../database/database");


exports.createATodo =  (todoData, result) => {
    sql.query("INSERT INTO ToDoList SET ?", todoData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, title:todoData.taskName,bucketId:todoData.bucketID });
    });
};

exports.getToDoListOfBucket =  (bucketId, result) => {
    sql.query(`select todoID,taskName as title,markDone,bucketID from ToDoList where bucketID=${bucketId} AND del_status=0`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,res);
    });
};

exports.deleteAToDo =  (taskID, result) => {
    sql.query(`update ToDoList set ToDoList.del_status=1 where ToDoList.todoID=${taskID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,"success");
    });
};

exports.updateATodo =  (taskID,taskName, result) => {
    sql.query(`update ToDoList set ToDoList.taskName='${taskName}' where ToDoList.todoID=${taskID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,"success");
    });
};
exports.markToDoDone =  (taskID, result) => {
    sql.query(`update ToDoList set ToDoList.markDone=not ToDoList.markDone where ToDoList.todoID=${taskID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,"success");
    });
};