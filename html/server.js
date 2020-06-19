var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pgQuery = require('./pgQuery');
var SHA256 = require("crypto-js/sha256");
const secret = require('./secret');
var app = express();

app.set('trust proxy', true);
app.set('views', __dirname);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//Access-Control-Allow-Origin
app.all('*', function(req, res, next) {
    console.log(pgQuery.getTime() + " Agent: " + req.header('user-agent') + ' Requested: ' + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //console.log("headers = " + JSON.stringify(req.headers)); // 包含了各种header，包括x-forwarded-for(如果被代理过的话)
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
        pgQuery.accountValidate(str.username, validation);

    });

    function validation(result) {
        //console.log('str: ' + str);
        //console.log('result: ' + result[0]);
        //console.log('result length: ' + result.length);

        //必须查询到结果，并且结果为传入密码的sha256
        if (result.length == 1 && result[0].password == SHA256(str.password).toString()) {
            req.session.username = str.username;
            console.log('Auth success.')
            res.redirect(302, '/main');
        } else {
            console.log('Auth failed.');
            res.status(401).send();
        }
    }
});

//综合查询
app.get('/covid19CompData/:data', function(req, res) {
    if (req.session.username) {
        var compRange = req.params.data.split(",");
        var queryRange = [compRange[0], compRange[1], compRange[2]];

        pgQuery.queryFunc(queryRange, 2, sendQueryRes);

        function sendQueryRes(result) {
            //console.log(result);
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

app.get('/news', function(req, res) {

});

//启动server
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port
    console.log("Server started at http://%s:%s", host, port);
});