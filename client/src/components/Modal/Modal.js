import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { doFetchMedia } from '../../actions/actions'
import {GrClose} from 'react-icons/gr'
import {MdOutlineSlowMotionVideo} from 'react-icons/md'

import Poster from '../../assets/avengers.jpg'

import styles from './Modal.module.css'

const Modal = ({ children, modalClicker }) => {
    const dispatch = useDispatch()

    const { loading, data, error } = useSelector(state => state.mediaState)

    useEffect(() => {
        dispatch(doFetchMedia(children.folderName))
    }, [children, dispatch])

    const modalContentStyles = {
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${Poster}) no-repeat center`,
        backgroundSize: 'cover'
    }
  
    return (
        <div className={styles.ModalWrapper}>
            <div className={styles.ModalContent} style={modalContentStyles}>
                <div className={styles.ModalHeader}>
                    <h1>{children.soberName}</h1>
                    <button className={styles.ModalCloseIcon} onClick={() => {modalClicker(false, '')}}>
                        <GrClose />
                    </button>
                </div>
                <div className={styles.Files}>
                    <h2>Files</h2>
                    <div className={styles.FilesContainer}>
                        {
                            loading ? 'loading' : error ? 'Error in fetching... Try again' : data.map((file,index) => {
                                if(file.type === 'video') {
                                    return <Link key={index} className={styles.FileLink} to={`/play?folder=${children.folderName}&file=${file.fileName}`}><MdOutlineSlowMotionVideo size={16}/>{' '}{file.fileName}<br/></Link>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <a href="#" className={styles.ModalBackdrop} onClick={() => {modalClicker(false, '')}}></a>
        </div>
    )
}

export default Modal