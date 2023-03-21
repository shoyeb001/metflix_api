import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:{type:String},
    language:{type:String},
    type:{type:String},
    status:{type:Boolean},
    valid:{type:Date}
},{timestamps:true});

export default mongoose.model("User",UserSchema);