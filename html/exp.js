var express = require('express');
var app = express();

app.get('/', function(req, res) {
    console.log(req.cookies);
    res.send('hello');
})

app.get('/covid19data', function(req, res) {
    consile.log(req);
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("http://%s:%s", host, port);
})