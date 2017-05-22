/// <reference path="./typings/tsd.d.ts" />


import express 	= require("express");
import path		= require("path");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
var GeneralRoutes = require("./routes/routes");
let app = express();

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use("/api", GeneralRoutes);



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
