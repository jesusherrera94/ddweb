
var http = require("http");
var express = require('express');
var myParser = require("body-parser");
var app = express();
var fs = require("fs");
var path    = require("path");
var session = require("express-session");

var firebase = require('firebase')


var locale = require("locale")
, supported = ["en", "en_US","es", "es-US"]
, default1 = "es";

var pathES = __dirname + '/public';
var pathEN = __dirname + '/publicEn';


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(myParser.urlencoded({extended : true}));

app.use(express.static(__dirname + '/public'));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.use(locale(supported, default1));
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});









//routes
app.get("/", function(req, res){
        res.render(path.join(pathES+'/index'));
        res.end();
})


app.listen(process.env.PORT || 80);