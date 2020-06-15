var express = require('express');
var pgQuery = require('./pgQuery');
var app = express();

//Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    console.log(pgQuery.getTime() + " IP: " + req.ip);
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(express.static('public'));

//按照城市名查询结果
app.get('/covid19CityData/:city', function(req, respond) {
    //respond.setHeader("Access-Control-Allow-Origin", "*");
    pgQuery.queryFunc(req.params.city, 0, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
});

//按照日期范围查询结果
app.get('/covid19DateData/:date', function(req, respond) {
    var dateRange = req.params.date.split(",");
    var queryDateRange = [dateRange[0], dateRange[1]]; //只取前两个参数，防止构造字符串
    //console.log(queryDateRange[0] + "..." + queryDateRange[1]);
    pgQuery.queryFunc(queryDateRange, 1, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
});

//按照日期范围查询结果
app.get('/covid19CompData/:data', function(req, respond) {
    var compRange = req.params.data.split(",");
    var queryRange = [compRange[0], compRange[1], compRange[2]];

    pgQuery.queryFunc(queryRange, 2, sendQueryRes);

    function sendQueryRes(result) {
        respond.status(200).send(result);
    }
});

//启动server
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
});