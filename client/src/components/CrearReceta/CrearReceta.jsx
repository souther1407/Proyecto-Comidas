import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import styles from "./CrearReceta.module.css"
import {getDietTypes} from  "../../redux/actions/actions"
import Cargando from "../Cargando/Cargando"
import Paso from "../Paso/Paso"
import {loadingRecipes} from "../../redux/actions/actions"
import { Link } from 'react-router-dom'



const CrearReceta = () => {

  let [numeroPaso,setNumeroPaso] = useState(1)

  let [nuncaIngresoAunCampo,setNuncaIngresoAUnCampo] = useState(true)

 let [recetaCreada,setRecetaCreada] = useState(false)

  const dispatch = useDispatch()
  let dietas=[] 



  const [input,setInput] = useState({
      name:"",
      summary:"",
      score:0,
      healthScore:0,
      image:"",
      steps:[],
      diets:[],
  })

 
  const [errores,setErrores] = useState({})


  function handlerErrores(input,inputActual){
    let e={}

    const patternName = /[^\w+\s+ñ]/g
    if(input.name.length === 0)  e.nameEstaVacio = "Por favor ingrese un nombre"

    if(input.name.search(patternName) !== -1) e.nameCaracteresIncorrectos = "Solo se permiten caracteres Alfanuméricos"
    if(input.summary.length === 0)  e.summaryEstaVacio = "Por favor ingrese el resumen"

    if(input.score < 0 || input.score > 100)  e.scoreRangoInválido = "El numero debe estar entre 0 y 100"

    if(input.healthScore < 0 || input.healthScore > 100) e.healthScoreRangoInválido = "El numero debe estar entre 0 y 100"

    const patternUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    console.log(input.image.match(patternUrl))
    if(input.image.length > 0 && input.image.match(patternUrl) === null) e.imageUrlInvalido = "La url no es correcta"
    
   
    
    return e
  }
  

  function handlerInput(e,value){
      setNuncaIngresoAUnCampo(false)
      setErrores(handlerErrores({...input,[e.target.name]:value},e.target.name))
      setInput({
          ...input,
          [e.target.name]:value
      })
  }

  useEffect(()=>{
      dispatch(getDietTypes())
  },[])

  dietas = useSelector(state=>state.dietTypes)

  //---------------HANDLERS DIETAS -----------------

  function handlerDietas(e){

    if(input.diets.includes(e.target.name)){
        setInput({
            ...input,
            diets:input.diets.filter(d=>d !== e.target.name)
        })
    }else{
        setInput({
            ...input,
            diets:[...input.diets,e.target.name]
        })
    }
  }

 //-------------------------------------------


  //---------------HANDLERS PASOS -----------------

  function handlerAgregarPaso(){

    const descPaso = document.querySelector("textarea[name='descPaso']").value

    if(descPaso.length  === 0) return alert("por favor, ingrese la descripcion")
    setInput({
        ...input,
        steps:[...input.steps,{number:numeroPaso,step:descPaso}]
    })
   document.querySelector("textarea[name='descPaso']").value=""
   setNumeroPaso(numeroPaso + 1)
 
  }

  function handlerEliminarPaso(){
      const arr = [...input.steps]
      arr.pop()
      setInput({
          ...input,
          steps:arr
      })
      setNumeroPaso(numeroPaso - 1)
  }

  
 //--------------------------------------------
 
 
//-----------CREAR RECETA HANDLER------------------ 

function hayErrores(errores){
    
    if(Object.keys(errores).length > 0) return [true,"verifique el formulario por favor :c"]
    if(nuncaIngresoAunCampo) return [true,"no se puede enviar recetas vacias :C"]
    if(input.steps.length === 0) return [true,"Debe haber como mínimo 1 paso :c"]

   

    return [false,"ok"]
    
}

const handlerCrearReceta = (e)=>{
    e.preventDefault()
    const [huboErrores,msj] = hayErrores(errores)
    if(huboErrores) return alert(msj)
    fetch(
    "http://localhost:3001/recipe",{
     method:"POST",
     body:JSON.stringify(input),
     headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    }
    )
    .then(r=>r.json())
    .then(data=>{
        dispatch(loadingRecipes())
        alert("Receta creada con éxito")
    })
    .catch(err=>console.log("algo malio sal"))
   
    
}
 //-------------------------------------------- 


  return (

    <div className={styles.crearReceta}>
        
        <form className={styles.form} onSubmit={handlerCrearReceta}>    
            <h1 className={styles.tituloForm}>Crea tu propia receta :3</h1>
            <fieldset className={styles.datosBasicos}>
                
                <div className={styles.nombre}>
                    <label htmlFor="nombre">Nombre de la receta</label>
                    <input type="text" id="nombre" name='name' required onChange={e=>handlerInput(e,e.target.value)}/>
                    <p>{errores.nameEstaVacio}</p>
                    <p>{errores.nameCaracteresIncorrectos}</p>
                </div>

                <div className={styles.resumen}>
                    <label htmlFor="resumen">Resumen de la receta</label>
                    <textarea  id="resumen" name='summary' required onChange={e=>handlerInput(e,e.target.value)}/>
                    <p>{errores.summaryEstaVacio}</p>
                </div>

                <div className={styles.score}>
                    <label htmlFor="punjate">Puntaje de la receta</label>
                    <input type="number" id="puntaje" required name='score' onChange={e=>handlerInput(e,Number(e.target.value))}/>
                    <p>{errores.scoreRangoInválido}</p>
                </div>

                <div className={styles.healthScore}>
                    <label htmlFor="puntajeSalud">Nivel de salubridad de la receta</label>
                    <input type="number" id="puntajeSalud" required name='healthScore' onChange={e=>handlerInput(e,Number(e.target.value))}/>
                    <p>{errores.healthScoreRangoInválido}</p>
                </div>

                <div className={styles.imagen}>
                    <label htmlFor="imagen">Link de una imagen</label>
                    <input type="text" id="imagen" name='image' onChange={e=>handlerInput(e,e.target.value)}/>
                    <p>{errores.imageUrlInvalido}</p>
                </div>

            </fieldset>

            <fieldset className={styles.dietasYPasos}>

                <div className={styles.dietas}>
                    <label>Tipos de dietas</label>
                    {
                    dietas.length > 0 ? dietas.map(d=><div><span>{d.name}</span> <input name={d.name} type="checkbox" onClick={handlerDietas}/></div>) : <Cargando />
                    }

                </div>

                <div className={styles.pasos}>
                    <label>Pasos para realizarla</label>
                    <div className={styles.agregarPasos}>
                        <textarea name='descPaso'></textarea>
                        <span onClick={handlerAgregarPaso} className={styles.btn}>+ Agregar Paso</span>
                    </div>

                    <div className={styles.pasosAgregados}>
                        {
                            input.steps.length > 0 ? input.steps.map(s=><Paso numero={s.number} contenido={s.step}/>) : null
                        }
                        {
                            input.steps.length > 0 ? <button onClick={handlerEliminarPaso} className={styles.btn}>Eliminar Paso</button> : null
                        }
                    </div>

                </div>

                <button type='submit' className={styles.btn}>Crear</button>
            </fieldset>

        </form>
    <Link className={styles.homeBtn} to="/home">Home</Link>              
    </div>
  )
}

export default CrearReceta