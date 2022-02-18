import React from 'react'

import styles from './Catalogue.module.css'

const Catalogue = ({ children, modalClicker }) => {

    const movieHandler = (media) => {
        modalClicker(true, 'MEDIA_INFO_MODAL', media)
    }

  return (
    <div className={styles.CatalogueWrapper}>
        {
            children.map((media, index) => {
                return <div key={index} className={styles.MediaItem} onClick={() => {movieHandler(media)}}>{media.soberName}</div>
            })
        }
    </div>
  )
}

export default Catalogue