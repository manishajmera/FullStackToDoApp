const sql = require("../database/database");
exports.createBucket =  (bucketData, result) => {
    sql.query("INSERT INTO BucketList SET ?", bucketData, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, title:bucketData.bucketName });
    });
};
exports.getAllBucketList =  (result) => {
    sql.query("select bucketID,bucketName as title from BucketList where del_status=0", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null,res);
    });
};

exports.deleteBucket =  (bucketID, result) => {
    console.log(bucketID);
    sql.query(`update BucketList set BucketList.del_status=1 where BucketList.bucketID=${bucketID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }else{
            sql.query(`update ToDoList set ToDoList.del_status=1 where ToDoList.bucketID=${bucketID}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null,"success");
            });
        }
    });
};