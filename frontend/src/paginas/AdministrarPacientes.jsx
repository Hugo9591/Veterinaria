import Formulario from "../components/Formulario"
import ListadoPacientes from "../components/ListadoPacientes"
import { useState } from "react"


const AdministrarPacientes = () => {

  const [ mostrarFormulario, setMostrarFormulario ] = useState( false ); 

  return (
    <div className="flex flex-col md:flex-row">

      <button
          type="button"
          className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-lg mb-10 md:hidden"
          onClick={() => setMostrarFormulario( !mostrarFormulario )}> {/* //mostrar lo contrario de mostrarFormulario */}
          
            {mostrarFormulario ? 'Ocultar Formulario' : 'Mostar Formulario'}
      </button>

        {/* Mostrar/ocultar formulario */}
      <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario />
      </div>

      <div className="md:w-1/2 lg:w-3/5">
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPacientes