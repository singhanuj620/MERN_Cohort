import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import {UrlShortner} from './Model/urlShortnerModel.js';
import { nanoid } from 'nanoid'

const app = express()
dotenv.config()
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('🚀🚀 DB Connected')
});


app.post("/short", async (req,res) => {
    const {longUrl} = req.body
    const newShortUrlUrlShortner = new UrlShortner({
        longUrl,
        shortUrl: nanoid(),
        hits: 0
    })
    const data = await newShortUrlUrlShortner.save()
    return res.json({
        data : {
            id : data._id,
            shortUrl: data.shortUrl,
            longUrl: data.longUrl
        }
    })
})

app.get("/geturl/:shortUrl", async (req,res) => {
    const {shortUrl} = req.params
    const findLongUrl = await UrlShortner.findOne({shortUrl})
    console.log(findLongUrl)
    return res.json({
        data : findLongUrl
    })
})

app.listen(process.env.PORT, () => {
    console.log('🚀🚀 Server running on : ', process.env.PORT)
})