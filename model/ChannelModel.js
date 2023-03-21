import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({
    name:{type:String, required:true, maxlength:100},
    logo:{type:String, required:true},
    language:{type:String,required:true}
},{timestamps:true});

export default mongoose.model("Channel",ChannelSchema);

