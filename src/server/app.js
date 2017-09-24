var express = require('express');
var path = require ('path');
var logger = require('morgan');
var bodyParser = require ('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public/')));

var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', 'neoadmin'));
var session = driver.session();

app.get('/', function(req, res) {
    session
        .run('MATCH(n:ProductVersion) RETURN n LIMIT 25')
        .then(function(result) {
            result.records.forEach(function(record) {
                console.log(record._fields[0].properties);
            });
        })
        .catch(function(err){
            console.error(err);
        });
    res.send('HALLO!');
});

app.get('/')

app.listen(3000);
console.log('Server started on port 3000');

module.exports = app;