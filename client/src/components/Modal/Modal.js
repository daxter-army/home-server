import React, { useEffect, forwardRef } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { doFetchMedia } from '../../actions/actions'
import { GrClose } from 'react-icons/gr'
import {MdOutlineSlowMotionVideo} from 'react-icons/md'

import Poster from '../../assets/avengers.jpg'

import styles from './Modal.module.css'

const Modal = forwardRef(( props, ref ) => {
    const dispatch = useDispatch()

    const { loading, data, error } = useSelector(state => state.mediaState)

    useEffect(() => {
        dispatch(doFetchMedia(props.children.folderName))
    }, [props.children, dispatch])

    const modalContentStyles = {
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${Poster}) no-repeat center`,
        backgroundSize: 'cover'
    }

    // console.log(props.children)

    return (
        <div ref={ref} className={styles.ModalWrapper}>
            <div className={styles.ModalContent} style={modalContentStyles}>
                <div className={styles.ModalHeader}>
                    <h1>{props.children.soberName}</h1>
                    <button className={styles.ModalCloseIcon} onClick={() => {props.modalClicker(false, '', props.children)}}>
                        <GrClose />
                    </button>
                </div>
                <div className={styles.Files}>
                    <h2>Files</h2>
                    <div className={styles.FilesContainer}>
                        {
                            loading ? 'loading' : error ? 'Error in fetching... Try again' : data.map((file,index) => {
                                if(file.type === 'video') {
                                    return <Link key={index} className={styles.FileLink} to={`/play?folder=${props.children.folderName}&file=${file.fileName}`}><MdOutlineSlowMotionVideo size={16}/>{' '}{file.fileName}<br/></Link>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <a href="#" className={styles.ModalBackdrop} onClick={() => {props.modalClicker(false, '', props.children)}}></a>
        </div>
    )
})

export default Modal