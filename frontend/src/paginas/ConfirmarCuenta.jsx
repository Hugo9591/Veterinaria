import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"//Permite leer los parametros de la url
//import axios from "axios"; axios yaesta importado desde clienteAxios
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function ConfirmarCuenta() {

  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({})

  const params = useParams();//Leer parametros de la url
  const { id } = params;//Extraer id de params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);//data la respuesta que da axios
 
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg
        })
      } catch (error) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          });
      }

      setCargando(false);
    }

    confirmarCuenta();
  },[]);

  
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma tu cuenta y comienza a Administrar {""}<span className="text-black"> tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {/* cuando cargando este como false, uestra la alerta */}
        {!cargando && <Alerta
            alerta={alerta}
          />
        }

          {cuentaConfirmada && <Link to="/"
            className="block text-center my-5 text-gray-500 hover:text-indigo-700">Iniciar Sesion
          </Link>}
      </div>

    </>
  )
}

export default ConfirmarCuenta