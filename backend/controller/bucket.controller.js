const toDoBucket = require("../model/bucket.model");

exports.createBucket =  (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: false,
            message: "Content can't be empty"
        });
        return;
    }
    if (!req.body.bucketName) {
        res.status(400).json({
            status: false,
            message: "bucketName is req"
        });
        return;
    }
    const bucketData = {
        bucketName:req.body.bucketName
    }
    toDoBucket.createBucket(bucketData, (err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};
exports.getAllBucketList =  (req, res) => {
    toDoBucket.getAllBucketList((err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};

exports.deleteBucket =  (req, res) => {
    if (!req.body || !req.body.bucketID) {
        res.status(400).json({
            status: false,
            message: "bucket Id is required!"
        });
        return;
    }
    toDoBucket.deleteBucket(req.body.bucketID,(err,data)=>{
        if (err)
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred"
            });
        else res.json({status: true, data});
    })
};