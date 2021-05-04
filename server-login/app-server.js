var http = require('http');
var path = require('path');
var db = require('./sqlQuery.js')
var bodyParser = require('body-parser');

var express = require('express');
var app = express();
var server = http.createServer(app);
// TAI SAO 
const port = process.env.PORT || 3000;
app.use(express.static(path.resolve(__dirname + './..', 'views')));
server.listen(port, "0.0.0.0", function () {
        var addr = server.address();
        console.log("All ready! server is listening at", addr.address + ":" + addr.port);
});

app.use(bodyParser.json());
// connect to sql server


app.post('/users/:id', db.GETUSER);//ending post method

app.post('/users ', db.CREATEUSER);//ending post method






