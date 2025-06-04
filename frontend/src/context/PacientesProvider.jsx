import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const [ pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                //Conseguir el token
                const token = localStorage.getItem('token');
                if(!token) return //Si no hay token, ya no se ejecuta el codigo

                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios( '/pacientes', config );
                console.log( data );
                //Una vez tenemos el resultado de los pacientes lo colocamos en el state
                setPacientes( data );//Colocamos el resultado en el state para ser propagao en otro lugar con usecontext
            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    },[ auth ]);


    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }

        if(paciente.id){
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState);
                //Actualiza paciente modificado
                setPacientes(pacienteActualizado);

                console.log(data);
            } catch (error) {
                
            }
        }else{
            //console.log( paciente );
            try {
                
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                //console.log(data);

                //Definir que datos necesitamos(quitar ciertos datos y crea un nuevo obj sin esos valores)
                const { createAt, updateAt, __v, ...pacienteAlmacenado } = data;

                console.log( pacienteAlmacenado );

                //se alamena paciente almacenado y una copia de los pacientes anteriores
                setPacientes( [pacienteAlmacenado, ...pacientes ] )

            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
        
    }


    const setEdicion = ( paciente ) =>{
        setPaciente( paciente );
    }

    const eliminarPaciente = async id => {
        //console.log(id);
        const confirmar = confirm('¿Deseeas Eliminar el Registro?');

        if(confirmar){
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                console.log(data)

                //sincronizar state
                const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                setPacientes(pacienteActualizado);
                
            } catch (error) {
                console.log(error);
            }
        }
    }



    return(
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente, 
                eliminarPaciente
            }}>
            {children}
        </PacientesContext.Provider>
    )

}

export default PacientesContext;
