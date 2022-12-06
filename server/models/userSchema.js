import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});

userSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,12)
    this.cpassword = await bcrypt.hash(this.cpassword,12)
    next()
})

const userDB = mongoose.model('users',userSchema);

export default userDB;