import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
     email: {
      type: String,
      required: true,
      unique: true,   
    },
    username: { type: String, unique: true, sparse: true }, // optional
    password:String,
}

,{timestamps:true}
 
);
export default mongoose.model("account", userSchema)