import React, { useState } from 'react'
import styles from "./Notificacion.module.css"





 const Notificacion = ({titulo,contenido,clases,cb}) => {

  function handlerCloseButton(cb){
      setClosed(true)
      cb()
  }
  
  const [closed,setClosed] = useState(false)
  return (
      <>
      {
          !closed 
          ? 
          <div className={`${styles.notificacion} ${clases}`}>
                <h3>{titulo}</h3>
                <p>{contenido}</p>
            <button onClick={(e)=>handlerCloseButton(cb)}>X</button>
          </div>
          : null
      }
      </>
    
  )
}

export default Notificacion
