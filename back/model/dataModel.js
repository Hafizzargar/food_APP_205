const mongoose=require('mongoose');
const dataSchema = require('../schema/dataschema');
const dataModel=mongoose.model('data',dataSchema);
module.exports=dataModel;