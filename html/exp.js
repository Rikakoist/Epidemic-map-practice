var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pgQuery = require('./pgQuery');
const secret = require('./secret');
var app = express();

app.set('views', __dirname);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    console.log(pgQuery.getTime() + " IP: " + req.ip + ' ' + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //res.header("X-Powered-By", ' 3.2.1')
    //res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(cookieParser(secret.getSessionSecret()));
app.use(session({
    secret: secret.getSessionSecret(),
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 3600,
    },
}))

app.use(express.static('public'));

//登录页面
app.get('/', function(req, res) {
    if (req.session.username) {
        res.redirect(302, '/main');
    } else {
        res.type('html');
        res.render(__dirname + '\\login.html');
    }
});

//地图页面
app.get('/main', function(req, res) {
    if (req.session.username) {
        res.type('html');
        res.render(__dirname + '\\map.html');
    } else {
        res.redirect(302, '/');
    }
});

//登录校验
app.post('/login', function(req, res) {
    var str = "";
    req.on("data", function(dt) {
        str += dt
    });
    req.on("end", function() {
        str = JSON.parse(str);
        if (str.username == "admin" && str.password == "123456") {
            console.log("pass");
            req.session.username = str.username;
            res.redirect(302, '/main');
        } else {
            console.log('Authfail');
            res.status(401).send();
        }
    });
});

//按照日期范围查询结果
app.get('/covid19CompData/:data', function(req, res) {
    if (req.session.username) {
        var compRange = req.params.data.split(",");
        var queryRange = [compRange[0], compRange[1], compRange[2]];

        pgQuery.queryFunc(queryRange, 2, sendQueryRes);

        function sendQueryRes(result) {
            res.status(200).send(result);
        }
    } else {
        res.status(401).send();
    }
});

//按照城市名查询结果
app.get('/covid19CityData/:city', function(req, res) {
    if (req.session.username) {
        //res.setHeader("Access-Control-Allow-Origin", "*");
        pgQuery.queryFunc(req.params.city, 0, sendQueryRes);

        function sendQueryRes(result) {
            res.status(200).send(result);
        }
    } else {
        res.status(401).send();
    }
});

//按照日期范围查询结果
app.get('/covid19DateData/:date', function(req, res) {
    if (req.session.username) {
        var dateRange = req.params.date.split(",");
        var queryDateRange = [dateRange[0], dateRange[1]]; //只取前两个参数，防止构造字符串
        //console.log(queryDateRange[0] + "..." + queryDateRange[1]);
        pgQuery.queryFunc(queryDateRange, 1, sendQueryRes);

        function sendQueryRes(result) {
            res.status(200).send(result);
        }
    } else {
        res.status(401).send();
    }
});

//启动server
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
});