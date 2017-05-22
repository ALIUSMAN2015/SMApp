var express = require("express");
var Firebase = require("firebase");
var ref = new Firebase("https://smapp101.firebaseio.com/users");
var passport = require('passport');
var mongojs = require('mongojs');
var db = mongojs('smlist', ['smlist']);
var dbmodel_1 = require("../model/dbmodel");
var router = express.Router();
router.post("/signup", function (req, res) {
    ref.createUser({
        email: req.body.data.Email,
        password: req.body.data.Password
    }, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            req.body.data.FirebaseToken = success.uid;
            dbmodel_1.saveUser(req.body.data)
                .then(function (userInstance) {
                res.send({ status: true, user: userInstance });
            }, function (err) {
                res.send({ status: false, message: err });
            });
        }
    });
});
router.post("/login", function (req, res) {
    console.log("On Login In");
    var user = req.body.data;
    dbmodel_1.findUser({ Email: user.email })
        .then(function (userInstance) {
        if (!userInstance) {
            res.send("No user found with supplied email");
            return;
        }
        if (userInstance.Password == user.password) {
            res.send({ message: "Logged In successfully", token: userInstance.FirebaseToken });
        }
        else {
            res.send("Wrong Password");
        }
    }, function (err) {
        res.send({ status: false, message: err });
    });
});
router.post('/company', function (req, res) {
    var com = req.body.data;
    console.log(com);
    res.send(com);
});
router.get("/smlist", function (req, res) {
    console.log("data recived by /smlist");
    db.smlist.find(function (err, doc) {
        console.log(doc);
        res.json(doc);
    });
});
router.post('/smlist', function (req, res) {
    console.log(req.body);
    db.smlist.insert(req.body, function (err, doc) {
        res.json(doc);
    });
});
router.delete('/smlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.smlist.remove({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});
router.get('/smlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    db.smlist.findOne({ _id: mongojs.ObjectId(id) }, function (err, doc) {
        res.json(doc);
    });
});
router.put('/smlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body.name);
});
module.exports = router;
