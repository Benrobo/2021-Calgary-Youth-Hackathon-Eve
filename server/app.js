const express = require('express')
const memes = require("random-memes");
const cors = require("cors")
const bodyParser = require("body-parser")
const fetch = require("node-fetch")

const app = express()

const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/memes/random", async (req, res) => {
    // return getRandomMemes()
    let GenMemes = await memes.random();
    res.json(GenMemes)
})

app.get("/jokes/random", async (req, res) => {
    // return getRandomMemes()
    let request = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            'Accept': 'application/json'
        }
    });
    let jokes = await request.json()
    res.json(jokes)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})