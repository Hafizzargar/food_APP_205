const mongoose=require('mongoose');
// console.log(process.env.mongo_uri);
const dbconnection=mongoose.connect(process.env.mongo_uri)
.then(()=>console.log('connection create succefully done')
)
.catch((err)=>console.log('connetion not created'+err)
)
module.exports=dbconnection;