import express from 'express'
const app = express()
import bodyParser from 'body-parser'

app.use(bodyParser.json())

app.get("/dgenx", (req,res) => {
    return res.json({
        msg : "Hello"
    })
})

app.post("/shadow", (req,res) => {
    const {username, password} = req.body
    console.log(username, password)
    return res.json({
        username: username,
        password,
        msg: "data mill gaya"
    })
})

app.listen(3000, () => {
    console.log('🚀🚀 Server is running on port 3000')
})
