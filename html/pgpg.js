var pg = require('pg');
var conString = "postgres://username:password@loc/db";

var client = new pg.Client(conString);

SQLString = 'SELECT * FROM "public".epidemicinfo WHERE "public".epidemicinfo."CName" = \'Aichi\'';

client.connect(function(error, results) {
    if (error) {
        console.log('clientConnectionReady Error:' + error.message);
        client.end();
        return;
    }
    console.log('connection success...\n');
    client.query(SQLString, function(error, results) {
        console.log(error);
        return results;
    })
    return results;
});


//ClientConnectionReady Error:getaddrinfo ENOTFOUND public