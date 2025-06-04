import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { useState } from "react"
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();//Para rediccionar al usuario

  const { msg } = alerta;

  const handleSubmit = async e => {
      e.preventDefault();

      //Validar campos
      if([email, password].includes('')){
          setAlerta({
              msg: 'Todos los Campos son Obligatorios',
              error: true
          });
          return 
      }

      try {
          const { data } = await clienteAxios.post('/veterinarios/login', {email, password});
          //console.log(data);

          //Almacenar el token en el localstorage 
          localStorage.setItem('token', data.token);

          setAuth( data );
          navigate('/admin')
      } catch (error) {
          setAlerta({
              msg: error.response.data.msg,
              error: true
          });
      }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesion y Administra tus {""}
        <span className="text-black">Pacientes</span></h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta
        alerta={alerta}
        />}

        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
                Email
            </label>

            <input type="email"
                    placeholder="Email" 
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl "
                    value={email}
                    onChange={e => setEmail(e.target.value) }
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
                    onChange={e => setPassword(e.target.value) }
                    />
          </div>

          <input type="submit" 
                  value='Iniciar Sesion'
                  className="bg-indigo-700 block mx-auto
                              w-full py-3 px-10 rounded-xl text-white uppercase font-bold 
                              hover:cursor-pointer hover:bg-indigo-800 md:w-auto" 
                  />
        </form>

        <nav className="mt-6 lg:flex lg:justify-between">
          <Link to="/registrar"
                className="block text-center my-5 text-gray-500">¿No tienes una Cuenta? <span className="text-indigo-800 hover:underline">Registrate</span> </Link>
          <Link to="/olvide-password"
                className="block text-center my-5 text-gray-500 hover:text-indigo-800">Olvide mi Password</Link>
        </nav>
      </div>
    </>
  ) 
}

export default Login
