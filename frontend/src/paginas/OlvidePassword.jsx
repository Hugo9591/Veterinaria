import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from '../components/Alerta'
import clienteAxios from "../config/axios"

const OlvidePassword = () => {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) => {
      e.preventDefault();

      if(email === '' || email.length < 6){
          setAlerta({msg: 'El Email es Obligatorio', error: true})
          return
      }

      try {
          const { data } = await clienteAxios.post('/veterinarios/olvide-password', {  email });

          setAlerta({msg: data.msg})//trae el mensaje del backend en el veterinarioController
      } catch (error) {
          setAlerta({
              msg: error.response.data.msg,
              error: true
          })
      }
  } 

  const {msg, error} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
            Recupera tu Acceso y no pierdas {""}<span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        { msg && <Alerta
            alerta={alerta}
        />}

        <form onSubmit={handleSubmit} className={`${msg && !error ? 'hidden' : 'block'}`}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
            </label>

            <input type="email"
                placeholder="Ingresa tu Email" 
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
          </div>

          <input type="submit" 
                  value='Enviar Instrucciones'
                  className="bg-indigo-700 block mx-auto
                              w-full py-3 px-10 rounded-xl text-white uppercase font-bold 
                              mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
          />

        </form>

        <nav className="mt-6 lg:flex lg:justify-between">
            <Link to="/"
                  className="block text-center my-5 text-gray-500">¿Ya tienes una Cuenta? <span className="text-indigo-800 hover:underline">Inicia Sesion</span></Link>
            <Link to="/registrar"
                  className="block text-center my-5 text-gray-500">¿No tienes una Cuenta? <span className="text-indigo-800 hover:underline">Registrate</span></Link>
        </nav>
      </div>
        

    </>
  )
}

export default OlvidePassword
