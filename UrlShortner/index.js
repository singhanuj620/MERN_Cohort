const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require("body-parser")

app.use(bodyParser.json())


app.post("/short", (req,res) => {
    res.json({
        msg : "Working route"
    })
})

app.listen(process.env.PORT, () => {
    console.log('🚀🚀 Server running on : ', process.env.PORT)
})