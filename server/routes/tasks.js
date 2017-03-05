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

router.post('/new', function(req, res){
  var taskObject = req.body;
  console.log(taskObject.description);
  res.sendStatus(200);

})//end router.post



module.exports = router;
