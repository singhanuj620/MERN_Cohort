import express from 'express'
import dotenv from 'dotenv'
import bodyParser from "body-parser"
import mongoose from 'mongoose';
import {UrlShortner} from './Model/urlShortnerModel.js';
import { User } from './Model/userModel.js';
import { nanoid } from 'nanoid'
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"

const app = express()
dotenv.config()
app.use(bodyParser.json())

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('🚀🚀 DB Connected')
});

const verifyUser = (req,res,next) => {
    const {authorization} = req.headers
    try {
        if(!authorization) {
            return res.status(404).json({
                msg: "please send jwt token"
            })
        }
        jwt.verify(authorization, process.env.JWT_SECRET)
        next()
    } catch(err){
        console.log(err)
        return res.status(404).json({
            msg: "UnAuthorized. Please login again"
        })
    }
}


app.post("/short", verifyUser, async (req,res) => {
    const {longUrl} = req.body
    const newShortUrlUrlShortner = new UrlShortner({
        longUrl,
        shortUrl: nanoid(),
        hits: 0
    })
    const data = await newShortUrlUrlShortner.save()
    return res.status(200).json({
        data : {
            id : data._id,
            shortUrl: data.shortUrl,
            longUrl: data.longUrl
        }
    })
})

app.get("/geturl/:shortUrl",verifyUser, async (req,res) => {
    const {shortUrl} = req.params
    const findLongUrl = await UrlShortner.findOne({shortUrl})
    console.log(findLongUrl)
    return res.status(200).json({
        data : findLongUrl
    })
})

app.post("/signup", async (req,res) => {
    const {username, password} = req.body
    const encryptPass = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
    const newUser = new User({username, password: encryptPass, url:[]})
    await newUser.save()
    return res.status(200).json({
        username
    })
})

app.post("/login", async (req,res) => {
    const {username, password} = req.body
    if(!username || !password) {
        return res.status(404).json({
            msg: "Enter credentials"
        })
    }
    const findUser = await User.findOne({username})
    if(!findUser){
        return res.status(404).json({
            msg: "No such user with username is found"
        })
    }

    const decryptPass = CryptoJS.AES.decrypt(findUser.password, process.env.CRYPTO_SECRET).toString(CryptoJS.enc.Utf8);
    if(password !== decryptPass){
        return res.status(404).json({
            msg: "Incorrect password"
        })
    }

    const jwtToken = jwt.sign({
        username,
        url: []
    }, process.env.JWT_SECRET)

    res.cookie("jwtToken", jwtToken)
    return res.status(200).json({
        username,
        jwtToken
    })
})

app.listen(process.env.PORT, () => {
    console.log('🚀🚀 Server running on : ', process.env.PORT)
})