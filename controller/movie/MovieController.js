import MovieSchema from "../../model/MovieModel";
import GenreSchema from "../../model/GenreModel";
import multer from "multer";
import fs from "fs";
import path from "path";



const MovieController = {
    async AddMovie(req, res, next){
        const {title,duration,description,channel,genre,language,poster,thumbnail,movie,age} = req.body;
        try {
            const data = new MovieSchema({
                title,
                description,
                channel,
                genre,
                language,
                poster,
                thumbnail,
                duration,
                movie,
                age
            });
            const savemovie = await data.save();
            if(savemovie){
                return res.status(200).json({msg:"Movie uploaded successfully"});
            }else{
                return res.status.json({msg:"Movie not uploaded"});
            }
        } catch (error) {
            next(error);
        }
    },


    async ViewMovie(req,res,next){
        try {
            const movie = await MovieSchema.find();
            return res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    },

    async UpdateMovie(req,res,next){
        const {title,description,channel,genre,language,poster,thumbnail,movie,duration,age} = req.body;
        const id = req.params.id;
        try {
            const update = await MovieSchema.findByIdAndUpdate({
                _id:id
            },{
                title,
                description,
                channel,
                genre,
                language,
                poster,
                thumbnail,
                movie,
                duration,
                age
            },{new:true});
            if(!update){
                return res.status(500).json({msg:"Not updated"});
            }
            return res.status(200).json({msg:"Movie Updated"});
        } catch (error) {
            next(error);
        }
    },

    async DeleteMovie(req,res,next){
        const id = req.body.id;
        // console.log(req.body);
        try {
            await MovieSchema.findByIdAndDelete({_id:id});
            return res.status(200).json({msg:"Movie deleted successfully"});
        } catch (error) {
            next(error);
        }
    },

    async MovieDetails(req,res,next){
        const id = req.body.id;
        try {
            const movie = await MovieSchema.find({_id:id});
            return res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    },

    async MovieByGenre(req,res,next){
        const genre = req.params.id;
        try{
            const movie = await MovieSchema.find({genre:genre});
            return res.status(200).json(movie);
        }catch(error){
            next(error);
        }
    },

    async MovieByLanguage(req,res,next){
        const lan = req.params.id;

        try {
            const movie = await MovieSchema.find({language:lan});
            return res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    },

    async MovieByChannel(req,res,next){
        const ch = req.params.id;

        try {
            const movie = await MovieSchema.find({language:lan});
            return res.status(200).json(movie);
        } catch (error) {
            next(error);
        }
    },

    async MovieByGenreName(req,res,next){
        const name = req.params.name;
        try {
            const genre = await GenreSchema.find({name:name});
            // console.log(genre[0]._id);
            const genre_id = genre[0]._id;
            // console.log(genre_id);
            const movies = await MovieSchema.find({genre:genre_id});
            return res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    },

    async TotalMovie(req,res,next){
        try {
            const num = await MovieSchema.find().countDocuments();
            // console.log(num);
            return res.status(200).json(num);
        } catch (error) {
            next(error);
        }
    },


}

export default MovieController;
