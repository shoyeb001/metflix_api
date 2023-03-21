import express from "express";
import connection from "./utils/connection.js";
import {PORT} from "./config/index.js";
import routes from "./routes/routes";
import cros from "cors";
import path from "path";
import cookieParser from "cookie-parser";




global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cookieParser());
app.use(cros());
app.use(express.urlencoded({ extended: false})); // used for understand img
app.use(express.json());
app.use(routes);
app.use(express.static(__dirname));

app.listen(PORT, 
    async()=>{
        console.log(`Lesting to port ${PORT}`);
        await connection();
    }
);