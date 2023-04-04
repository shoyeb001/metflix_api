import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
    user_id:{type:String, required:true},
    movie_id:{type:String, required:true},
},{
    timestamps:true
});

export default mongoose.model("Watchlist",WatchlistSchema);