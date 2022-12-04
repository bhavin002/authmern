import express from "express";
const app = express();
const PORT = 8000;
app.get("/",(req,res)=>{
    res.status(201).json("Server Is Created")
})
app.listen(PORT,()=>{
    console.log(`Server Is Running On :  ${PORT}`)
})