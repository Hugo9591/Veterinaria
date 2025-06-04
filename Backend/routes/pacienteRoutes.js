import express from 'express';
import { agregarPaciente, obtenerPacientes, obtenerPaciente, actualizarPaciente, eliminarPaciente} from '../controllers/pacienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(checkAuth, agregarPaciente).get(checkAuth, obtenerPacientes);//Proteger el endpoint con el checkAuth
//checkAuth Porque para agregar un paciente necesitas tener una cuenta como veterinario

router.route('/:id')
        .get(checkAuth, obtenerPaciente)
        .put(checkAuth, actualizarPaciente)
        .delete(checkAuth, eliminarPaciente);

export default router;