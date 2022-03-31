import styles from "./Paso.module.css"

const Paso = (props) => {
  return (
    <div className={styles.paso}>   
            <span>{props.numero}</span>
            <p>{props.contenido}</p>      
    </div>
  )
}

export default Paso