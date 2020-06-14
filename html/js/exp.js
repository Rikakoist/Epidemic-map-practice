var express = require('express');
const { Client } = require('pg');
var pgQuery = require('./pgQuery');
const { query } = require('express');
var app = express();

app.get('/', function(req, res) {
    console.log(req.cookies);
    res.send('hello');
})

//按照城市名查询结果
app.get('/covid19CityData/:city', function(req, respond) {
    respond.setHeader("Access-Control-Allow-Origin", "*");
    pgQuery.queryFunc(req.params.city, 0, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
})

app.get('/covid19DateData/:date', function(req, respond) {
    pgQuery.queryFunc(req.params.date, 1, sendQueryRes);

    function sendQueryRes(result) {
        respond.send(result);
    }
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("http://%s:%s", host, port);
})