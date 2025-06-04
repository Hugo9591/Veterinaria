import { Link } from "react-router-dom";
import { useState, useTransition } from "react";
import Alerta from "../components/Alerta";
// import axios from 'axios'
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState({});

  const [alerta, setAlerta] = useState({});

  //Validar Campos
  const handleSubmit = async e => {
    e.preventDefault();

    //Comprobar que no este ningun campo vacio
    if([ nombre, email, password, repetirPassword ].includes('')){
      setAlerta({ msg: 'Hay Campos Vacios', error: true });
      return
    }

    //Verificar que los passwords sean iguales
    if(password !== repetirPassword){
      setAlerta({ msg: 'Los Password no son Iguales', error: true });
      return
    }

    //Verificar que el password tenga mas de 6 caracteres
    if(password.length < 6){
      setAlerta({ msg: 'El Password es muy Corto, Agrega mas de 6 Caracteres', error: true });
      return 
    }

    //Si todo esta bien, quita la alerta poniendo el obj vacio
    setAlerta({});

    //Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password});

      setAlerta({
      msg: 'Creado Correctamente, Revisa tu Email',
      error: false});
      
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true})//Leer el error del backend
    }
  }

  const { msg, error } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""}<span className="text-black"> tus Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

        {/* //Si en msg hay algo, mostrar la alerta*/}
        {msg && <Alerta
          alerta={alerta}
        />} 
  
        <form onSubmit={handleSubmit} className={`${msg && !error ? 'hidden' : 'block'}`}>
          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Nombre
              </label>

              <input type="text"
                      placeholder="Nombre" 
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={nombre}
                      onChange={ e => setNombre(e.target.value)}
                      />
          </div>

          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Email
              </label>

              <input type="email"
                      placeholder="Email" 
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={email}
                      onChange={ e => setEmail(e.target.value)}
                      />
          </div>

          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Password
              </label>

              <input type="password"
                      placeholder="Password" 
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                      value={password}
                      onChange={ e => setPassword(e.target.value)}
                      />
          </div>

          <div className="my-5">
              <label className="uppercase text-gray-600 block text-xl font-bold">
                  Repetir Password
              </label>

              <input type="password"
                      placeholder="Repite tu Password" 
                      className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                      value={repetirPassword}
                      onChange={ e => setRepetirPassword(e.target.value)}
                      />
          </div>

          <input type="submit" 
            value='Registrar Cuenta'
            className="bg-indigo-700 block mx-auto
                        w-full py-3 px-10 rounded-xl text-white uppercase font-bold 
                        mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto " 
            />

        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/"
                      className="block text-center my-5 text-gray-500">¿Ya tienes una Cuenta? <span className="text-indigo-800 hover:underline">Inicia Sesion</span></Link>
                <Link to="/olvide-password"
                      className="block text-center my-5 text-gray-500 hover:text-indigo-800">Olvide mi Password</Link>
        </nav>
       </div>

    </>
  )
}

export default Registrar
