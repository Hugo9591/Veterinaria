import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) =>{
    // console.log(req.body)

    const paciente = new Paciente(req.body);//nos genere el obj con la inf que le pasamos
    paciente.veterinario = req.veterinario._id;

    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

//Obtener todos los pacientes
const obtenerPacientes = async (req, res) =>{
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario);//where(columna).equals(session)

    res.json(pacientes);
}

//Obtener un paciente en especifico
const obtenerPaciente = async (req, res) =>{
    //Se le pasa de  la url el id de cada paciente para enocntrarlos

    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({ msg: 'No encontrado' });
    }

    //Solo el paciente que agrego al paciente puede verlo, si un veterinario esta autenticado pero no agrego al paciente este no podra verlo
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){//cuando compares id de mongo debes convertirlos a string
       return res.json({ msg: 'Accion No Valida' });
    }

    res.json( paciente );

}


const actualizarPaciente = async (req, res) => {
    const { id } = req.params;

    const paciente = await Paciente.findById( id );

    if(!paciente){
        return res.status(404).json({ msg: 'No encontrado' });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'Accion no Valida'});
    }

    //Actuaizar paciente 
    paciente.nombre = req.body.nombre || paciente.nombre;// el //paciente. es en caso de que no se vaya a modificar ese dato
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json( pacienteActualizado );
    } catch (error) {
        console.log(error);
    }
}

const eliminarPaciente = async (req, res) => {
    //Verificar quien esta tratando de eliminar un registro sea quien lo creo
    const { id } = req.params;
    const paciente = await Paciente.findById( id );

    if(!paciente){
        return res.status(404).json({ msg: 'No encontrado' });
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg: 'Accion no Valida'});
    }

    try {
        await paciente.deleteOne();
        res.json({ msg: 'Paciente Eliminado' });
    } catch (error) {
        console.log(error);
    }
}


export {
    agregarPaciente,
    obtenerPacientes, 
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente
}