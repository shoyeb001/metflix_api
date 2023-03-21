import dotenv from "dotenv";
dotenv.config();

export const {PORT,DB_URL, APIKEY, AUTHDOMAIN, PROJECTID, STORAGE, MSID, APPID, JWT_SECRET} = process.env;
