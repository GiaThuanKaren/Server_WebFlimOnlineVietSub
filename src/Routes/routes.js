const FitlerCatologeCrawl = require("./catologe");
const Movie = require("./movie");
const Find = require("./find");
const Routes = function (app) {
  app.use("/fliterlist", FitlerCatologeCrawl);
  app.use("/movie", Movie);
  app.use("/find", Find);
  app.use("/",(req,res)=>{
    res.send("Hi This Is Root Directory")
  })
};
module.exports = Routes;
