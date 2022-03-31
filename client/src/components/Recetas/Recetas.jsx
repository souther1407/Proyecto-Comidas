import { useSelector,useDispatch } from "react-redux"
import Receta from "../Receta/Receta"
import styles from "./Recetas.module.css"




const Recetas = ()=>{

    const recetas = useSelector((state)=>state.recipes)
    const pagActual = useSelector(state=>state.currentPage)
    const hayFiltrosActivados = useSelector(state=>state.filtersActivated)
    const recetasFiltradas = useSelector(state=>state.filteredRecipies)
    //TODO: recetas truchas
    const recetasAmostrar = hayFiltrosActivados ? recetasFiltradas.slice(pagActual*9-9,pagActual*9) : recetas.slice(pagActual*9-9,pagActual*9)
    
    
    return (
        <div className={styles.recetas}>
             {
                 recetas.length > 0  && !hayFiltrosActivados
                 ?
                 recetasAmostrar.map(r=>(
                     <Receta id={r.id} nombre={r.nombre} imagen={r.imagen} dietas={r.dietas} puntaje={r.puntaje} />

                 ))
                 :
                 hayFiltrosActivados && recetasFiltradas.length > 0 
                 ?
                 recetasAmostrar.map(r=>(
                    <Receta id={r.id} nombre={r.nombre} imagen={r.imagen} dietas={r.dietas} puntaje={r.puntaje} />

                ))
                :
                <h1>No hay recetas :c</h1>

             }
             
             
        </div>
    )
}

export default Recetas