import React from 'react'
import styles from "./EtiquetaDieta.module.css"
const EtiquetaDieta = (props) => {

    function getNameClass(name){
        return name.replace(/\s/g,"_")
    }

  return (
    <div className={`${styles.etiquetaDieta} ${styles[getNameClass(props.nombre)]}`}>{props.nombre}</div>
  )
}

export default EtiquetaDieta