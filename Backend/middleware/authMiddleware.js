import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

// el paquete jsonwebtoken permite crear eltoke y tambien comprobarlo

const checkAuth = async (req, res, next) => {
//  console.log('Desde el middleware');

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){//Comprobar que tenga bearer
        // console.log('si tiene el token con bearer')
        try {
            token = req.headers.authorization.split(' ')[1];//Separar cuando haya un espacio porque no nos importa la 
                                                            // palabra bearer y regresa un array donde el token esta en la
                                                            //poisicon 1 y el bearer en la posicion 0
            const  decoded = jwt.verify(token, process.env.JWT_SECRET);//(token, palabra secreta)

            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado");//Para no mostrar esos valores
                
                return next();

        } catch (error) {
            const e = new Error('Token no valido');
            return res.status(403).json({ msg: e.message });
        }
    }

    if(!token){
        const error = new Error('Token no valido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;