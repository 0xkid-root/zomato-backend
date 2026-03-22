const FoodModel = require('../models/food.model');
const {uploadFile} = require('../services/storage.service');
const {v4:uuid} = require('uuid');

const createFood = async(req,res)=>{
    try{
        const { name, description } = req.body;

        if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
        }
        if (!req.foodPartner) {
         return res.status(401).json({ message: "Unauthorized" });
        }
        
        const fileUplodeResult = await uploadFile(req.file.buffer, uuid());
        const foodItem = await FoodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUplodeResult.url,
        foodPartner: req.foodPartner._id
    })
    return res.status(201).json(
        {
            message:"Food item created successfully",
            food:foodItem
        }
    )

         
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

module.exports={
    createFood
}