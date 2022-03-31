import styles from "./DetalleReceta.module.css"
import EtiquetaDieta from "../EtiquetaDieta/EtiquetaDieta"
import { Link } from "react-router-dom"


import { useEffect } from "react"
import {useSelector } from "react-redux"


import Cargando from "../Cargando/Cargando"
import { useDispatch } from "react-redux"
import {getRecipeDetail,loadingDetailRecipe} from "../../redux/actions/actions"
import { useParams } from "react-router-dom"


const DetalleReceta = () => {

  const {id} = useParams()
  
  const dispatch = useDispatch()
    
  let detalleReceta = useSelector(state=>state.detailRecipe) 
  let detalleCargado = useSelector(state=>state.loadedDetailRecipe)
  useEffect(()=>{

    dispatch(getRecipeDetail(id))
    return ()=>{
      dispatch(loadingDetailRecipe())
    }
  },[])



  function getColorPuntajes(puntaje){
   
    if(puntaje <= 100 && puntaje > 75) return styles.excelente
    else if(puntaje <= 75 && puntaje > 60) return styles.bueno
    else if (puntaje <= 60 && puntaje > 50) return styles.regular
    else return styles.malo
  }

  return (
    <>
    {
      detalleCargado
      ? 
      detalleReceta.error ? <h1>No existe la receta</h1> :
      <div className={styles.detalleReceta}>
        <Link to="/home" className={styles.linkHome}>Home</Link>
        <div className={styles.imgTituloDietas}>
          <img src={detalleReceta.image}/>

          <div className={styles.tituloDietas}>

            <h3 id="titulo">{detalleReceta.name}</h3>
            <div className={styles.dietas}>
              {
              detalleReceta.diets.map(d=><EtiquetaDieta nombre={d}/>)
              }
            </div>
            <div className={styles.puntuaciones}>
              <span>Puntaje: <span className={getColorPuntajes(detalleReceta.score)}>{detalleReceta.score}</span></span>
              <span>HealthScore: <span className={getColorPuntajes(detalleReceta.healthScore)}>{detalleReceta.healthScore}</span></span>
            </div>

          </div>
        </div>

        <section className={styles.resumen}>
          <h3>Resumen</h3>
          <p dangerouslySetInnerHTML={{ __html: detalleReceta.summary }}></p>
        </section>

      

        <section className={styles.pasos}>
          <h3>Pasos para prepaparla</h3>
          {
            detalleReceta.steps.map(s=>(<div className={styles.paso}>
              <span className={styles.pasoNum}>{s.number}</span>
              <p>{s.step}</p>
            </div>))
          }
        </section>
    </div>
     :<Cargando />
    }
      
    </>
  )
}

export default DetalleReceta