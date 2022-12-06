import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
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
const secretKey = "hellodevelopersiambhavinvasavada"
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.cpassword,12)
    }
    next()
})

userSchema.methods.genrateAuthtoken = async function (){
    try {
        let jwtToken = jwt.sign({_id:this._id},secretKey,{
            expiresIn:'1d'
        });
        this.tokens = this.tokens.concat({token:jwtToken})
        await this.save()
        return jwtToken;
    } catch (error) {
        res.status(422).json(error)
    }
}

const userDB = mongoose.model('users',userSchema);

export default userDB;