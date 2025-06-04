import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

function CambiarPassword() {

  const { guardarPassword } = useAuth();

  const [ alerta, setAlerta] = useState({});
  const [ password, setPassword ] = useState({
        pwd_actual: '',
        pwd_nuevo: ''
  });


  const handleSubmit = async e => {
    e.preventDefault();

    //validar
  //console.log(Object.values(password).some( campo => campo  === ''));
    if( Object.values(password).some( campo => campo  === '' )){
      setAlerta({
        msg: 'Todos los Campos  son Obligatorios',
        error: true
      });
      return;
    }
    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: 'El Password debe de ser minimo de 6 Caracteres',
        error: true
      });
      return;
    }
    const respuesta = await guardarPassword(password);
    setAlerta(respuesta);
  }

  const { msg, error } = alerta;
  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>

        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
            <span className="text-indigo-600 font-bold">Password Aqui</span>
        </p>

        <div className='flex justify-center'>
          <div className='w-full md:w-1/2 bg-white shadow rounded-lg p-5'>

            {msg && <Alerta alerta={alerta}/>}

            <form onSubmit={handleSubmit} className={`${msg && !error ? 'hidden' : 'block'}`}>
              <div className='my-3'>
                <label htmlFor="nombre"
                        className='uppercase font-bold text-gray-600'>Password Actual
                </label>
                <input type="password"
                        className='border bg-gray-50 w-full p-2 mt-2 mb-4 rounded-lg' 
                        name='pwd_actual'
                        placeholder="Password Actual"
                        onChange={e => setPassword({...password,[e.target.name] : e.target.value})}  
                />
              </div>

              <div className='my-3'>
                <label htmlFor="nombre"
                        className='uppercase font-bold text-gray-600'>Nuevo Password
                </label>
                <input type="password"
                        className='border bg-gray-50 w-full p-2 mt-2 mb-4 rounded-lg' 
                        name='pwd_nuevo'
                        placeholder="Nuevo Password"  
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                />
              </div>

              <input type="submit"
                      value="Actualizar Password" 
                      className='hover:cursor-pointer bg-indigo-600 hover:bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-5'/>

            </form>
          </div>
        </div>
    </>
  )
}

export default CambiarPassword