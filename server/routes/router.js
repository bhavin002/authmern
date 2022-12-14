import express from 'express'
import userDB from '../models/userSchema.js';
const router = express.Router();
import bcrypt from 'bcryptjs'
import userAuthMiddle from '../middleware/middleware.js';
import nodemailer from 'nodemailer'

// email config

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.EMAIL_PASSWORD
    }
})

router.post("/register", async (req, res) => {
    const { fname, email, password, cpassword } = req.body
    const unique = await userDB.findOne({email:email})
    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ 'message': 'Please Fill All The Blank Field...' })
    } else if (cpassword !== password) {
        res.status(422).json({ 'message': 'confirm password and password does not matched...' })
    } else if(unique){
        res.status(403).json({status:403,'message':'Please Enter Unique Email'})
    }
    else {
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
        if(!userValid){
            res.status(422).json({ 'message': 'Invalid Details' })
        }else{
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
        res.status(422).json(error)
    }
})

router.get("/validuser", userAuthMiddle,async(req,res) =>{
    try {
        const ValiduserOne = await userDB.findOne({_id:req.userId});
        res.status(201).json({status:201,ValiduserOne})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

router.get("/logout",userAuthMiddle,async(req,res) =>{
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curElem)=>{
            return curElem.token !== req.token
        })

        res.clearCookie("userAuthCookie",{path:"/"});
        req.rootUser.save();
        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

router.post('/sendlink',async (req,res) =>{
    const {email} = req.body;
    if(!email){
        res.status(401).json({status:401,message:'Please Enter The Email'})
    }
    try {
        const userfind = await userDB.findOne({email:email});
        console.log("userFind",userfind);
    } catch (error) {
        
    }
})

export default router;