var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var pgQuery = require('./pgQuery');
const secret = require('./secret');
var SHA256 = require("crypto-js/sha256");

var app = express();

app.set('trust proxy', true);
app.set('views', __dirname);
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

//跨域问题
app.all('*', function(req, res, next) {
    console.log(pgQuery.getTime() + " Agent: " + req.header('user-agent') + ' Requested: ' + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    //console.log("headers = " + JSON.stringify(req.headers)); // 包含了各种header，包括x-forwarded-for(如果被代理过的话)
    next();
});

//cookie和session
app.use(cookieParser(secret.getSessionSecret()));
app.use(session({
    secret: secret.getSessionSecret(),
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 3600,
    },
}))

app.use(express.static('public')); //静态访问路径

//登录页面
app.get('/', function(req, res) {
    if (req.session.username) {
        //验证通过，重定向到疫情地图
        res.redirect(302, '/main');
    } else {
        //加载登陆页面
        res.type('html');
        res.render(__dirname + '\\login.html');
    }
});

//地图页面
app.get('/main', function(req, res) {
    if (req.session.username) {
        //验证通过，返回疫情地图文档
        res.type('html');
        res.render(__dirname + '\\map.html');
    } else {
        //重定向登录
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

    //验证函数
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

//查询接口
app.get('/covid19Data/:data', function(req, res) {
    if (req.session.username) {
        var compRange = req.params.data.split(","); //拆分参数
        //console.log(compRange + ' ' + compRange.length);
        //根据参数长度判断调用方法
        if (compRange.length >= 1 && compRange.length <= 3) {
            pgQuery.queryFunc(compRange, compRange.length, sendQueryRes);

            function sendQueryRes(result) {
                //console.log(result);
                res.status(200).send(result);
            }
        } else {
            res.status(400).send('查询参数错误哦~');
        }
    } else {
        res.status(401).send('查询要登录哦~');
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