import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Filter from '../../components/Filter/Filter'
import Catalogue from '../../components/Catalogue/Catalogue'
import Modal from '../../components/Modal/Modal'

import { doFetchCatalogue } from '../../actions/actions'
import { categories } from '../../data'

import styles from './Dash.module.css'

const Dash = () => {
    const dispatch = useDispatch()
    const { loading, data, error } = useSelector(state => state.catalogueState)

    const [ filter, setFilter ] = useState('ALL')
    const [ movies, setMovies ] = useState([])
    const [ series, setSeries ] = useState([])
    const [ anime, setAnime ] = useState([])
    const [ showData, setShowData] = useState(false)
    const [ modal, setModal ] = useState({
        status: false,
        state: '',
        data: null
    })

    useEffect(() => {
        dispatch(doFetchCatalogue())
    }, [dispatch])

    useEffect(() => {
        if(!data) {
            return
        }

        const moviesList = data.filter(item => item.type === 'MOVIE')
        const seriesList = data.filter(item => item.type === 'SERIES')
        const animeList = data.filter(item => item.type === 'ANIME')

        setMovies(moviesList)
        setSeries(seriesList)
        setAnime(animeList)

        setShowData(true)
    }, [data])

    const modalHandler = (status, state, data = null) => {
        setModal({ status: status, state: state, data: data })
    }

    const filterHandler = (filterMedia) => {
        if(filterMedia === filter) {
            setFilter('ALL')
            return
        }

        setFilter(filterMedia)
    }


    return (
        <>
        <div className={styles.DashWrapper}>
            <div className={styles.FilterContainer}>
                {
                    categories.map(filter => <Filter key={filter.id} filterClicker={filterHandler}>{filter}</Filter>)
                }
            </div>
            {
                ( filter === 'ALL' || filter === 'MOVIES' )
                && <div><h1>Movies</h1>{showData ? <Catalogue modalClicker={modalHandler}>{movies}</Catalogue> : loading && !showData && 'loading'}</div>
            }
            {
                ( filter === 'ALL' || filter === 'WEB SERIES' )
                && <div><h1>Web Series</h1>{showData ? <Catalogue modalClicker={modalHandler}>{series}</Catalogue> : loading && !showData && 'loading'}</div>
            }
            {
                (filter === 'ALL' || filter === 'ANIME')
                &&
                <div><h1>Anime</h1>{showData ? <Catalogue modalClicker={modalHandler}>{anime}</Catalogue> : loading && !showData && 'loading'}</div>
            }
        </div>
        {
            modal.status && modal.state === 'MEDIA_INFO_MODAL' && <Modal modalClicker={modalHandler}>{modal.data}</Modal>
        }
        </>
    )
}

export default Dash