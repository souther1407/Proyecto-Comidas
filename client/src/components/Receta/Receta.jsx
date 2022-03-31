import react from "react";
import styles from "./Receta.module.css"
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import {getRecipeDetail} from "../../redux/actions/actions"
import EtiquetaDieta from "../EtiquetaDieta/EtiquetaDieta"
class Receta extends react.Component{

    getNameClass(name){
        return name.replace(/\s/g,"_")
    }


    render(){
        
        return(
            <Link to={`/receta/${this.props.id}`} className={styles.receta} /* onClick={()=>this.props.getRecipeDetail(this.props.id)} */>
                <img src={this.props.imagen}/>
                <span class={styles.puntaje}>{this.props.puntaje}</span>
                <h3>{this.props.nombre}</h3>
                <div className={styles.dietas}>
                    
                    {
                        this.props.dietas.map(d=>{
                            return <EtiquetaDieta className={styles[this.getNameClass(d)]} nombre={d} />
                        })
                    }
                </div>
            </Link>
        )
    }

}

function mapDispatchToProps(dispatch){
    return {
        getRecipeDetail:(id)=>dispatch(getRecipeDetail(id))
    }
}



export default connect(null,mapDispatchToProps)(Receta)