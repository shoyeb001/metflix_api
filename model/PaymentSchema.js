import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user_id:{type:String,required:true},
    transaction_id:{type:String, required:true},
    amount:{type:Number, required:true},
    plan:{type:Number, required:true},
},{timestamps:true});

export default mongoose.model("Payment",PaymentSchema);