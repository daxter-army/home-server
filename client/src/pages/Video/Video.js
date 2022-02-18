import React from 'react'
import { useSearchParams } from 'react-router-dom'

import styles from './Video.module.css'

const Video = () => {

  const [ queryParams, setQueryParams ] = useSearchParams()

  if(!(queryParams.get('folder') && queryParams.get('file'))) {
    console.log('invalid url')
  }

  const videoTypeHandler = (videoName) => {
    const temp = videoName.split(".")
    const videoExtension = temp[temp.length - 1]

    if(videoExtension === 'mkv') {
      console.log('WEBM')
      return 'webm'
    }

    console.log('MP4')
    return 'mp4'
  }

  return (
    <div className={styles.VideoWrapper}>
        <video className={styles.VideoPlayer} controls autoPlay={true}>
            <source src={`http://localhost:5000/stream?folder=${queryParams.get('folder')}&file=${queryParams.get('file')}`} type={`video/${videoTypeHandler(queryParams.get('file'))}`}/>
        </video>
    </div>
  )
}

export default Video