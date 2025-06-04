import usePacientes from "../hooks/usePacientes";

function Paciente({paciente}) {

    const { setEdicion, eliminarPaciente } = usePacientes();

    //Nos da la informacion de los pacientes en un obj
    //console.log(paciente);
    const { email, fecha, nombre, propietario, sintomas, _id } = paciente;

    //console.log(fecha);

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-MX', {dateStyle: 'long'}).format(nuevaFecha);//API para traducir cierto tipo de fechas
    }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-lg">

        <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black my-2">{nombre}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {''}
            <span className="font-normal normal-case text-black my-2">{propietario}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Email: {''}
            <span className="font-normal normal-case text-black my-2">{email}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Fecha Alta: {''}
            <span className="font-normal normal-case text-black my-2">{formatearFecha(fecha)}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Sintomas: {''}
            <span className="font-normal normal-case text-black my-2">{sintomas}</span>
        </p>

        <div className="felx justify-between my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                onClick={() => setEdicion( paciente )}>
                    Editar
            </button>

            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente