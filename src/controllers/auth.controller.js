const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');


const register = async(req,res)=>{
    try{
        const {fullName,email,password} = req.body;
        const isUserAlreadyExists = await userModel.findOne({email});
        if(isUserAlreadyExists) return res.status(400).json({message:"User already exists"});

        // password hasing here
        const hasedPasswd = await bcrypt.hash(password,10); 

        await userModel.create({fullName,email,
            password:hasedPasswd});

        return res.status(200)
        .json({message:"User registered successfully"});


    }catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }

}

module.exports={
    register
}