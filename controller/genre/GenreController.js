import GenreSchema from "../../model/GenreModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/genre");
    },
    filename: function (req, file, cb) {
      const image = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, image);
    },
});

const handelMultipartData = multer({
    storage,
    limits: { fileSize: 100000000 * 5 },
}).single("logo");

const GenreController = {
    async AddGenre(req,res,next){
        handelMultipartData(req,res, async(error)=>{
            if (error) {
                console.log(error);
            }
            const name = req.body.name;

            if (!req.file) {
                return res.status(501).json({msg:"Logo is required"});
            }

            const logo = req.file.path;

            try {
                const data = new GenreSchema({
                    name,
                    logo
                });

                const savepost = await data.save();
                if(!savepost){
                    return res.status(501).json({msg:"Validation Failed"});
                }

                return res.status(200).json({msg:"Genre Added Successfully"});

            } catch (error) {
                return res.status(500).json(error);
            }
        })
    },

    async ViewGenre(req,res,next){
        try {
            const genre = await GenreSchema.find();
            return res.status(200).json(genre);
        } catch (error) {
           next(error);
        }
    },

    async UpdatePost(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            if(error){
                console.log(error);
            }

            const id = req.params.id;
            const name = req.body.name;
            let filepath;

            if(req.file){
                const data = GenreSchema.findById({_id:id});
                fs.unlink(`${appRoot}/${data.logo}`, (error) => {
                    console.log("image deleted");
                });

                filepath = req.file.path;
            }

            try {
                const update = await GenreSchema.findByIdAndUpdate({
                    _id:id
                },{
                    name,
                    logo:filepath,
                },{new:true});
                if(!update){
                    return res.status(500).json({msg:"Not updated"});
                }
                return res.status(200).json({msg:"Genre Updated"});
            } catch (error) {
                next(error);
            }

        })
    },

    async DeleteGenre(req,res,next){
        const id = req.body.id;
        const data = await GenreSchema.findById({_id:id});
        console.log(data);
        fs.unlink(`${appRoot}/${data.logo}`, (error) => {
            console.log("image deleted");
        });

        try {
            await GenreSchema.findByIdAndDelete({ _id: id });
            res.status(200).json({ msg: "Genre deleted successfully." });
        } catch (error) {
            next(error);
        }
    },

    async ViewGenreById(req,res,next){
        const id = req.params.g_id;
        try {
            const genre = await GenreSchema.findById({_id:id});
            console.log(genre);
            return res.status(200).json(genre);
        } catch (error) {
           next(error);
        }
    }
}

export default GenreController;