import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    poster:{type:String, required:true},
    thumbnail:{type:String, required:true},
    duration:{type:Number, required:true},
    genre:{type:String, required:true},
    language:{type:String, required:true},
    channel:{type:String, required:true},
    movie:{type:String, required:true},
    age:{type:String, required:true},
},{timestamps:true});

export default mongoose.model("Movie",MovieSchema);