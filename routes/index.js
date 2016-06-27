var express = require('express');
var router = express.Router();
var db = require('../config/database').get('tweetz');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/tweetz', function(req, res, next) {
  console.log('hellooooo');
  db.find({}, function(err, posts) {
    console.log(posts);
    res.json(posts);
  })
})

router.post('/tweetz/new', function(req, res, next) {
  db.insert({text: req.body.text}, function(err, post) {
    res.json(post);
  })
})
module.exports = router;
