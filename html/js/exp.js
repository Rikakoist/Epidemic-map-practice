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

//按照日期范围查询结果
app.get('/covid19DateData/:date', function(req, respond) {
    var dateRange = req.params.date.split(",");
    var queryDateRange = [dateRange[0], dateRange[1]]; //只取前两个参数，防止构造字符串
    //console.log(queryDateRange[0] + "..." + queryDateRange[1]);
    respond.setHeader("Access-Control-Allow-Origin", "*");
    pgQuery.queryFunc(queryDateRange, 1, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
})

//按照日期范围查询结果
app.get('/covid19CompData/:data', function(req, respond) {
    var compRange = req.params.data.split(",");
    var queryRange = [compRange[0], compRange[1], compRange[2]];

    respond.setHeader("Access-Control-Allow-Origin", "*");
    pgQuery.queryFunc(queryRange, 2, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("http://%s:%s", host, port);
})