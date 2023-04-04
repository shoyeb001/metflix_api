import express from "express";
const routes = express.Router();

import {LanguageController,GenreController,ChannelController, MovieController, UserController, WatchlistController} from "../controller/index";
// import heathCheckController from "../controller/Healthcheck";
import { verifyadmin, verifyfunction, verifyuser } from "../middleware/verifyToken";

routes.get("/", (req, res) => {
    res.json({
        msg: "This is ott api",
        author: "Sk Shoyeb",
        lisence: "MIT"
    })
});

// routes.get("/healthcheck",heathCheckController.healthCheck);

routes.post("/language/add/:id",verifyadmin, LanguageController.AddLanguage);
routes.get("/language/view/:id",verifyuser, LanguageController.ViewLanguage);
routes.put("/language/update/:id",verifyadmin, LanguageController.UpdateLanguage);
routes.delete("/language/delete/:id",verifyadmin,  LanguageController.DeleteLanguage);
routes.get("/language/details/view/:id/:lan_id",verifyadmin, LanguageController.ViewLanguageById);

//genre controller

routes.post("/genre/add/:id",verifyadmin, GenreController.AddGenre);
routes.get("/genre/view/:id", verifyuser, GenreController.ViewGenre);
routes.put("/genre/update/:id",verifyadmin, GenreController.UpdatePost);
routes.delete("/genre/delete/:id",verifyadmin, GenreController.DeleteGenre);
routes.get("/genre/details/view/:id/:g_id",verifyadmin,GenreController.ViewGenreById);

//channel routes

routes.post("/channel/add/:id",verifyadmin, ChannelController.AddChannel);
routes.get("/channel/view/:id",verifyuser, ChannelController.ViewChannel);
routes.get("/channel/detail/view/:id/:ch_id",verifyuser, ChannelController.ViewChannelById);
routes.put("/channel/update/:id",verifyadmin, ChannelController.UpdateChannel);
routes.delete("/channel/delete/:id",verifyadmin, ChannelController.DeleteChannel);

//movie controller

routes.post("/movie/add/:id",verifyadmin, MovieController.AddMovie);
routes.get("/movie/view/:id",verifyuser, MovieController.ViewMovie);
routes.get("/movies/view/latest/:id",verifyuser,MovieController.ViewLatestMovies);
routes.put("/movie/update/:id",verifyadmin, MovieController.UpdateMovie);
routes.delete("/movie/delete/:id",verifyadmin, MovieController.DeleteMovie);
routes.get("/movie/channel/:id",verifyuser, MovieController.MovieByChannel);
routes.get("/movie/genre/:id",verifyuser, MovieController.MovieByGenre);
routes.get("/movie/genre/:id/:name",verifyuser,MovieController.MovieByGenreName);
routes.get("/movie/language/:id",verifyuser, MovieController.MovieByLanguage);
routes.get("/movie/details/:id/:m_id",verifyuser, MovieController.MovieDetails);
routes.get("/movie/total/:id", verifyadmin, MovieController.TotalMovie);

//user controller

routes.post("/user/register",UserController.AddUserOne);
routes.post("/user/login",UserController.UserLogin);
routes.get("/user/view",verifyadmin, UserController.viewUsers);
routes.put("/user/update",verifyuser,UserController.updateUser);
routes.delete("/user/delete", verifyuser, UserController.deleteUser);
routes.get("/user/view/:id",verifyuser,UserController.viewUserById);
routes.get("/user/role/:id",UserController.GetUserRole);
routes.get("/user/total/:id",verifyadmin, UserController.TotalUser);
routes.get("/user/latest/:id",verifyadmin, UserController.LatestUser);

//watchlist controller

routes.post("/watchlist/add/:id",verifyuser, WatchlistController.AddWatchlist);
routes.get("/watchlist/view/:id",verifyuser, WatchlistController.ViewWatchlist);
routes.delete("/watchlist/delete/:id/:movie_id",verifyuser, WatchlistController.DeleteWatchlist);


export default routes;
