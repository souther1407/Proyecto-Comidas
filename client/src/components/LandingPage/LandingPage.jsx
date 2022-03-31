import {Link} from "react-router-dom"
import styles from "./LandingPage.module.css"



const LandingPage = () => {

  

  return (
    <div className={styles.landingPage}>
       <img className={styles.img} src="https://static4-sevilla.abc.es/assets/latest/img/gurme/imagen-buscador-recetas.jpg" alt="fondo-landing" />
       <div className={styles.tituloBtnHome}>
           <h1>Recetas sabrosas :3</h1>
           <Link to="/home" className={styles.btnLinkHome}>Ir al home</Link>
       </div>     
    </div>
  )
}

export default LandingPage