import mongoose from "mongoose";

const Connection = async (username,password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.fx3nith.mongodb.net/authmern?retryWrites=true&w=majority`;
  try{
    await mongoose.connect(URL,{useUnifiedTopology: true,useNewUrlParser: true});
    console.log("Database Connection Successfully");
  }
  catch(error){
    console.log("Error While Connecting With The  Database ",error);
  }
}

export default Connection;