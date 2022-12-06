import express from "express";
import Connection from './db/conn.js';
import dotenv from 'dotenv';
import cors from 'cors'
import router from './routes/router.js';

const app = express();
app.use(express.json()) // we can pass data from fronted in form of json
app.use(cors())
app.use(router)

const PORT = 8000;
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username,password);
app.listen(PORT,()=>{
    console.log(`Server Is Running On :  ${PORT}`)
})