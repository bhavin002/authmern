import express from 'express'
import userDB from '../models/userSchema.js';
const router = express.Router();
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body
    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ 'message': 'Please Fill All The Blank Field...' })
    } else if (cpassword !== password) {
        res.status(422).json({ 'message': 'confirm password and password does not matched...' })
    } else {
        const finalUser = new userDB({
            fname, email, password, cpassword
        })

        const saveData = await finalUser.save();
        res.status(201).json({ status: 201, saveData });
    }
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ 'message': 'Please Fill All The Blank Field...' })
    }
    try {
        const userValid =   await userDB.findOne({email:email})
        if(userValid){
            const isMatch = await bcrypt.compare(password,userValid.password)
            if(!isMatch){
                res.status(422).json({ 'message': 'Invalid Details' })
            }else{
                const token = await userValid.genrateAuthtoken();

                res.cookie("userAuthCookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }
    } catch (error) {
        
    }
})

export default router;