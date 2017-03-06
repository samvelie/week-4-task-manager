var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(error, client, done){
    if(error) {
      console.log('Error connecting to database: ', error);
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM tasks ORDER BY task_complete;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error selecting from database: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.status(200).send(result.rows);
        }
      });
    }
  });//end pool.connect
})//end router.get

router.post('/new', function(req, res){
  var newTask = req.body;
  console.log(newTask.description + ' adding to SQL');
  pool.connect(function(error, client, done){
    if(error) {
      console.log('Error connecting to database: ', error);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO tasks (description, task_complete) VALUES ($1, $2);',
      [newTask.description, 'FALSE'],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error adding to database:', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });//end pool.connect
})//end router.post

router.put('/update/:id', function(req, res){
  var taskId = req.params.id;
  var completeStatus = req.body.taskComplete;
  console.log('taskId is ' + taskId + ' and completeStatus is ' + completeStatus);
  pool.connect(function(error, client, done){
    if(error) {
      console.log('Error connecting to database: ', error);
      res.sendStatus(500);
    } else {
      client.query('UPDATE tasks SET task_complete = $1 WHERE id = $2;',
      [completeStatus, taskId],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error updating database:', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });//end pool.connect
})//end router.post

router.delete('/delete/:id', function(req, res){
  var taskId= req.params.id;
  console.log('deleting task id#', taskId);
  pool.connect(function(error, client, done){
    if(error) {
      console.log('Error connecting to database: ', error);
      res.sendStatus(500);
    } else {
      client.query('DELETE FROM tasks WHERE id=$1;',
      [taskId],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error deleting:', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(202);
        }
      });
    }
  });//end pool.connect
})//end router.post


module.exports = router;
