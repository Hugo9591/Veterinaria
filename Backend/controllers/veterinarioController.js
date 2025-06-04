import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//Send muestra en pantalla y json se obtiene respustas de tipo json
const registrar = async (req, res) =>{
    const { email, nombre} = req.body;

    // Prevenir ususarios registrados
    const existeUsuario = await Veterinario.findOne({ email });

    if(existeUsuario){
        const error = new Error('Usuario ya Registrado');
        return res.status(400).json({ msg: error.message });
    }

    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();//Guardar en la bd

        //Enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token,
        });

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error)
    }
};


const perfil = (req, res) =>{

    const { veterinario } = req;

    res.json(veterinario);
};

//Confirmar correo
const confirmar = async (req, res) =>{
    const { token } = req.params;

    //Buscar al usuario que le pertenesca el token
    const usuarioConfirmar = await Veterinario.findOne({ token });
    
    if(!usuarioConfirmar){
        const error = new Error('Token No Valido');
        return res.status(404).json({ msg: error.message }); //404 no encontrado
    }

    try {
        //Cambiar confirmado a true si es el mismo token
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: 'Usuario Confirmado Correctamente'});
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body;

    //Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email })

    if(!usuario){
        const error = new Error('El usuario no existe...')
    
        return res.status(404).json({msg: error.message});
    }

    //Comprobar si el usuario esta confirmado o no
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    //Autenticar al usuario
    if( await usuario.comprobarPassword(password)){
        // console.log('password correcto');

        //Autenticar
        res.json( {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        } )
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

const olvidePassword = async (req, res) => {
    //Verificar si existe el correo para poder cambiar el email
    const { email } = req.body;//email del form
    // console.log(email);

    //Verificar si el usuario existe
    const existeVeterinario = await Veterinario.findOne({ email });
    if(!existeVeterinario){
        const error = new Error('El Usuario No Existe...');
        return res.status(400).json({ msg: error.message });
    }

    try {
        existeVeterinario.token = generarId();//id unico se guarda en el token
        //Guardar en la BD
        await existeVeterinario.save();

        //Enviar email con instrucciones
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        });

        res.json({ msg: 'Hemos enviado un email con las instrucciones'})
    } catch (error) {
        console.log(error);
    }

}

//Validar token
const comprobarToken = async (req, res) => {
    const { token } = req.params;//req.params informacion de la url
    // console.log(token)

    const tokenValido = await Veterinario.findOne({ token });

    if(tokenValido){
       res.json({ msg: 'Token Valido... El Usuario Existe'}); 
    }else{
        const error = new Error('Token No Valido');
        return res.status(400).json({ msg: error.message });
    }
}

//Cambiar password
const nuevoPassword = async (req, res) => {
    const { token } = req.params;//url
    const { password } = req.body;//Usuario escriba

    const veterinario = await Veterinario.findOne({ token });

    if(!veterinario){
        const error = new Error('Hubo un Error');
        return res.status(400).json({ msg: error.message});
    }

    try {
        veterinario.token = null;//Eliminar token porque era temporal
        veterinario.password = password;//Asignar el nuevo password
        await veterinario.save();//Guardamos en la BD y con save se hashea el password por el pre en el modelo veterinario 
        res.json({ msg: 'Password Modificado Correctamente' });

    } catch (error) {
        console.log(error);
    }
}

const actualizarPerfil = async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);
    const veterinario = await Veterinario.findById(req.params.id);//inf de la BD actualmente del veterinario
    if(!veterinario){
        const error = new Error('Hubo un Error');
        return res.status(400).json({ msg: error.response });
    }
    //si se cambia un correo por uno existente
    const { email } = req.body;

    if(veterinario.email !== req.body.email){
        //No se repita algun email
        const existeEmail = await Veterinario.findOne({email});
        if(existeEmail){
            const error = new Error('Este Email ya esta en uso');
            return res.status(400).json({ msg: error.message });
        }
    }

    try {
        veterinario.nombre = req.body.nombre;//Si no hay nombre asigno lo que hya en la BD
        veterinario.email = req.body.email;
        veterinario.web = req.body.web;
        veterinario.telefono = req.body.telefono;

        const veterinarioActualizado = await veterinario.save();
        res.json(veterinarioActualizado);
        //Se va a sincoronizar los states del auth con los de la BD 
    } catch (error) {
        console.log(error);
    }
}


const actualizarPassword = async (req, res) => {
    //console.log(req.veterinario);
    //console.log(req.body);

    //Leer datos
    const { id } = req.veterinario;
    const { pwd_actual, pwd_nuevo } = req.body;

    //Comprobar que el veterinario exista
    const veterinario = await Veterinario.findById(id);//inf de la BD actualmente
    if(!veterinario){
        const error = new Error('Hubo un Error');
        return res.status(400).json({ msg: error.message });
    }

    //comprobar password actual para comrobar que el usuario conoce el password
    if( await veterinario.comprobarPassword(pwd_actual)){
        // console.log('Password Actual Correcto');

        //Almacenar nuevo password
        veterinario.password = pwd_nuevo;

        //almacenar en la BD y hashearlo
        await veterinario.save();

        res.json({msg: 'Password Almacenado Correctamente'});
    }else{
        // console.log('Password Actual Incorrecto');
        const error = new Error('El Password Actual es Incorrecto');
        return res.status(400).json({ msg: error.message });
    }

    //Almacenar passwrod
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}