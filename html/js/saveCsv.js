function getTime() {
    var tm = new Date();
    return (tm.getFullYear() + "-" + tm.getMonth() + "-" + tm.getDate() + "_" + tm.getHours() + "-" + tm.getMinutes() + "-" + tm.getSeconds())
}

function saveCsv(data, queryType) {
    const parser = new json2csv.Parser();
    const csvData = parser.parse(data);
    //console.log(csvData);
    let content = "data:text/csv;charset=utf-8,\uFEFF" + csvData;
    const link = document.createElement("a");
    link.href = encodeURI(content);
    link.download = getTime() + "_" + queryType + "_queryResult.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}