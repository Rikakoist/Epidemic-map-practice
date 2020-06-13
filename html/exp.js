var express = require('express');
const { Client } = require('pg');
var app = express();

app.get('/', function(req, res) {
    console.log(req.cookies);
    res.send('hello');
})

//按照城市名查询结果
app.get('/covid19data/:city', function(req, respond) {

    const client = new Client({
        user: '',
        host: '',
        database: '',
        password: '',
        port: ,
    });

    //var cityName = "北海道"; //Variable
    var cityName = req.params.city; //Variable
    var alias = "\"日付\" AS daytime, \"都道府県名\" AS city, \"患者数\" AS infected, \"入院中\" AS inhospital,\"退院者\" AS cured, \"死亡者\" AS died";
    var SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"都道府県名\" = '" + cityName + "'";

    client.connect();
    client.query(SQLString, (err, res) => {
        console.log(err)
        respond.send(res.rows);
        client.end()
    });
})

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("http://%s:%s", host, port);
})