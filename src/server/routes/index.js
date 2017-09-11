'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function getData(req, res) {
    var me = {name: 'Jess', age: 126, cool: false};
    res.send('API works');
});

module.exports = router;