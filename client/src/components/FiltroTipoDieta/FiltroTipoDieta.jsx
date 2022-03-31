import React  from 'react'
import { useState } from 'react'
import styles from "./FiltroTipoDieta.module.css"

import { useSelector,useDispatch } from 'react-redux'

import {filterByDietType,switchFilterActivate} from "../../redux/actions/actions"





const FiltroTipoDieta = (props) => {
  
  const dispatch = useDispatch()
  const [filtrosMostrados,setFiltrosMostrados] = useState(false)
  
  let dietasElegidas = []

  let dietas = []
  const textoMostrar = "Mostrar Filtros Por Dieta"
  const textoOcultar = "Ocultar Filtros"


  function handlerFiltrosMostrar(){
    setFiltrosMostrados(!filtrosMostrados)
  }



  dietas = useSelector(state=>state.dietTypes)
  
  
  if(props.filtrosDesactivados){
    dietasElegidas = []
  }

  function handlerCheckDietas(e){
    if(!dietasElegidas.includes(e.target.name)){
      dietasElegidas = [...dietasElegidas,e.target.name]
    }else{
      dietasElegidas = dietasElegidas.filter(d=>d !== e.target.name)
    }
    if(dietasElegidas.length === 0){

      dispatch(switchFilterActivate(false))

    }else dispatch(switchFilterActivate(true)) 
    
   
    dispatch(filterByDietType(dietasElegidas))

  }


  return (
    <div className={styles.filtroDietas}>
      <button onClick={handlerFiltrosMostrar} className={styles.btnMostrar}>{filtrosMostrados ? textoOcultar :textoMostrar}</button>
      <div className={`${styles.tiposDietas} ${filtrosMostrados ? "" : styles.ocultar}`}>
        
        {
          dietas.map(d=><p className={styles.dieta}><span>{d.name}</span><input name={d.name} type="checkbox" onClick={handlerCheckDietas}/></p>)
        }
      </div>
    </div>
  )
}

export default FiltroTipoDieta