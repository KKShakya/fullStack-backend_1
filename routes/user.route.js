const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/user.model');

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  const {email,pass,name,age} = req.body;
  try {
    const oldUser = await userModel.find({email});
 console.log(oldUser)
    if(oldUser.length>0){
      return res.send({"msg":"user already registered"});
    }

    const encryptedPassword = await bcrypt.hash(pass, 10);

    let user = new userModel({email,pass:encryptedPassword,name,age});
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send({"error": error.message});
  }
});
UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  

 
  try {
    let user = await userModel.find({email});

    console.log(user[0]._id);
    if(user.length>0 &&(await bcrypt.compare(pass,user[0].pass))){
      const token=jwt.sign({"userID":user[0]._id},"masai",{expiresIn:"1h"})
      res.send({"msg":"Login successful","token":token});
    }
    else {
      res.status(404).send({"msg":"There is no user with that email and password"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
});



module.exports = {UserRouter}