const PORTREDIS = process.env.PORT || 6379;
const redis = require("redis");
const client = redis.createClient();
const ConnectRedis = async function () {
  try {
    let connect = await client.connect();
  } catch (e) {
    console.log(e);
  }
};

const SetValueToRedis = async function (key, value) {
  await client.set(key, JSON.stringify(value));
};

const GetValueOnRedis = async function (req, res, next) {
  let key = req.originalUrl;
  console.log(key);
  try {
    console.log("Getting data");
    const value = await client.get(key);
    if (value) {
      console.log("Getting cache");
      res.json(JSON.parse(value));
    } else {
      console.log("No Cached", value);
      next();
    }
  } catch (e) {
    console.log("Errog Get Data redis", e);
    res.status(404).json(e);
    // throw new Error().message;
  }
};

// const get = (req, res, next) => {
//     let key = req.route.path;
//     redisClient.get(key, (error, data) => {
//       if (error) res.status(400).send(err);
//       if (data !== null) {
//         console.log("cached Getting")
//         res.status(200).send(JSON.parse(data));
//       }
//       else next();
//     });
//   };

module.exports = {
  redis,
  ConnectRedis,
  GetValueOnRedis,
  PORTREDIS,
  SetValueToRedis,
  client,
};
