import express from 'express'
import userDB from '../models/userSchema.js';
const router = express.Router();

router.post("/register",async(req,res)=>{
    const {fname,email,password,cpassword} = req.body
    if(!fname || !email || !password || !cpassword){
        res.status(422).json({'message':'Please Fill All The Blank Field...'})
    }else if(cpassword !== password){
        res.status(422).json({'message':'confirm password and password does not matched...'})
    }else{
        const finalUser = new  userDB({
            fname,email,password,cpassword
        })

        const saveData = await finalUser.save();
        res.status(201).json(saveData);
    }
})

export default router;