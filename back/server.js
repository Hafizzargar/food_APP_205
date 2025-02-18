require('dotenv').config();
const express=require('express');
const dbconnection = require('./dbconnection');
const authrouter = require('./router/authrouter');
const session=require('express-session');
const connectmongosession=require("connect-mongodb-session")(session);


const app=express();
const port=process.env.port || 3000;

const store=connectmongosession({
    uri:process.env.mongo_uri,
    collection:'session'
})
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST',  // Corrected from "methodd"
    allowedHeaders: 'Content-Type',  // Corrected from "allowHeaders"
    credentials: true
}));

app.use(session({
    store:store,
    saveUninitialized:false,
    secret:process.env.secret_key,
    resave:false
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/api/auth',authrouter);





app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})