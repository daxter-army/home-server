import React from 'react'

import styles from './Filter.module.css'

const Filter = ({ children, filterClicker }) => {
  return (
    <div onClick={() => {filterClicker(children.filter.toUpperCase())}} className={styles.FilterWrapper} style={{backgroundImage: `url(${children.poster})`}}><p>{children.filter}</p></div>
  )
}

export default Filter