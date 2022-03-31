import React, { useState } from 'react'
import styles from "./Filtrados.module.css"
import FiltroOrden from "../FiltroOrden/FiltroOrden"
import FiltroTipoDieta from "../FiltroTipoDieta/FiltroTipoDieta"
import {switchFilterActivate} from "../../redux/actions/actions"
import { useDispatch } from 'react-redux'

const Filtrados = () => {
  const dispatch = useDispatch()
  let filtrosDesactivados= true

  const quitarFiltros = ()=>{
    dispatch(switchFilterActivate(false))
    filtrosDesactivados = true
  }
  
  return (
    <div className={styles.filtrados}>
        <FiltroTipoDieta />
        <FiltroOrden />
    </div>
  )
}

export default Filtrados