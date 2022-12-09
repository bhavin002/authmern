import jwt from "jsonwebtoken";
import userDB from "../models/userSchema.js";



const userAuthMiddle = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const varifyUser = jwt.verify(token,process.env.SECRET_KEY);
        const rootUser = await userDB.findOne({_id:varifyUser._id})
        if(!rootUser){
            throw new Error("User Not Found");
        }
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next()
    } catch (error) {
        res.status(401).json({status:401,message:'token not provided'})
    }
}

export default userAuthMiddle;
