const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const FoodModel = require('../models/food.model');


const registerFoodPartner = async (req, res) => {
    try {
        const { name, email, password,phone,address,contactName } = req.body;
        if(!name || !email || !password || !phone || !address || !contactName)
            return res.status(400).json({ message: "All fields are required" });
        const foodPartner = await foodPartnerModel.findOne({ email });
        if (foodPartner) return res.status(400).json({ message: "Food partner already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newFoodPartner = await foodPartnerModel.create({ name, email, password: hashedPassword, phone, address, contactName });
        const token =  jwt.sign({ id: newFoodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1d'

         });
         res.cookie("token", token, {
            httpOnly: true,});


        return res.status(201).json({ 
            message: "Food partner registered successfully", 
            data: {
            id: newFoodPartner._id,
            name: newFoodPartner.name,
            email: newFoodPartner.email,
            phone: newFoodPartner.phone,
            address: newFoodPartner.address,
            contactName: newFoodPartner.contactName,
        } ,            
        token: token,
    });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const loginFoodPartner = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({ message: "All fields are required" });
        
        const foodPartner = await foodPartnerModel.findOne({ email }).select("+password");

        if (!foodPartner) return res.status(400).json({ message: "Food partner not found" });

        const isPasswordMatch = await bcrypt.compare(password, foodPartner.password);

        if (!isPasswordMatch) return res.status(400).json({ message: "Invalid password" });

        const token =  jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, {
            httpOnly: true,
        });

        return res.status(200).json({
            message: "Food partner logged in successfully", 
            data:{
                id: foodPartner._id,
                name: foodPartner.name,
                email: foodPartner.email,
            },
            token: token,
        
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const logoutFoodPartner = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Food partner logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const getFoodPartnerById = async (req, res) => {
    try{
        const foodPartnerId = req.params.id;
        const foodPartner = await foodPartnerModel.findById(foodPartnerId);
        const foodItemByFoodPartner = await FoodModel.find({
            foodPartnerId: foodPartnerId
        })


        if(!foodPartner){
            return res.status(404).json({ message: "Food partner not found" });
        }
        return res.status(200).
        json({
             message: "Food partner found successfully", 
             foodPartner:{
                ...foodPartner.toObject(),
                foodItems: foodItemByFoodPartner
             }
            });

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};



module.exports = { registerFoodPartner, loginFoodPartner, logoutFoodPartner,getFoodPartnerById };   
