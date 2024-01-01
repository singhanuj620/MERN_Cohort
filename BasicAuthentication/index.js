const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")

app.use(bodyParser.json())

const allUsers = [
    {
    name: 'Anuj Singh',
    username: 'BapuBadmash',
    password: '123'
    },
    {
    name: 'Ayush Agnihotri',
    username: 'Dgenx',
    password: '456'
    },
    {
    name: 'Akshat Bharara',
    username: 'Shadow',
    password: '789'
    },
]

const verifyUser = (req,res,next) => {
    const {authorization} = req.headers
    try{
        const verifyJwtToken = jwt.verify(authorization, process.env.JWT_SECRET)
        next()
    }
    catch(err){
        console.log("error while verifying jwt token")
        console.log(err)
        return res.json({
            msg : "Unable to verify user"
        })
    }
}

app.get("/users", verifyUser, (req,res) => {
    return res.json({
        data : allUsers
    })
})

app.post("/signin", (req,res) => {
    const {username, password} = req.body
    if(!username || !password){
        return res.json({
            msg : "Enter credentials"
        })
    }
    const isUserExist = allUsers.find(ele => ele.username === username)
    if(isUserExist && isUserExist.password === password){
        const jwtToken = jwt.sign({username}, process.env.JWT_SECRET)
        res.cookie("jwtToken", jwtToken)
        return res.json({
            username,
            jwtToken
        })
    }
    else{
        return res.json({
            msg : "Invalid Credentials"
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log('🚀🚀 Server running on : ', process.env.PORT)
})