const express = require('express')
const memes = require("random-memes");
const cors = require("cors")
const bodyParser = require("body-parser")
const fetch = require("node-fetch")
const YoutubeMusicApi = require('youtube-music-api')

const YT = new YoutubeMusicApi()

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


app.get("/music/search/:keyword", (req, res) => {
    let { keyword } = req.params;

    YT.initalize()
        .then(async (info) => {
            let songs = await YT.search(keyword, "song")

            let songsData = {};
            let songsWorld = []
            songs.content.forEach(data => {
                songsData["videoId"] = data.videoId,
                    songsData["name"] = data.name,
                    songsData["artist"] = data.artist.name,
                    songsData["thumbnails"] = data.thumbnails[1].url

                songsWorld.push(songsData);
                return songsWorld
            });



            res.json({ songs: songsWorld })
        })

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})