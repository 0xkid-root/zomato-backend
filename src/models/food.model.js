const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,

    },
    description:{
        type:String,
    },
    foodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPartner",
        required:true
    }
},{
    timestamps:true
})

const FoodModel = mongoose.model('Food',foodSchema)
module.exports = FoodModel;
