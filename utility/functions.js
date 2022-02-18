const fs = require("fs")
const path = require('path')

function getCatalogue (baseDir) {
    let directories = fs.readdirSync(path.join(baseDir, 'database'))
    
    return videosList = directories.map(item => {
        let soberName = ''
        let type = ''
        
        if(item.includes('MOVIE')) {
            soberName = item.replace('MOVIE', '').trimEnd()
            type = 'MOVIE'
        }

        else if(item.includes('SERIES')) {
            soberName = item.replace('SERIES', '').trimEnd()
            type = 'SERIES'
        }

        else if(item.includes('ANIME')) {
            soberName = item.replace('ANIME', '').trimEnd()
            type = 'ANIME'
        }

        return {
            folderName : item,
            soberName: soberName,
            type: type
        }
    })
}

function getFolderMedia(folderDir) {
    let directories = fs.readdirSync(folderDir)

    return directories.map(item => {
        const fileName = item.split('.')
        const fileExtension = fileName[fileName.length - 1]

        if(fileExtension === 'srt' || fileExtension === 'vtt' || fileExtension === 'txt' || fileExtension === "md") {
            return { fileName: item, type: 'text' }
        }
        else {
            return { fileName: item, type: 'video' }
        }
    })
}

module.exports = {
    getCatalogue,
    getFolderMedia
}