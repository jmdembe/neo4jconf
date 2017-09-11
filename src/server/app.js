'use strict';

var express = require('express');
var path = require ('path');
var logger = require('logger');
var bodyParser = require ('body-parser');
var neo4j = require('neo4j-driver').v1;
var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(express.static('dist/'));

app.listen(app.get('port'), function serviceStarted(err){
    if(err){
        console.error(err, 'ERROR!');
    } else {
        console.log("Server located at: http://localhost:" + app.get('port'));
    }
});
