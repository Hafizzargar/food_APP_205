require('dotenv').config();
require('events').EventEmitter.defaultMaxListeners = 15;

const express=require('express');
const dbconnection = require('./dbconnection');
const authrouter = require('./router/authrouter');
const session=require('express-session');
const connectmongosession=require("connect-mongodb-session")(session);
const cookieParser=require('cookie-parser');
const isAuth=require('./utils/isAuth')


const app=express();
app.use(cookieParser());
const port=process.env.port || 3000;

const store=connectmongosession({
    uri:process.env.mongo_uri,
    collection:'sessions'
})
const cors = require('cors');
const payrouter = require('./router/payment');
const datarouters = require('./router/datarouter');
const cartrouter = require('./router/cartrouter');




app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',  // Frontend 1
            'http://localhost:5174'   // Frontend 2
        ];
        
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        // Check if the incoming origin is in the allowed list
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,POST',  // Allowed request methods
    allowedHeaders: 'Content-Type',  // Allowed headers
    credentials: true  // Allow cookies for authentication
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
app.use('/api/data',isAuth,datarouters);
app.use('/api/cart',isAuth,cartrouter);
app.use('/api/pay',payrouter);





app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})