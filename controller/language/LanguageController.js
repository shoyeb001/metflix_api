import LanguageSchema from "../../model/LanguageModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/language");
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

const LanguageController = {
     async AddLanguage(req,res,next){
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
                const data = new LanguageSchema({
                    name,
                    logo
                });

                const savepost = await data.save();
                if(!savepost){
                    return res.status(501).json({msg:"Validation Failed"});
                }

                return res.status(200).json({msg:"Language Added Successfully"});

            } catch (error) {
                return res.status(500).json(error);
            }
        })
    },

    async ViewLanguage(req,res,next){
        try {
            const language = await LanguageSchema.find();
            return res.status(200).json(language);
        } catch (error) {
           next(error);
        }
    },

    async UpdateLanguage(req,res,next){
        handelMultipartData(req,res,async(error)=>{
            if(error){
                console.log(error);
            }

            const l_id = req.params.id;
            const name = req.body.name;
            let filepath;

            if(req.file){
                const data = LanguageSchema.findById({_id:l_id});
                fs.unlink(`${appRoot}/${data.logo}`, (error) => {
                    console.log("image deleted");
                });

                filepath = req.file.path;
            }

            try {
                const update = await LanguageSchema.findByIdAndUpdate({
                    _id:l_id
                },{
                    name,
                    logo:filepath,
                },{new:true});
                if(!update){
                    return res.status(500).json({msg:"Not updated"});
                }
                return res.status(200).json({msg:"Language Updated"});
            } catch (error) {
                next(error);
            }

        })
    },

    async DeleteLanguage(req,res,next){
        const id = req.body.id;
        const data = await LanguageSchema.findById({_id:id});
        fs.unlink(`${appRoot}/${data.logo}`, (error) => {
            console.log("image deleted");
        });

        try {
            await LanguageSchema.findByIdAndDelete({ _id: id });
            return res.status(201).json({ msg: "Language deleted successfully." });
        } catch (error) {
            next(error);
        }
    },

    async ViewLanguageById(req,res,next){
        const id = req.params.lan_id;
        try {
            const lan = await LanguageSchema.findById({_id:id});
            return res.status(200).json(lan);
        } catch (error) {
            next(error);
        }
    }
}

export default LanguageController;