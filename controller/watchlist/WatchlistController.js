import WatchlistSchema from "../../model/WatchlistModel";

const WatchlistController = {
    async AddWatchlist(req,res,next){
        const {user_id,movie_id} = req.body;
        try {
            const userdata = await WatchlistSchema.find({user_id:user_id , movie_id:movie_id});
            console.log(userdata);
            if (userdata.length!=0) {
                return res.status(200).json({msg:"Already added to watchlist"})
            }
            // const watchlist = userdata;
            // for(let i=0;i<watchlist.length;i++){
            //    if (watchlist[i].movie_id==movie_id) {
            //     return res.status(200).json({msg:"Already added to watchlist"})
            //    }
            // }
            const data = new WatchlistSchema({
                user_id,
                movie_id
            });
            const savedata = await data.save();
            if(savedata){
                return res.status(200).json({msg:"Added to watchlist"});
            }else{
                return res.status.json({msg:"Error"});
            }
        } catch (error) {
            next(error);
        }
    },
    async ViewWatchlist(req,res,next){
        const id = req.params.id;
        try {
            const movies = await WatchlistSchema.find({user_id:id});
            return res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    },
    async DeleteWatchlist(req,res,next){
        const user_id = req.params.id;
        const movie_id = req.params.movie_id;
        try {
            const watchlist = await WatchlistSchema.findOneAndDelete({user_id:user_id , movie_id:movie_id});
            if (watchlist) {
                return res.status(200).json({msg:"movie removed from watchlist"});
            }
        } catch (error) {
           next(error) 
        }
    },
}

export default WatchlistController;