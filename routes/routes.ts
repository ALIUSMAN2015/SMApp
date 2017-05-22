import express = require("express");
let Firebase = require("firebase");
let ref = new Firebase("https://smapp101.firebaseio.com/users");
let passport = require('passport');
let mongojs  = require('mongojs');
let db= mongojs('smlist',['smlist'])
import {saveUser, findUser} from "../model/dbmodel";
let router = express.Router();

router.post("/signup", (req:express.Request, res:express.Response)=>{

		ref.createUser({
			email    : req.body.data.Email,
  			password : req.body.data.Password
		}, function(err, success){
			if(err){
				res.send(err);
			} else {
				req.body.data.FirebaseToken = success.uid;
				saveUser(req.body.data)
					.then((userInstance)=>{
						res.send({status : true, user : userInstance});
					}, (err)=>{
						res.send({status: false, message : err});
					});
			}
		});
			

		
});


router.post("/login", (req:express.Request, res:express.Response)=>{
		console.log("On Login In");
		
		let user = req.body.data;
		findUser({Email : user.email})
			.then((userInstance)=>{
				if(!userInstance){
					res.send("No user found with supplied email");
					return;
				}
				
				
				if(userInstance.Password == user.password){
					res.send({message : "Logged In successfully", token : userInstance.FirebaseToken});
				} else {
					res.send("Wrong Password");
				}			
				
			}, (err)=>{
				res.send({status: false, message : err});
			});
});
	
router.post('/company',(req,res)=>{
    let com = req.body.data;
    console.log(com)
    res.send(com);
    
    
})

router.get("/smlist",(req,res)=>{
    console.log("data recived by /smlist");
    db.smlist.find((err,doc)=>{
        console.log(doc);
        res.json(doc)
    })
    
});
router.post('/smlist',(req,res)=>{
    console.log(req.body);

    db.smlist.insert(req.body,(err,doc)=>{
        res.json(doc);
    })
});
router.delete('/smlist/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id);
    db.smlist.remove({_id:mongojs.ObjectId(id)},(err,doc)=>{
        res.json(doc);
    })
});
router.get('/smlist/:id',(req,res)=>{
    let id = req.params.id;
    console.log(id);
    db.smlist.findOne({_id:mongojs.ObjectId(id)},(err,doc)=>{
        res.json(doc);
    })
})
router.put('/smlist/:id',(req,res)=>{
    let id = req.params.id;
    console.log(req.body.name);
})
  
  
module.exports = router;
