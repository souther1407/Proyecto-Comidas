import styles from "./Paginado.module.css"

import {useDispatch,useSelector} from "react-redux"
import	{antPage,nextPage} from "../../redux/actions/actions"

const Paginado = () => {

  const dispatch = useDispatch()
  const pagActual = useSelector(state=>state.currentPage)
  const totalPages = useSelector(state=>state.totalPages)

  const next = ()=>{

    dispatch(nextPage())

  }
  const ant = ()=>{

    dispatch(antPage())
  }

  return (
    <div className={styles.paginado}>
      <button className={styles.anterior} onClick={ant} disabled={pagActual === 1}>&lt;</button>
      <button className={styles.siguiente} onClick={next} disabled ={pagActual === totalPages}>&gt;</button>
    </div>
  )
}

export default Paginado