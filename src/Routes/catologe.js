const express = require("express");
const routes = express.Router();
const cheerio = require("cheerio");
const request = require("request-promise");
const {
  GetValueOnRedis,
  SetValueToRedis,
  ConnectRedis,
} = require("../redis/redis");

routes.get("/", GetValueOnRedis, (req, res) => {
  console.log(req.originalUrl);
  request("https://ophim.tv/danh-sach/phim-bo", (err, respones, html) => {
    if (!err && respones.statusCode === 200) {
      const $ = cheerio.load(html); // load HTML
      let i = 0,
        Result = [];
      //   console.log($('form .hidden .p-2 select:nth-child(1)').text())
      //   return
      $("form .hidden .p-2 select:nth-child(1)").each((index, ele) => {
        // const select = $(ele).find("select");
        let resutlGot = [];
        $(ele)
          .find("option")
          .each((idx, elein) => {
            // i++
            // console.log($(elein).text())
            const obj = {
              name: $(elein).text(),
              href: $(elein).attr("value"),
            };
            resutlGot.push(obj);
          });
        Result.push(resutlGot);
        i++;
      });
      SetValueToRedis(req.originalUrl, {
        name: "fliterCatologe",
        data: Result,
      });
      // console.log(i)
      res.json({
        name: "fliterCatologe",
        data: Result,
      });
    } else {
      console.log(err);
      res.json(err);
    }
  });
});
// const FitlerCatologeCrawl = function (req, res) {};

module.exports = routes;
