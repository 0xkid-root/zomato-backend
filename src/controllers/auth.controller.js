const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const registerUser = async(req,res)=>{
    try{
        const {fullName,email,password} = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const isUserAlreadyExists = await userModel.findOne({email});
        if(isUserAlreadyExists) return res.status(400).json({message:"User already exists"});

        // password hasing here
        const hashedPassword = await bcrypt.hash(password,10); 

        const user = await userModel.create(
            {
            fullName,
            email,
            password:hashedPassword
          }
        );
        const token = jwt.sign(
            {
                id:user._id

            }, process.env.JWT_SECRET, {expiresIn:'1d'}
        ) 
        res.cookie("token",token,{httpOnly:true});

         


        return res.status(201)
        .json({message:"User registered successfully"});


    }catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }

}

const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await userModel.findOne({
            email
        }).select("+password");//passowrd isliye dala kyu ke sechma me false kar rakha hai isliye opassword aaye ga he nhi or me nefhe passowrd ko compare vkrna  hai 

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({
            id:user._id
        }, process.env.JWT_SECRET, {expiresIn:'1d'}
        );
        res.cookie("token",token,{httpOnly:true})
        return res.status(200).json({
            message:"Login successful",
            data:{
                name:user.fullName,
                email:user.email
            },
            token:token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }
}

module.exports={
    registerUser,
    loginUser
}