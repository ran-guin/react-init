var express = require('express');
var router = express.Router();
var Dbc = require('../models/dbc');
var jwt = require('jsonwebtoken');

router.get('/',function(req,res) {
  var dbc = new Dbc();
  dbc.loadUser();
  res.json({error: false, message: 'temp.. remove'});
});

router.post('/',function(req,res) {
  var model = new Dbc();
  res.json({error: false, message: 'add user..'});
});

router.post('/login',function(req,res) {
  var model = new db();

  res.json({
        error: false,
        message: 'Validation successful!',
        token: token
  });
});

module.exports = router;
