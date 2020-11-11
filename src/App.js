import React, {useState, useEffect} from 'react';
import Formulario from "./componentes/Formulario"
import Listado from "./componentes/Listado"


function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(()=>{
    const consultarAPI = async () => {
      if(busqueda === "") return;

      const cantidad = 30
      const api = `17215940-a6bdc19a1b6566d84161a93fc`
      const url = `https://pixabay.com/api/?key=${api}&q=${busqueda}&per_page=${cantidad}&page=${paginaactual}`
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits)
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / cantidad);
      guardarTotalPaginas(calcularTotalPaginas)
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({behavior:"smooth"})
    }
    consultarAPI()
  },[busqueda, paginaactual])

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1
    if( nuevaPaginaActual === 0)return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1
    if( nuevaPaginaActual > totalpaginas)return;
    guardarPaginaActual(nuevaPaginaActual);
  }


  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imágenes</p>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
          guardarPaginaActual={guardarPaginaActual}
        />
      </div>
      <div className="row justify-content-center">
        <Listado 
          imagenes={imagenes}
        />
        {(paginaactual === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >&laquo; Anterior</button>)}
        {(paginaactual === totalpaginas) ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >Siguiente &raquo;</button>)}
      </div>
    </div>
  );
}

export default App;
