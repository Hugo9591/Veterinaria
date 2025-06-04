import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import conectarDB from "./config/db.js";
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js'

//Llamar express
const app = express();
app.use(express.json());//Para que pueda recibir datos tipo jason desde postman

//para las variables de entorno
dotenv.config();

//Conectar a la BD
conectarDB();

//Cors 
const domioniosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(domioniosPermitidos.indexOf(origin) !== -1){//Si es diferente a -1 es porque si encontro el dominio{
            //El origen del request esta permitido
            callback(null, true);
        }else{
            callback(new Error('No Permitido Por CORS'));
        }
    }
}
app.use(cors(corsOptions));

//Cuando encuentra la url nos muestra veterinarioRoutes
app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes); 


//Asignar puerto a port
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});