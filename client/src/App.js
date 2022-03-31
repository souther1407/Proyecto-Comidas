import './App.css';
import {Route,Routes} from "react-router-dom"

import LandingPage from "./components/LandingPage/LandingPage"
import CrearReceta from "./components/CrearReceta/CrearReceta"
import Home from "./components/Home/Home"
import DetalleReceta from "./components/DetalleReceta/DetalleReceta"
import NoFound404 from "./components/NoFound404/NoFound404"

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/receta/crear' element={<CrearReceta />} />
          <Route path='/receta/:id' element={<DetalleReceta />}/>
          <Route path='*' element={<NoFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
