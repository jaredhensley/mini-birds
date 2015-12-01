var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('birdSightings', ['sightings'])


app.use(bodyParser.json());


app.get('/api/sighting', function (req, res) {
  db.sightings.find({}, function (err, results) {
    if (!err) {
      res.status(200).send(results);
    }

  });
});

app.post('/api/sighting', function (req, res) {
  db.sightings.insert(req.body, function (err, results) {
    if (!err) {
      console.log(results);
      res.status(201).end();
    }
  })
});

app.put('/api/sighting/:id', function (req, res) {
  db.sightings.update({
    _id: mongojs.ObjectId(req.params.id)
  }, {
    $set: req.body
  }, function (err, results) {
    if (!err) {
      console.log(results);
      res.status(200).end();
    }
  });
});

app.delete('/api/sighting/:id', function (req, res) {
  db.sightings.remove({
    _id: mongojs.ObjectId(req.params.id)
  }, function (err, results) {
    if (!err) {
      console.log(results);
      res.status(200).end();
    }
  });
});

app.listen(8080, function () {

  console.log('hey hey man my server is running!');
});