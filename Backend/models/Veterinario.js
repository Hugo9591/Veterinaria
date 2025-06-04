import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generarId from "../helpers/generarId.js";

const veterinariosSchema = mongoose.Schema({
    nombre: {
        type: String,//tipo string
        requireed: true,//Es requerido
        trim: true//Elimina los espaacios
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,//No es obligatorio
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId
    },
    //si la cuenta esta confirmada cambia cuando visitan el enlace y es correcto cambia a true
    confirmado: {   
        type: Boolean,
        default: false
    }
});

//Hashea password
veterinariosSchema.pre('save', async function(next){
    //Si un password ya esta hasheado no lo vuelva a hacer
    if(!this.isModified('password')){
        next();
    }

    // Hashea password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Comparar password del ususario
veterinariosSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);//this.password es el password hasheado
}

//Registrar en mongose se la pasa el (nombre, estructura)
const Veterinario = mongoose.model('Veterinario', veterinariosSchema);

export default Veterinario;