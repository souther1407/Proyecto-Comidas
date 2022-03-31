import React, { Component } from 'react'
import { useState } from 'react'
import styles from "./FiltroOrden.module.css"
import {filterByName,filterByScore,switchFilterActivate} from "../../redux/actions/actions"
import {useDispatch} from "react-redux"



const FiltroOrden = () => {
   const dispatch = useDispatch()

   const [hayFiltros,setHayFiltros] = useState(false)
    


   function activarFiltrosNombre(e){
      dispatch(filterByName(e.target.value))
      return !hayFiltros ? setHayFiltros(true): null
   }

   function activarFiltrosPuntaje(e){
      dispatch(filterByScore(e.target.value))
      return !hayFiltros ? setHayFiltros(true): null
   }

   function quitarOrdenamientos(){
      for(let radio of document.querySelectorAll("input[type='radio']")){
         radio.checked = false
      }
      dispatch(switchFilterActivate(false))
      setHayFiltros(false)
   }


  return (
    <div className={styles.filtroOrden}>
      <div className={styles.orden}>
         <h4>Orden Alfabético</h4>
         <div className={styles.alfabetico}>
            <label>Asc</label>
            <input type="radio" name='alfabetico' value="asc" onClick={activarFiltrosNombre} />
            <label>Des</label>
            <input type="radio" name='alfabetico' value="desc" onClick={activarFiltrosNombre}/>
         </div> 
      </div>
      <div className={styles.orden}>
      <h4>Orden Por Puntuacion</h4>
         <div className={styles.puntuacion}>
            <label>Asc</label>
            <input type="radio" name='puntuacion' value="asc" onClick={activarFiltrosPuntaje}/>
            <label>Desc</label>
            <input type="radio" name='puntuacion' value="desc" onClick={activarFiltrosPuntaje}/>
         </div> 
      </div>
      <button onClick={quitarOrdenamientos} className={`${styles.btnQuitarFiltros} ${hayFiltros ? "" : "ocultar"}`}>Quitar Ordenamientos</button>
    </div>
  )
}

export default FiltroOrden