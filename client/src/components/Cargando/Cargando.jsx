import React from 'react'
import styles from "./Cargando.module.css"
import loadingImg from "../../img/loading.png"

const Cargando = () => {
  return (
    <div className={styles.cargando}>
        <img src={loadingImg}/>
    </div>
  )
}

export default Cargando