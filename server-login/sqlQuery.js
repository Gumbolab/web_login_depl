var mysql = require('mysql');
var config = require('./config.js');
let connection = mysql.createConnection(config.configDB);

connection.connect(function (err) {
        if (err) {
                console.log("")
                return console.error('error: ' + err.message);
        }

        console.log('Connected to the MySQL server.');
});

var GETUSER = (request, response) => {
        const dataIncome = request.body;
        var sql_mail = `SELECT * FROM LoginUsers WHERE mail='${dataIncome.mail}' AND pw='${dataIncome.pw}'`;//check if mail existed
        connection.query(sql_mail, (error, results, fields) => {
                if (error) {
                        return console.error(error.message);
                }
                // console.log(results);

                if (Object.keys(results).length != 0) {
                        // exist = true;
                        console.log("done");
                        response.send('EXISTED');
                } else {
                        response.send("NOT FOUND");
                }
        });//edning connectionn

}
var CREATEUSER = (request, response) => {
        const dataIncome = request.body;
        let sql_insert = `insert into LoginUsers(Username,mail, pw) values ('${dataIncome.name}','${dataIncome.mail}', '${dataIncome.pw}')`;
        let sql_check = `SELECT * FROM LoginUsers WHERE mail='${dataIncome.mail}'`;//check if mail existed
        // var exist = false;
        connection.query(sql_check, (error, results, fields) => {
                if (error) {
                        return console.error(error.message);
                }
                if (Object.keys(results).length != 0) {
                        // exist = true;
                        console.log('existed');
                        response.send('EXISTED');

                } else {
                        connection.query(sql_insert, (error, results, fields) => {
                                if (error) {
                                        console.log(error.message);
                                        return console.error(error.message);
                                }
                                console.log(results);
                                console.log("done");
                                response.send('DONE');
                        });//ending connection 
                }

        });//end connection 1
}

module.exports = {
        GETUSER,
        CREATEUSER

}