import BuscarRecetas from "../BuscarRecetas/BuscarRecetas"
import Filtrados from "../Filtrados/Filtrados"

import Paginado from "../Paginado/Paginado"
import Recetas from "../Recetas/Recetas"

import styles from "./Home.module.css"
import { useSelector,useDispatch } from "react-redux"

import Cargando from "../Cargando/Cargando"
import { useEffect } from "react"
import {getRecipes,getDietTypes} from "../../redux/actions/actions"

import {Link} from "react-router-dom"


const Home = () => {
  
  const dispatch = useDispatch()

  let cargadas = useSelector(state=>state.loadedRecipies)

  useEffect(()=>{

    if(!cargadas){
      dispatch(getRecipes())
      dispatch(getDietTypes())
    }
    
  },[])

  return (
    <>
    {
      cargadas 
      ?
    <div className={styles.home}>
      <nav className={styles.nav}>
        <BuscarRecetas />
        <Filtrados />   
      </nav>
      <Recetas />
      <Paginado />
      <Link to="/receta/crear" className={styles.nuevaReceta}>+ Crear Receta</Link>
    </div>
      :
      <Cargando />
    }
    </>
  )
}

export default Home