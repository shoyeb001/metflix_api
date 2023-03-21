import ChannelSchema from "../../model/ChannelModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/channel");
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

const ChannelController = {
    async AddChannel(req,res,next){
        handelMultipartData(req,res, async(error)=>{
            if (error) {
                console.log(error);
            }
            const {name,language} = req.body;

            if (!req.file) {
                return res.status(501).json({msg:"Logo is required"});
            }

            const logo = req.file.path;

            try {
                const data = new ChannelSchema({
                    name,
                    language,
                    logo
                });

                const savepost = await data.save();
                if(!savepost){
                    return res.status(501).json({msg:"Validation Failed"});
                }

                return res.status(200).json({msg:"Channel Added Successfully"});

            } catch (error) {
                // return res.status(500).json(error);
                next(error);
            }
        })
    },

    async ViewChannel(req,res,error){
        try {
            const channel = await ChannelSchema.find();
            return res.status(200).json(channel);
        } catch (error) {
           next(error);
        }
    },

    async ViewChannelById(req,res,next){
        const id = req.params.ch_id;
        // console.log(req.body);
        try {
            const channel = await ChannelSchema.find({_id:id});
            return res.status(200).json(channel);
        } catch (error) {
            next(error);
        }
    },

    async UpdateChannel(req,res,error){
        handelMultipartData(req,res,async(error)=>{
            if(error){
                console.log(error);
            }

            const id = req.params.id;
            const {name,language} = req.body;
            let filepath;

            if(req.file){
                const data = ChannelSchema.findById({_id:id});
                fs.unlink(`${appRoot}/${data.logo}`, (error) => {
                    console.log("image deleted");
                });

                filepath = req.file.path;
            }

            try {
                const update = await ChannelSchema.findByIdAndUpdate({
                    _id:id
                },{
                    name,
                    language,
                    logo:filepath,
                },{new:true});
                if(!update){
                    return res.status(500).json({msg:"Not updated"});
                }
                return res.status(200).json({msg:"Channel Updated"});
            } catch (error) {
                next(error);
            }

        })
    },

    async DeleteChannel(req,res,next){
        const id = req.body.id;
        const data = await ChannelSchema.findById({_id:id});
        fs.unlink(`${appRoot}/${data.logo}`, (error) => {
            console.log("image deleted");
        });

        try {
            await ChannelSchema.findByIdAndDelete({ _id: id });
            res.status(200).json({ msg: "Channel deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ChannelController;