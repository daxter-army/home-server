const express = require('express')
const path = require('path')
const fs = require('fs')
const { getCatalogue, getFolderMedia } = require('./utility/functions')

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get('/database', (req, res) => {
    console.log('here')
    if(req.query.folder) {
        try {
            const folderName = req.query.folder.trim()
            const folderContents = getFolderMedia(path.join(__dirname, 'database', folderName))

            res.status(200).send({
                mediaList: folderContents
            })
        }
        catch(error) {
            res.status(404).send({
                message: 'Media folder not found',
                error: error.code,
                folderName : req.query.folder.trim()
            })
        }
        
    }
    else {
        const listVideos = getCatalogue(__dirname)
        console.log(listVideos)
    
        res.status(200).send({
            catalogue: listVideos
        })
    }
})

app.get('/stream', function(req, res) {
    if(req.query.folder && req.query.file) {
       const videoPath = `database/${req.query.folder.trim()}/${req.query.file.trim()}`
       const fileSize = fs.statSync(videoPath).size
       const range = req.headers.range
        
       if (range) {
           const parts = range.replace(/bytes=/, "").split("-")
           const start = parseInt(parts[0], 10)
           const end = parts[1] ? parseInt(parts[1], 10) : fileSize-1
        
           const chunksize = (end-start)+1
           const file = fs.createReadStream(videoPath, {start, end})
           const head = {
               'Content-Range': `bytes ${start}-${end}/${fileSize}`,
               'Accept-Ranges': 'bytes',
               'Content-Length': chunksize,
               'Content-Type': 'video/mp4',
           }
        
           res.writeHead(206, head)
           file.pipe(res)
       } else {
   
           const head = {
               'Content-Length': fileSize,
               'Content-Type': 'video/mp4',
           }
   
           res.writeHead(200, head)
           fs.createReadStream(videoPath).pipe(res)
       }
    }
    else {
        res.status(400).send({
            message: 'Bad video address'
        })
    }
})

app.listen(5000, () => {
    console.log('Server is up on 5000')
})


// http://localhost:5000/stream?folder=Avengers%20Endgame%20MOVIE&file=Avengers.Endgame.2019.1080p.BluRay.x264-[YTS.LT].mp4