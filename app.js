/// <reference path="./typings/tsd.d.ts" />
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var GeneralRoutes = require("./routes/routes");
var app = express();
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", GeneralRoutes);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
