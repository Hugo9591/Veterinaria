import { useState, useEffect, createContext } from "react";
import clienteAxios from '../config/axios';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ cargando, setCargando ] = useState(true);
    const [ auth, setAuth ] = useState({});

    const { pathName } = useLocation();

    //Toma una ruta para redireccionar al usuario
    const navigate = useNavigate();

    useEffect(() =>  {
        const  autenticarUsuario = async () => {
            //Leer token de localstorage para ver si el usuario esta autenticado
            const token = localStorage.getItem('token');
            //console.log(token);

            if(!token) {//Detenemos la ejecucion porque no se le dara acceso a un usuario que no esta autenticado
                setCargando(false);
                return
            }

            const config = {
                //emula la parte de postman
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const { data } = await clienteAxios('/veterinarios/perfil', config)

                //console.log(data);
                setAuth(data);

                //navigate('/admin');
                const rutas = ['/', '/registrar', '/olvide-password','confirmar'];

                if(rutas.includes(pathName)){
                    navigate('/admin');//Redireccionar a admin
                }
            } catch (error) {
                console.log(error.response.data.msg); 
                setAuth({});//setAuth a un obj vacio para que se mantenga vacio y no este autenticado el usuario
            }

            setCargando(false);
        }
        autenticarUsuario();
    },[])


    const cerrarSesion = () => {
        //Eliminamos token del localstorage
        localStorage.removeItem('token');
        setAuth({});//Regresamos el etAuth a un obj vacio
    }

    const  actualizarPerfil = async (datos) => {
        //console.log(datos)
        const token = localStorage.getItem('token');
        //console.log(token);
        if(!token) {//Detenemos la ejecucion porque no se le dara acceso a un usuario que no esta autenticado
            setCargando(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.put(url, datos, config);

            console.log(data);

            return{
                msg: 'Almacenado Correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }
    
    const guardarPassword = async (datos) => {
        //console.log(datos)
        //Extraer token
        const token = localStorage.getItem('token');
        
        if(!token) {
            setCargando(false);
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'

            const {data} = await clienteAxios.put(url, datos, config);
            // console.log(data);

            return{
                msg: data.msg
            }
        } catch (error) {
            // console.log(error.response.data.msg); 
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando, 
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;