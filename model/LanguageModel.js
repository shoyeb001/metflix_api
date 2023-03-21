import mongoose from "mongoose";

const LanguageSchema = new mongoose.Schema({
    name:{type:String, required:true},
    logo:{type:String,required:true},
},{timestamps:true});

export default mongoose.model("Language",LanguageSchema);