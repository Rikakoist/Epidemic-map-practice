var pg = require('pg');
var conString = "postgres://username:password@loc/db";

var client = new pg.Client(conString);

var tem = 33;

SQLString = 'insert into pet(tem) values (' + tem + ')';

client.connect(function(error, results) {
    if (error) {
        console.log('clientConnectionReady Error:' + error.message);
        client.end();
        return;
    }
    console.log('connection success...\n');
    client.query(SQLString, function(error, results) {
        console.log(error);
    })
});