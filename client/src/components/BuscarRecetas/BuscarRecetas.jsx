import styles from "./BuscarRecetas.module.css"
import {useDispatch} from "react-redux"
import { useState } from "react"

import {getRecipesByName,getRecipes} from "../../redux/actions/actions"


const BuscarRecetas = () => {

  const dispatch =  useDispatch()
  const [input,setInput] = useState("")

   const handlerSubmit= (e)=>{
      e.preventDefault()
       if(input === "") return dispatch(getRecipes())
       dispatch(getRecipesByName(input))
   }

  return (
    <form className={styles.buscar}onSubmit={handlerSubmit}>
      <input type="text" placeholder='Buscar Receta...' onChange={(e)=>setInput(e.target.value)}/><button type='submit'>Buscar</button>
    </form>
  )
}

export default BuscarRecetas