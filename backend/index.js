const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
// parse requests of content-type: application/json
app.use(bodyParser.json());
const todo = require("./controller/todo.controller");
const buckets = require("./controller/bucket.controller");



// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// simple route
app.get('/', (req, res) => {
    res.json({ status: true, message: 'Welcome to todo Application' });
});
//Bucket all routes
app.post('/addBucket',buckets.createBucket);
app.post('/deleteBucket',buckets.deleteBucket);
app.get('/getAllBuckets',buckets.getAllBucketList);

//Todo all routes
app.post('/addToDo',todo.createATodo);
app.post('/deleteToDo',todo.deleteAToDo);
app.get('/getAllBucketTodos',todo.getToDoListOfBucket);
app.post('/updateTodo',todo.updateATodo);
app.post('/markToDoDone',todo.markToDoDone);





// Invalid route
app.get('*', (req, res) => {
    res.json({ status: false, message: 'Invalid Route' });
});

// set port, listen for requests
const PORT = process.env.PORT || 8011;
app.listen(PORT, () => {
    console.log('Server is running on port '+PORT);
});
