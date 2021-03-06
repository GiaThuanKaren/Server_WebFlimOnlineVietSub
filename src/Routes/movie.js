const express = require("express");
const { GetValueOnRedis, SetValueToRedis, ConnectRedis } = require("../redis/redis");
const routes = express.Router();
const axious = require("axios").default;
ConnectRedis();
routes.get("/lastest", GetValueOnRedis, async (req, res) => {
  console.log(
    req.query.page,
    `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${
      req.query.page ? req.query.page : 1
    }`
  );
  try {
    let result = await axious.get(
      `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${
        req.query.page ? req.query.page : 1
      }`
    );
    SetValueToRedis(req.originalUrl, result.data);
    res.send(result.data);
  } catch (e) {
    res.json(e);
  }

  // console.log(result.data)
});

routes.get("/list", GetValueOnRedis, async (req, res) => {
  let queryDS = req.query.ds ? req.query.ds : "phim-moi";
  let page = req.query.page;
  try {
    // let getFilterCatologe = await axious.get("http://localhost:5000/fliterlist")
    // let check =getFilterCatologe.data.data[1];
    // console.log(check)
    let ListMovieBySlug = await axious.get(
      `https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/${queryDS}.json?slug=${queryDS}&page=${
        page ? page : 1
      }`
    );
    console.log("Respone" ,req.originalUrl);
    SetValueToRedis(req.originalUrl, ListMovieBySlug.data.pageProps.data),
      // console.log(ListMovieBySlug.data);
      res.send(ListMovieBySlug.data.pageProps.data);
  } catch (e) {
    res.json(e);
  }
});

routes.get("/gender",GetValueOnRedis, async (req, res) => {
  let gender = req.query.gender;
  let page = req.query.page;
  // console.log(req);
  let ds = req.query.ds;
  try {
    console.log(
      `https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/${
        ds ? ds : "phim-moi"
      }.json?slug=${
        ds ? ds : "phim-moi"
      }&sort_field=_id&category=${gender}&country=&year=&page=${
        page ? page : 1
      }`
    );
    let respone = await axious.get(
      `https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/${
        ds ? ds : "phim-moi"
      }.json?slug=${
        ds ? ds : "phim-moi"
      }&sort_field=_id&category=${gender}&country=&year=&page=${
        page ? page : 1
      }`
    );
    let data = respone.data;
    SetValueToRedis(req.originalUrl,data)
    res.send(data);
  } catch (e) {
    res.status(404).json(e);
  }
  // https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/danh-sach/phim-moi.json?slug=phim-moi&sort_field=_id&category=hanh-dong&country=&year=
});
routes.get("/:slug",GetValueOnRedis, async (req, res) => {
  console.log(req.params.slug);
  try {
    let respone = await axious.get(
      `https://ophim1.com/phim/${req.params.slug}`
    );
    SetValueToRedis(req.originalUrl,respone.data)
    res.json(respone.data);
  } catch (e) {
    console.log(e, 10);
    res.status(404).json(e);
  }
});
module.exports = routes;
