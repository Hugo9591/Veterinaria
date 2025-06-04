import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/rutaProtegida'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
            <Routes>
            {/* Cuando el usuario visite / entonces se carga el componente authlayout */}
            {/* Area Publica */}
              <Route path='/' element={<AuthLayout/>}>
                {/* Van todos los elementos que pertenezcan al componente authLayout */}
                <Route index element={<Login/>} />
                <Route path='registrar' element={<Registrar/>} />
                <Route path='olvide-password' element={<OlvidePassword/>} />
                <Route path='olvide-password/:token' element={<NuevoPassword/>} />
                <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />

              </Route>


            {/* Area Privada */}
            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>} />
              <Route path='perfil' element={<EditarPerfil/>}/>
              <Route path='cambiar-password' element={<CambiarPassword/>}/>
            </Route>

          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
