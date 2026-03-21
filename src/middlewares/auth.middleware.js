const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodpartner.model");


async function authUserMiddleware(req, res, next) {
    try{
    let token ;
    // // from cookie se 
    // req.cookies.token yaha se token ko nikal rh hu me cookie me token store kara tha
    if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }
    //req.headers.authorization ye tab use hota hai jab frontend manually token vejta hai 
    else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
            if (!user) {
          return res.status(401).json({ message: "User not found" });
     }

        req.user= user;
        next();

    }catch(error){
        return res.status(401).json({message:"Invalid or expired token"});    }

}

async function authFoodPartnerMiddleware(req, res, next) {
    try{
        let token ;
        if(req.cookies && req.cookies.token){
            token = req.cookie.token;
        }
        else if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if (!foodPartner) {
          return res.status(401).json({ message: "Food partner not found" });
           }

        req.foodPartner= foodPartner;
        next();

    }catch(error){
        return res.status(401).json({message:"Invalid or expired token"});
    }


}


module.exports = {
    authUserMiddleware,authFoodPartnerMiddleware
}