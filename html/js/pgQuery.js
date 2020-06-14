//postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const { Client, Pool } = require('pg');
const clientInfo = require('./secret');

function queryFunc(queryValue, method, cbFunc) {
    const client = new Client(clientInfo.getClientInfo());
    var alias = "\"日付\" AS daytime, \"都道府県名\" AS city, \"患者数\" AS infected, \"入院中\" AS inhospital,\"退院者\" AS cured, \"死亡者\" AS died";
    var SQLString
    switch (method) {
        case 0:
            {
                SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"都道府県名\" = '" + queryValue + "'";
                break;
            }
        case 1:
            {
                SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"日付\" = '" + queryValue + "'";
                break;
            }
        default:
            {
                alert('查询方式错误。');
            }
    }

    client.connect();
    client.query(SQLString, function(err, res) {
        if (err) {
            console.log(err.stack)
        } else {
            cbFunc(res.rows);
            client.end();
        }
    });
}

function queryByDate(time, cbFunc) {

    const client = new Client(clientInfo.getClientInfo());

    var alias = "\"日付\" AS daytime, \"都道府県名\" AS city, \"患者数\" AS infected, \"入院中\" AS inhospital,\"退院者\" AS cured, \"死亡者\" AS died";
    var SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"日付\" = '" + time + "'";

    client.connect();
    client.query(SQLString, function(err, res) {
        if (err) {
            console.log(err.stack)
        } else {
            cbFunc(res.rows);
            client.end();
        }
    });
}

module.exports = {
    queryFunc
}