var express = require('express');
var path = require ('path');
var logger = require('morgan');
var bodyParser = require ('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
    res.send('HALLO!');
});

app.listen(3000);
console.log('Server started on port 3000');

module.exports = app;