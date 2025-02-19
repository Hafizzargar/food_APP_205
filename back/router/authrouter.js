const express=require('express');
const { logincontroller, registercontroller, verifiedemailcontroller, verificationagain, changepwdcontroller, chechmatchotp, logout } = require('../controllers/authcontrollerl');
const authrouter=express.Router();

authrouter.post('/login',logincontroller);
authrouter.post('/register',registercontroller);
authrouter.get('/verfiedemail',verifiedemailcontroller);
authrouter.post('/sendemailagain',verificationagain);
authrouter.post('/changepwd',changepwdcontroller);
authrouter.post('/checkotp',chechmatchotp);
authrouter.get("/logout",logout)
module.exports=authrouter;