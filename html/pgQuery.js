//postgresql://dbuser:secretpassword@database.server.com:3211/mydb'
const { Client, Pool } = require('pg');
const clientInfo = require('./secret');

//获取当前时间
function getTime() {
    var tm = new Date();
    return ("[" + tm.getFullYear() + "-" + tm.getMonth() + "-" + tm.getDate() + " " + tm.getHours() + ":" + tm.getMinutes() + ":" + tm.getSeconds() + "]")
}

//疫情查询函数
function queryFunc(queryValue, method, cbFunc) {
    const client = new Client(clientInfo.getClientInfo());
    var alias = "\"日付\" AS daytime, \"都道府県名\" AS city, \"患者数\" AS infected, \"入院中\" AS inhospital,\"退院者\" AS cured, \"死亡者\" AS died";
    var SQLString
    switch (method) {
        case 0:
            {
                SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"都道府県名\" = '" + queryValue + "' ORDER BY \"日付\" DESC";
                break;
            }
        case 1:
            {
                SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"日付\" >= '" + queryValue[0] + "' AND \"public\".detailbyregion.\"日付\" <= '" + queryValue[1] + "' ORDER BY \"日付\" DESC";
                break;
            }
        case 2:
            {
                SQLString = "SELECT " + alias + " FROM \"public\".detailbyregion WHERE \"public\".detailbyregion.\"都道府県名\" = '" + queryValue[0] + "'AND \"public\".detailbyregion.\"日付\" >= '" + queryValue[1] + "' AND \"public\".detailbyregion.\"日付\" <= '" + queryValue[2] + "'ORDER BY \"日付\" DESC";
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
            console.log(getTime() + " Executed \"" + queryValue + "\",method " + method + " success, returned " + res.rowCount + " record(s).");
            cbFunc(res.rows);
            client.end();
        }
    });
}

function accountValidate(queryValue, cbFunc) {
    const client = new Client(clientInfo.getAccountDB());
    var SQLString = "SELECT * FROM \"public\".accounts WHERE \"public\".accounts.\"username\" = '" + queryValue + "'";
    client.connect();
    client.query(SQLString, function(err, res) {
        if (err) {
            console.log(err.stack)
        } else {
            console.log(getTime() + " Executed \"" + queryValue + "\", success, returned " + res.rowCount + " record(s).");
            cbFunc(res.rows);
            client.end();
        }
    });
}


module.exports = {
    queryFunc,
    accountValidate,
    getTime
}