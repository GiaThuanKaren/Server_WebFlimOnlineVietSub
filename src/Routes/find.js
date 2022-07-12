const express = require('express');
const { GetValueOnRedis, SetValueToRedis } = require('../redis/redis');
const routes = express.Router();
const axios = require('axios').default

routes.get("/",GetValueOnRedis,async (req,res)=>{
    let keyword =req.query.keyword;
    console.log(keyword)
    const respone = await axios.get(`https://ophim.tv/_next/data/m5wySfMXDukfAvbiXTiQO/tim-kiem.json?keyword=${keyword}`)
    SetValueToRedis(req.originalUrl,respone.data)
    res.send(respone.data)
})

module.exports = routes